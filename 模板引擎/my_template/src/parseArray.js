/*
    处理数组，结合renderTemplate实现递归
    注意，这个函数收的参数是token，而不是tokens
    toekn是什么，就是一个简单的['#','arr',[]]

    这个函数要递归调用renderTemplate 函数，调用多少次？？
    千万别蒙圈，调用的次数有data 决定
    比如data 的额形式是这样的:
    {
         arr: [
            {name: '张三',sex: '男',age: 18,hobbies: ['跑步','打篮球','打游戏']},
            {name: '李四',sex: '男',age: 12,hobbies: ['滑雪','跳绳']},
            {name: '王五',sex: '女',age: 28,hobbies: ['骑行','唱歌']}
        ]
    }
    那么parseArray() 函数就要递归调用renderTemplate 函数3次，因为数组的长度是3
 */
import lookup from "./lookup";
import renderTemplate from "./renderTemplate";

export default function parseArrayi(token, data) {
    // console.log(token)
    // 得到整体数据data 中的这个数组要使用的部分
   let v = lookup(data,token[1])
    // 结果字符串
    let resultStr = ''
    // 遍历v 数组，v 一定是数组
    // 注意，下面这个循环可能是整个包中最难思考的一个循环
    // 它是遍历数据，而不是遍历tokens
    for (let i = 0; i < v.length; i++) {
        // 需要补一个.属性 - 用户遍历简单数组
        resultStr += renderTemplate(token[2],{
            ...v[i],
            '.': v[i]
        })
    }
    return resultStr
}