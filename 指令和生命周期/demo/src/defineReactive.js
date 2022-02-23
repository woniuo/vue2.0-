import observe from "./observe";
import Dep from "./Dep";

export default function defineReactive(data,key,val) {
    const dep = new Dep()
    if (arguments.length === 2) {
        val = data[key]
    }
    // 子元素要进行observe，至此形成了递归，这个递归不是函数自己调用自己，而是多个函数，类循环调用
    let childObj = observe(val)
    Object.defineProperty(data,key,{
        // 可枚举
        enumerable: true,
        // 可以被配置，比如可以delete
        configurable: true,
        // getter
        get() {
            // console.log('试图访问'+ key + '属性')
            // 如果现在处于依赖收集阶段
            if (Dep.target) {
                dep.depend()
                if (childObj) {
                    childObj.dep.depend()
                }
            }
            return val
        },
        // setter
        set(newValue) {
            if (val === newValue) return
            // console.log('试图修改'+ key + '属性')
            val = newValue
            // 当设置了新值，这个新值也要被observe
            childObj = observe(newValue)
            dep.notify()
        }
    })
}