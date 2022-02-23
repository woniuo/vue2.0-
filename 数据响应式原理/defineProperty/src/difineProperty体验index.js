let objs = {}

// Object.defineProperty(objs,'a',{
//     value: 3,
//     writable: false // 是否可写
// })
//
// Object.defineProperty(objs,'b',{
//     value: 5,
//     enumerable: false // 是否可以枚举
// })
//
// Object.defineProperty(objs,'c',{
//     get() {
//         console.log('访问objs的c属性')
//     },
//     set() {
//         console.log('改变objs的c属性')
//     }
// })
//
// objs.a ++
// objs.c ++
// console.log(objs.a)
// console.log(objs.b)
// console.log(objs)

// 利用闭包来实现val 共用
function defineReactive(data,key,val) {
    Object.defineProperty(data,key,{
        get() {
            console.log('访问a属性')
            return val
        },
        set(newValue) {
            if (val === newValue) return
            console.log('修改a属性')
            val = newValue
        }
    })
}
defineReactive(objs,'a',10)

console.log(objs.a)
objs.a = 20
console.log(objs.a)
