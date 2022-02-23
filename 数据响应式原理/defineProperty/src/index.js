// 创建observe函数， 注意函数的名字没有r
import observe from "./observe";
import Watcher from "./Watcher";
let obj = {
    a: {
        b: {
            c: 5
        }
    },
    m: 2,
    arr: ['张三','李四','王五']
}
observe(obj)
obj.a.b.c = 10
obj.arr.push('李白')
obj.arr.splice(2,1,'hello')
console.log(obj.arr)

new Watcher(obj,'a.b.c',(val) => {
    console.log('*******',val)
})
obj.a.b.c = 999