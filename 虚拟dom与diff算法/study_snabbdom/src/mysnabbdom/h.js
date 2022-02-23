import vnode from "./vnode";

// 编写一个低配版本的h 函数， 这个函数必须接受3个参数，缺一不可
// 相当于它的重载功能较弱
// 也就是说，调用的时候形态必须是下面的三种之一
// 形态1 h('div',{},'文字')
// 形态2 h('div',{},[])
// 形态3 h('div',{},h())

export default function h(sel, data, c) {
    // 检查参数的个数 - arguments 函数的的参数
    if (arguments.length !== 3)
        throw new Error('h函数必须传入3个参数')
    // 检查参数c 的类型
    if (typeof c === 'string' || typeof c === 'number') {
        // 说明现在调用的h函数是形态1
        return vnode(sel, data, undefined, c, undefined)
    }else if (Array.isArray(c)) {
        // 说明调用的是形态2
        let children = []
        // 遍历c
        for (let i = 0; i < c.length; i++) {
            // 检查c[i] 必须是一个对象，如果不满足
            if (!(typeof c[i] === 'object' && c[i].hasOwnProperty('sel'))) {
                throw new Error(`传入的的数组中第${i}项不是h函数`)
            }
            // 这个不用执行c[i], 因为你的测试语句中已经有了执行
            // 此时只需要收集好就可以了
            children.push(c[i])
        }
        /* 循环结束了，就是说明children 收集完毕了，此时可以返回虚拟节点了，它有
        children属性
         */
        return vnode(sel,data,children,undefined,undefined)
    }else if (typeof c === 'object' && c.hasOwnProperty('sel')) {
        // 说明调用的是形态3
        let children = [c]
        return vnode(sel,data,children,undefined,undefined)

    }else {
        throw new Error('传入的第三个参数类型不对')
    }

}