/*
功能是可以在dataObj 对象中，寻找用连续点符号的keyName 属性
比如，dataObj 是
{
    a: {
        b: {
            c: 100
            }
        }
 }
 那么lookup(dataObj,'a.b.c') 的结果就是100
 */
export default function lookup(dataObj,keyName){
    // 判断是否有.符号, 但是不能是.本身
    if (keyName.indexOf('.') !== -1 && keyName !== '.') {
        // 拆分
        let keys = keyName.split('.'),
            // 设置一个临时变量，这个临时变量用于周转，一层一层找下去
            temp = dataObj
        for (let i = 0; i < keys.length; i++) {
            // 每找一层重新赋值
            temp = temp[keys[i]]
        }
        return temp
    }
    // 如果没有.符号
    return dataObj[keyName]
}