// 判断是否是同一个虚拟节点
import patchVnode from "./patchVnode";
import createElement from "./createElement";

function checkSameVnode(a, b) {
    return a.sel === b.sel && a.key === b.key
}
export default function updateChildren(parentElm, oldCh, newCh) {
    // 旧前
    let oldStartIdx = 0
    // 新前
    let newStartIdx = 0
    // 旧后
    let oldEndIdx = oldCh.length - 1
    // 新后
    let newEndIdx = newCh.length -1

    // 旧前节点
    let oldStartVnode = oldCh[0]
    // 新前节点
    let newStartVnode = newCh[0]
    // 旧后节点
    let oldEndVnode = oldCh[oldEndIdx]
    // 新后节点
    let newEndVnode = newCh[newEndIdx]

    let keyMap = null

    // 循环判断
    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
        // 首先判断是否要略过已经加了undefined 标记的东西
        if (oldStartVnode === null || oldCh[oldStartIdx] === undefined) {
            oldStartVnode = oldCh[++oldStartIdx]
        }else if (oldEndVnode === null || oldCh[oldEndIdx] === undefined) {
            oldEndVnode = oldCh[++oldEndIdx]
        }else if (newStartVnode === null || newCh[newStartIdx] === undefined) {
            newStartVnode = newCh[++newStartIdx]
        }else if (newEndVnode === null || newCh[newEndIdx] === undefined) {
            newEndVnode = newCh[++newEndIdx]
        }else
        // 新前和旧前
        if (checkSameVnode(oldStartVnode,newStartVnode)) {
            console.log('新前与旧前命中')
            patchVnode(oldStartVnode, newStartVnode)
            oldStartVnode = oldCh[++oldStartIdx]
            newStartVnode = newCh[++newStartIdx]
        }
        // 新后和旧后
        else if (checkSameVnode(oldEndVnode, newEndVnode)) {
            // debugger
            console.log('新后与旧后命中')
            patchVnode(oldEndVnode, newEndVnode)
            oldEndVnode = oldCh[--oldEndIdx]
            newEndVnode = newCh[--newEndIdx]
        }
        // 新后和旧前
        else if (checkSameVnode(oldStartVnode, newEndVnode)) {
            console.log('新后与旧前命中')
            patchVnode(oldStartVnode, newEndVnode)
            // 点新后与旧前命中的时候，此时要移动节点，移动新前指向的这个节点到老节点的旧后的后面
            // 如何移动节点? 只要你插入一个已经在DOM树上的节点，它就会被移动
            parentElm.insertBefore(oldStartVnode.elm, oldEndVnode.elm.nextSibling)
            oldStartVnode = oldCh[++oldStartIdx]
            newEndVnode = newCh[--newEndIdx]
        }
        // 新前和旧后
        else if (checkSameVnode(oldEndVnode, newStartVnode)) {
            console.log('新前与旧后命中')
            patchVnode(oldEndVnode, newStartVnode)
            // 当新前和旧后命中的时候，此时要移动节点，移动新前指向的这个节点到老节点的旧前的前面
            // 如何移动节点? 只要你插入一个已经在DOM树上的节点，它就会被移动
            parentElm.insertBefore(oldEndVnode.elm, oldStartVnode.elm)
            oldEndVnode = oldCh[--oldEndIdx]
            newStartVnode = newCh[++newStartIdx]
        }else {
            // 都没有找到
            // 寻找key 的map
            if (!keyMap) {
                keyMap = {}
                // 从oldStartIdx 开始，到oldEndIdx 结束，创建keyMap 映射对象
                for (let i = oldStartIdx; i < oldEndIdx; i++) {
                    const key = oldCh[i].key
                    if (key !== undefined) {
                        keyMap[key] = i
                    }
                }
            }
            // 寻找当前这项（newStartIdx）这项在keyMap中映射的位置序号
            const idxIndex = keyMap[newStartVnode.key]
            if (idxIndex === undefined) {
                // 判断，如果idxIndex是undefined 表示它是全新的项
                // 被加入的项(就是newStartVnode这项) 现不是真正的DOM节点
                parentElm.insertBefore(createElement(newStartVnode),oldStartVnode.elm)
            }else {
                // 如果不是undefined ，不是全新的项，而是要移动
                const elmToMove = oldCh[idxIndex]
                patchVnode(elmToMove,newStartVnode)
                // 把这项设置为undefined ，表示已经处理完了这项
                oldCh[idxIndex] = undefined
                // 移动，调用insertBefore 也可以实现移动
                parentElm.insertBefore(elmToMove.elm,oldStartVnode.elm)
            }
            newStartVnode = newCh[++newStartIdx]
        }
    }
    // 继续看看有没有剩余的，循环结束了start 还是比old小
    if (newStartIdx <= newEndIdx) {
        // 插入的标杆
        for (let i = newStartIdx; i <= newEndIdx; i++) {
            parentElm.insertBefore(createElement(newCh[i]),oldCh[oldStartIdx].elm)
        }
    }else if (oldStartIdx <= oldEndIdx) {
        // 批量删除oldStart 和 oldEnd 指针之间的项
        for (let i = oldStartIdx; i <= oldEndIdx; i++) {
            parentElm.removeChild(oldCh[i].elm)
        }
    }
}