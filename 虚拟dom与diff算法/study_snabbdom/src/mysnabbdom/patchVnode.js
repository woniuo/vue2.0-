/*
重要: 经典diff 算法优化策略
四种命中查找:
1.新前与旧前
2.新后与旧后
3.新后与旧前
4.新前与旧后
 */
import createElement from "./createElement";
import updateChildren from "./updateChildren";

export default function (oldVnode, newVnode) {
    // 判断新旧vnode 是否是同一个对象
    if (oldVnode === newVnode) return
    // 判断新 vnode 有没有text 属性
    if (newVnode.text !== undefined && (newVnode.children === undefined || newVnode.children.length === 0)) {
        console.log('新vnode 有text 属性')
        // 判断新vnode中text与老的vnode中text是否相同
        if (newVnode.text !== oldVnode.text) {
            // 如果新虚拟节点中的text 和老的虚拟节点text 不同，那么直接让新的text写入老
            // 的elm 中即可，如果老的elm 中的children，那么也会直接消失掉
            oldVnode.elm.innerText = newVnode.text
        }
    }else {
        // 新的vnode 没有text 属性，有children
        console.log('新的vnode没有text属性')
        // 判断老的有没有children
        if (oldVnode.children !== undefined && oldVnode.children.length > 0) {
            // 老的有children，此时就是最复杂的情况，就是新老都有children
            updateChildren(oldVnode.elm, oldVnode.children, newVnode.children)
        }else {
            // 老的没有children，新的有children
            // 1.清空老的节点的内容
            oldVnode.elm.innerHTML = ''
            // 2.遍历新的vnode 的子节点，创建DOM，上树
            for (let i = 0; i < newVnode.children.length; i++) {
                let dom = createElement(newVnode.children[i])
                oldVnode.elm.appendChild(dom)
            }
        }
    }
}