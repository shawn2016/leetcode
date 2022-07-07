
const RESOLVED = 'RESOLVED';
const REJECTED = 'REJECTED';
const PENDING = "PENDING";

const resolvePromise = (x, promise2, resolve, reject) => {
    // 1.循环引用 自己等待自己完成 错误的实现
    if (x === promise2) {  // 用一个类型错误，结束掉promise
        return reject(new TypeError('Chaining cycle detected for promise #<Promise>'))
    }
    if (typeof x === 'object' && x !== null || (typeof x === 'function')) {
        let called
        try {
            let then = x.then
            if (typeof then === 'function') {
                this.call(x, value => {
                    if (called) return
                    called = true
                    resolvePromise(value, promise2, resolve, reject) // 递归解析
                }, reason => {
                    if (called) return
                    called = true
                    resolvePromise(reason, promise2, resolve, reject) // 递归解析

                })
            } else {
                resolve(x)
            }
        } catch (error) {
            if (called) return
            called = true
            reject(error)
        }
    } else {
        resolve(x)
    }
}

class Promise {
    constructor(executor) {
        // 初始化状态
        this.status = PENDING
        // 成功的值
        this.value = undefined
        // 失败原因
        this.reason = undefined
        this.onResolvedCallbacks = []
        this.onRejectCallbacks = []
        // 成功的
        let resolve = (value) => {
            if (value instanceof Promise) {
                return value.then(resolve, reject)
            }
            if (this.status === PENDING) {
                this.value = value
                this.status = RESOLVED
                this.onResolvedCallbacks.forEach(fn => fn())
            }
        }
        // 失败的
        let reject = (reason) => {
            if (this.status === PENDING) {
                this.reason = reason
                this.status = REJECTED
                this.onRejectCallbacks.forEach(fn => fn())
            }
        }

        try {
            // 立即执行这个方法
            executor(resolve, reject)
        } catch (error) {
            // 执行错误时调用
            reject(error)
        }
    }

    then(onFulfilled, onRejected) {
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value
        onRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason }

        let promise2 = new Promise((resolve, reject) => {
            // 如果成功的话执行
            if (this.status === RESOLVED) {
                // 异步处理一下 才能获取到promise2
                setTimeout(() => {
                    try {
                        let x = onFulfilled(this.value)
                        // 为了传入到下一个then的方法
                        resolvePromise(x, promise2, resolve, reject)
                    } catch (err) {
                        reject(err)

                    }
                })
            }
            // 失败的时候执行
            if (this.status === REJECTED) {
                setTimeout(() => {
                    try {
                        let x = onRejected(this.reason)
                        resolvePromise(x, promise2, resolve, reject)
                    } catch (error) {
                        reject(error)
                    }
                });
            }
            // 状态还是pending时执行
            if (this.status === PENDING) {
                this.onResolvedCallbacks.push(() => {
                    setTimeout(() => {
                        try {
                            let x = onFulfilled(this.value)
                            // 为了传入到下一个then的方法 
                            resolvePromise(x, promise2, resolve, reject)
                        } catch (error) {
                            reject(error)
                        }
                    });
                })
                this.onRejectCallbacks.push(() => {
                    setTimeout(() => {
                        try {
                            let x = onRejected(this.reason)
                            resolvePromise(x, promise2, resolve, reject)
                        } catch (error) {
                            reject(error)
                        }
                    });
                })
            }
        })
        return promise2
    }
    // 原型方法

    catch(errCallback) {
        return this.then(null, errCallback)
    }
    finnally(callback) {
        return this.then((value) => {
            // 很巧妙  
            // 特点：
            // - 成功和失败都调用callback()
            // - 等待promise执行之后才调用所以采用 Promise.resolve
            // - 后面使用.then(()=>value) 是将上一个value直接传入，省的改变了then的值
            // - 错误也是同理
            return Promise.resolve(callback()).then(() => value)
        }, (reason) => {
            return Promise.resolve(callback()).then(() => { throw reason })
        })
    }

    // 静态方法
    static resolve(data) {
        return new Promise((resolve, reject) => {
            resolve(data)
        })
    }

    static reject(reason) {
        return new Promise((resolve, reject) => {
            reject(reason)
        })
    }

    static allsettled(promises) {
        return new Promise((resolve, reject) => {
            let ret = []
            let index = 0;
            const processData = (key, data) => {
                ret[key] = data
                // 当index === promise长度才返回
                if (++index === promises.length) {
                    resolve(ret)
                }
            }
            // 遍历数组 依次拿到执行结果
            for (let i = 0; i < promises.length; i++) {
                let result = promises[i]
                // 判断是否是promise方法 否则直接返回
                if (typeof result.then === 'function') {
                    result.then((data) => {
                        processData(i, data)
                    }, (reason) => {
                        processData(i, reason)
                    })
                } else {
                    processData(i, result)
                }
            }
        })
    }

    static all(promises) {
        return new Promise((resolve, reject) => {
            let ret = []
            let index = 0;
            const processData = (key, data) => {
                ret[key] = data
                // 当index === promise长度才返回
                if (++index === promises.length) {
                    resolve(ret)
                }
            }
            // 遍历数组 依次拿到执行结果
            for (let i = 0; i < promises.length; i++) {
                let result = promises[i]
                // 判断是否是promise方法 否则直接返回
                if (typeof result.then === 'function') {
                    result.then((data) => {
                        processData(i, data)
                    }, reject)
                } else {
                    processData(i, result)
                }
            }
        })
    }

    static race(promises) {
        return new Promise((resolve, reject) => {
            for (let i = 0; i < promises.length; i++) {
                let result = promises[i]
                if (typeof result.then === 'function') {
                    result.then(resolve, reject)
                } else {
                    resolve(result)
                }
            }
        })
    }


}
// 延迟对象作用是什么
// 可以直接使用 
// let dfd = Promise.defer()
// dfd.reject()
// dfd.resolve()
// return dfd.promise
Promise.defer = Promise.deferred = function () {
    let dfd = {}
    dfd.promise = new Promise((resolve, reject) => {
        dfd.resolve = resolve
        dfd.reject = reject
    })
    return dfd
}

module.exports = Promise