// 把attrsString 变为数组返回
export default function (attrString) {
    if (attrString === undefined) return []
    // 当前是否在引号内
    let isYH = false
    // 断点
    let point = 0
    // 结果数组
    let result =[]
    // 遍历attrString，而不是你想的用split()这种暴力方法
    for (let i = 0; i < attrString.length; i++) {
        let char = attrString[i]
        if (char === '"') {
            isYH = !isYH
        }else if (char === ' ' && !isYH) { // 遇见空格，并且不在引号内
            if (!/^\s*$/.test(attrString.substring(point,i))) {
                result.push(attrString.substring(point,i).trim())
                point = i
            }
        }
    }
    // 循环结束之后，最后还剩一个属性k="v"
    result.push(attrString.substring(point).trim())

    // 下面的代码功能是，将["k=v","k=v"]变为[{name: k,value: v},{name: k,value: v}]
    result = result.map(item => {
        // 根据等号拆分
        const o = item.match(/^(.+)="(.+)"$/)
        return {
            name: o[1],
            value: o[2]
        }
    })
    return  result
    // console.log(result)
}