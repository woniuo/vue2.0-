import {def} from "./utils";
import defineReactive from "./defineReactive";
import {arrayMethods} from "./array";
import observe from "./observe";
import Dep from "./Dep";

export default class Observer {
    constructor(value) {
        // 每一个Observer 的实例身上，都有一个dep
        this.dep = new Dep()
        // 给实例(this，一定要注意，构造函数中的this 不是表示类本身，而是表示实例)添加了__obj__属性，值是这次new 的实例
        def(value,'__ob__',this,false)
        // 判断是否为数组
        if (Array.isArray(value)) {
            // 如果是数组，要非常强行的蛮干，将这个数组的原型指向arrayMethods
            Object.setPrototypeOf(value,arrayMethods)
            // 让这个数组变的observe
            this.observeArray(value)
        }else {
            this.walk(value)
        }
    }
    // 遍历
    walk(value) {
        for (let k in value) {
            defineReactive(value,k)
        }
    }
    // 数组的特殊遍历
    observeArray(arr) {
        let l = arr.length;
        for (let i = 0;  i < l; i++) {
            // 逐项进行observe
            observe(arr[i])
        }
    }
}