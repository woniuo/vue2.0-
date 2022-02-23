import { init } from 'snabbdom/init'
import { classModule } from 'snabbdom/modules/class'
import { propsModule } from 'snabbdom/modules/props'
import { styleModule } from 'snabbdom/modules/style'
import { eventListenersModule } from 'snabbdom/modules/eventlisteners'
import { h } from 'snabbdom/h'

// 创建出patch 函数
const patch = init([classModule, propsModule, styleModule, eventListenersModule])

// 创建虚拟节点
const myVnode1 = h('a', {
    props: {
        href: 'http://www.baidu.com',
        target: '_blank'
    }
    },'百度')

const myVnode2 = h('div','我是一个div')

// 嵌套使用
const myVnode3 = h('ul',[
    h('li','小明'),
    h('li','小强'),
    h('li',[
        h('span','哈哈哈')
    ])
])

// 让虚拟节点上树
const container = document.querySelector('#container')
patch(container, myVnode3)