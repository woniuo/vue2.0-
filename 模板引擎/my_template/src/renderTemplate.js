/*
函数的功能就是让tokens 数组变为dom字符串
 */
import lookup from "./lookup";
import parseArray from "./parseArray";

export default function renderTemplate(tokens, data) {
    // console.log(tokens,data)
    // 结果字符串
    let resultStr = ''
    // 遍历tokens
    for (let i = 0; i < tokens.length; i++) {
        let token = tokens[i]
        // 判断类型
        if (token[0] === 'text') {
            // 直接拼接
            resultStr += token[1]
        }else if (token[0] === 'name') {
            resultStr += lookup(data,token[1])
        }else if (token[0] === '#') {
           resultStr += parseArray(token,data)
        }
    }
    return resultStr
}