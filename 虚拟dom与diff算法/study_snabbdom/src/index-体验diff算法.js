import { init } from 'snabbdom/init'
import { classModule } from 'snabbdom/modules/class'
import { propsModule } from 'snabbdom/modules/props'
import { styleModule } from 'snabbdom/modules/style'
import { eventListenersModule } from 'snabbdom/modules/eventlisteners'
import { h } from 'snabbdom/h'

// 创建出patch 函数
const path = init([classModule,propsModule,styleModule,eventListenersModule])

const vnode1 = h('ul',{},[
    h('li',{key: 'A'},'A'),
    h('li',{key: 'B'},'B'),
    h('li',{key: 'C'},'C'),
    h('li',{key: 'D'},'D')
])
const vnode2 = h('ul',{},[
    h('li',{key: 'E'},'E'),
    h('li',{key: 'A'},'A'),
    h('li',{key: 'B'},'B'),
    h('li',{key: 'C'},'C'),
    h('li',{key: 'D'},'D')

])

const container = document.querySelector('#container')
const btn = document.querySelector('#btn')

path(container,vnode1)

// 点击新增节点
btn.onclick = function () {
    path(vnode1,vnode2)
}