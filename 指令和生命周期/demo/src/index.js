import Compile from "./Compile";
import observe from "./observe";
import Watcher from "./Watcher";

class Vue {
    constructor(options) {
        // 把参数options 对象存为$options
        this.$options = options || {};
        // 数据
        this._data = options.data || undefined
        // 数据监听
        observe(this._data)
        // 数据要变为响应式的
        this._initData()
        this._initWatch()
        // 模板编译
        new Compile(options.el, this)
    }
    _initData() {
        let that = this
        Object.keys(this._data).forEach(key => {
            Object.defineProperty(that,key,{
                get() {
                    return that._data[key];
                },
                set(newVal) {
                    that._data[key] = newVal;
                }
            })
        })
    }
    _initWatch() {
        let that = this,
            watch = this.$options.watch;
        Object.keys(watch).forEach(key => {
            new Watcher(that,key, watch[key])
        })
    }
}

// 暴露到window中去
window.Vue = Vue