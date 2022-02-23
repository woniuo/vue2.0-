// 得到Array.prototype
import {def} from "./utils";

const arrayPrototype = Array.prototype

// 以Array.prototype 为原型创建arrayMethods 对象
export  const arrayMethods = Object.create(arrayPrototype)

// 要被改写的7个数组方法
const methodsNeedChange = [
    'push',
    'pop',
    'shift',
    'unshift',
    'splice',
    'sort',
    'reverse'
]

methodsNeedChange.forEach(methodName => {
    // 备份原来的方法
    const original = arrayPrototype[methodName]
    // 定义新的方法
    def(arrayMethods,methodName,function () {
        const args = [...arguments]
        // 恢复原来的功能
        const result = original.apply(this,args)
        // 把这个数组身上的__ob__ 取出来，__ob__ 已经被添加了，为什么已经被添加了?因为数组肯定不是最高层
        // 比如obj.arr属性是数组，obj不能是数组，第一次遍历obj这个对象的第一层的时候，已经给arr属性
        // (就是这个数组) 添加了__ob__ 属性
        const ob = this.__ob__
        // 有三种方法push\unshift\splice 能够插入新项，现在要把插入的新项也要变成observe
        let inserted = []
        switch (methodName) {
            case 'push':
            case 'unshift':
                inserted = args
                break;
            case 'splice':
                inserted = args.slice(2)
                break;
        }
        // 判断有没有要插入的新项,让新项也变为响应式的
        if (inserted.length > 0) {
            ob.observeArray(inserted)
        }
        ob.dep.notify()
        return result
    },false)
})