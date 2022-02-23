// parse函数，主函数
import parseAttrString from "./parseAttrString";

export default function parse(templateStr) {
    // 指针
    let index = 0
    // 剩余部分
    let rest = ''
    // 开始标记
    let startRegExp = /^\<([a-z]+[1-6]?)(\s[^\<]+)?\>/
    // 结束标记
    let endRegExp = /^\<\/([a-z]+[1-6]?)\>/
    // 文字
    let wordRegExp = /^([^\<]+)\<\/[a-z]+[1-6]?\>/
    // 栈1
    let stack1 = []
    // 栈2
    let stack2 = [{children: []}] // 加一个children，防止循环到最后出栈后为空
    // debugger
    while (index < templateStr.length -1) {
        rest = templateStr.substring(index)
        // 识别遍历到这个字符，是不是一个开始标签
        if (startRegExp.test(rest)) {
            let tag = rest.match(startRegExp)[1],
                attrsString = rest.match(startRegExp)[2], // 标签属性
                attrStringLength = attrsString && attrsString.length > 0 ? attrsString.length : 0

            // 将开始标记推入栈1中
            stack1.push(tag)
            // 将空数组推入栈2中
            stack2.push({tag: tag,children: [],attrs: parseAttrString(attrsString)})
            // console.log(stack1,stack2)
            console.log('检测到开始标记:' + tag)
            // 指针移动标签的长度加2再加attrString的length，为什么要加2呢? 因为<> 也占2位
            index += tag.length + 2 + attrStringLength
        }else if (endRegExp.test(rest)){
            let tag = rest.match(endRegExp)[1]
            let pop_tag = stack1.pop()
            // 检测到和开始标签一致时需要弹栈
            if (tag === pop_tag) {
                let pop_arr = stack2.pop()
                // 判断pop_arr 是否为空数组
                if (stack2.length > 0) {
                    stack2[stack2.length -1].children.push(pop_arr)
                }
            }else {
                // 标签没有闭合，抛出异常
                throw new Error(stack1[stack1.length -1] + '标签没有闭合')
            }
            // console.log(stack1,stack2)
            // console.log('检测到结束标记:' + tag)
            // 指针移动标签的长度加2，为什么要加3呢? 因为</> 也占3位
            index += tag.length + 3
        }else if(wordRegExp.test(rest)) {
            // 识别遍历到这个字符串，是不是文字，并且不能是全空
            let word = rest.match(wordRegExp)[1]
            // 看word 是不是全是空
            if (!/^\s+$/.test(word)) {
                // 不是全是空
                // console.log('检测到文字',word)
                // 改变此时stack2栈顶元素中
                stack2[stack2.length - 1].children.push({text: word, type: 3})
            }
            index += word.length
        } else {
            index ++
        }
    }
    return stack2[0].children[0]
}