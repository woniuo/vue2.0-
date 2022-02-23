import h from './mysnabbdom/h'
import patch from './mysnabbdom/patch'

const myVnode1 = h('ul',{key: 'node'},[
    h('li',{key: 'A'},'A'),
    h('li',{key: 'B'}, 'B'),
    h('li',{key: 'C'}, 'C')
])
const myVnode2 = h('ul',{key: 'node'},[
    h('li',{key: 'Q'}, 'Q'),
    h('li',{key: 'F'}, 'F'),
    h('li',{key: 'G'}, 'G'),
    h('li',{key: 'B'}, 'B'),
    h('li',{key: 'E'}, 'E'),
    h('li',{key: 'C'}, 'CCC')

])
const container = document.querySelector('#container')
const btn = document.querySelector('#btn')

patch(container,myVnode1)

btn.onclick = function () {
    patch(myVnode1,myVnode2)
}