const Promise = require('./index.js')


const promise1 = Promise.resolve(3);
const promise3 = Promise.reject('失败了');
const promise2 = new Promise((resolve, reject) => setTimeout(reject, 100, 'foo'));
const promises = [promise1, promise2,promise3];

const proAllSettled = Promise.allsettled(promises).then(res => {
	console.log("promise.allsettled-成功执行结果",res)
}).catch(e => {
    console.log("promise.allsettled-错误执行结果",res)
})

const all = Promise.all(promises).then(res => {
	console.log("promise.all-成功执行结果",res)
}).catch(e => {
    console.log("promise.all-错误执行结果",e)
})
