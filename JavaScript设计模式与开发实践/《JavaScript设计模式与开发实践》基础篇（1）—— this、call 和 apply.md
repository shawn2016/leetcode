关于书籍《JavaScript设计模式与开发实践》的一些学习总结，本章梳理关于this、call和apply的知识，作为设计模式的基础知识的第一部分

_**JavaScript 的 this 总是指向一个对象，而具体指向哪个对象是在运行时基于函数的执行环境动态绑定的，而非函数被声明时的环境**_

## this的指向

基本可以分成以下四种情况

- 作为对象的方法调用
- 作为普通函数调用
- 构造器调用
- Function.prototype.call 或 Function.prototype.apply 调用

###### 当函数作为对象的方法被调用时，this 指向该对象

```js
var obj = { 
    a: 1,
    getA: function(){
        alert ( this === obj )
    }
}

obj.getA()
```

###### 当函数不作为对象的属性被调用时，也就是我们常说的普通函数方式,此时的 this 总是指向全局对象。在浏览器的 JavaScript 里，这个全局对象是 window 对象。

```js
window.name = 'globalName'
var myObject = { 
    name: 'sven',
    getName: function(){ 
        return this.name
    } 
}
var getName = myObject.getName
console.log( getName() )
```

###### 构造器调用

- 当用 new 运算符调用函数时，该函数总 会返回一个对象，通常情况下，构造器里的 this 就指向返回的这个对象

```js
var MyClass = function(){ 
    this.name = 'sven'
}
var obj = new MyClass()
alert ( obj.name )
```

- 如果构造器显式地返回了一个 object 类型的对象，那么此次运算结果最终会返回这个对象，而不是我们之前期待的 this

```js
var MyClass = function(){
    this.name = 'sven'
    return { // 显式地返回一个对象
        name: 'anne' 
    }
}
var obj = new MyClass()
alert ( obj.name )
```

###### 跟普通的函数调用相比，用 Function.prototype.call 或Function.prototype.apply 可以动态地 改变传入函数的 this

```javascript
var obj1 = { 
    name: 'sven',
    getName: function(){
         return this.name;
    } 
};
var obj2 = { 
    name: 'anne'
};
console.log( obj1.getName() );
console.log( obj1.getName.call( obj2 ) );
```

_**Function.prototype.call 和 Function.prototype.apply 都是非常常用的方法。它们的作用一模一样，区别仅在于传入参数形式的不同**_

| 方法 | apply | call |
| --- | --- | --- |
| 第一个参数 | 函数体内 this 对象的指向 | 函数体内 this 对象的指向 |
| 第二个参数 | 带下标的集合 | 从第二个参数开始，每个参数被依次传入函数 |


#### apply

```js
var func = function( a, b, c ){
     alert ( [ a, b, c ] )
}
func.apply( null, [ 1, 2, 3 ] )
```

#### call

```js
var func = function( a, b, c ){
     alert ( [ a, b, c ] )
}
func.call( null, 1, 2, 3 )
```

## call和apply的用途

- 改变 this 指向
- 借用其他对象的方法

#### 改变 this 指向

```js
var obj1 = { 
    name: 'sven'
}
var obj2 = { 
    name: 'anne'
}
window.name = 'window'
var getName = function(){ 
    alert ( this.name )
}
getName()
getName.call( obj1 )
getName.call( obj2 )
```

#### 借用其他对象的方法

```javascript
(function(){
    Array.prototype.push.call( arguments, 3 ); 
    console.log ( arguments ); 
})( 1, 2 );
```
#### [
](https://juejin.cn/post/6844903751870840839)
原文地址：
