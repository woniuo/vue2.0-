import Watcher from "./Watcher";

export default class Compile {
    constructor(el, vue) {
        // vue实例
        this.$vue = vue;
        // 挂载点
        this.$el = document.querySelector(el)
        // 如果用户传入了挂载点
        if (this.$el) {
            // 调用函数，让节点变为fragment,类似于mustache 中的tokens。实际上用的AST，这里就是轻量级，fragment
            let $fragment = this.nodeFragment(this.$el)
            // 编译
            this.compile($fragment)
            // 替换好的内容要上树
            this.$el.appendChild($fragment)
        }
    }
    nodeFragment(el) {
        let fragment = document.createDocumentFragment(),
            child = null;
        // 让所有DOM 节点，都进入fragment
        while (child = el.firstChild) {
            fragment.appendChild(child)
        }
       return fragment
    }
    compile(el) {
        // 得到子元素
        let childNodes = el.childNodes,
            that = this,
            reg = /\{\{(.*)\}\}/;
        childNodes.forEach(node => {
            let text = node.textContent
            if (node.nodeType === 1) {
                that.compileElement(node)
            }else if (node.nodeType === 3 && reg.test(text)) {
                let name = text.match(reg)[1]
               this.compileText(node,name)
            }
        })
    }
    compileElement(node) {
        // 这里的方便之处在于不是将HTML 结构看做字符串，而是正真的属性列表
        let nodeAttrs = node.attributes,
            that = this
        // 类数组对象变为数组
        Array.prototype.slice.call(nodeAttrs).forEach(attr => {
            // 这里就分析指令
            let attrName = attr.name,
                value = attr.value,
            // 指令都是v- 开头的
                dir = attrName.substring(2);
            // 看看是不是指令 - v- 开头的就是指令
            if (attrName.indexOf('v-') === 0) {
                if (dir === 'model') {
                    // console.log('发现model指令',value)
                    new Watcher(that.$vue,value, val => {
                        node.value = val
                    })
                    let v = that.getVueVal(that.$vue, value)
                    node.value = v

                    node.addEventListener('input',e => {
                        let newVal = e.target.value
                        that.setVueVal(that.$vue,value,newVal)
                        v = newVal
                    })
                }else if (dir === 'if') {
                    console.log('发现if指令',value)
                }
            }
        })
    }
    compileText(node,name) {
        node.textContent = this.getVueVal(this.$vue,name)
        new Watcher(this.$vue,name, value => {
            node.textContent = value
        })
    }
    getVueVal(vue,exp) {
        let val = vue
        exp = exp.split('.')
        exp.forEach(k => {
            val = val[k]
        })
        return val
    }
    setVueVal(vue,exp,value) {
        let val = vue
        exp = exp.split('.')
        exp.forEach((k,i) => {
            if (i < exp.length - 1) {
                val = val[k]
            }else {
                val[k] = value
            }
        })
        return val
    }
}