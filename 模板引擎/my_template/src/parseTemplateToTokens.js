import Scanner from "./Scanner";
import nestTokens from "./nestTokens";

export default function parseTemplateTokens(templateStr) {
    let tokens = []
    // 创建扫描器
    const scanner = new Scanner(templateStr)
    let words
    // 让扫描器工作
    while (!scanner.eos()) {
        // 收集开始标记出现之前的文字
        words = scanner.scanUtil('{{')
        if(words !== '') { // 避免空字符串
            // 去除多余空格 标签中的空格不能去掉
            let isInner = false // 是否在里面
            // 空白字符串
            let _words = ''
            for (let i = 0; i < words.length; i++) {
                // 判断是否在标签中
                if (words[i] === '<') {
                    isInner = true
                }else if (words[i] === '>') {
                    isInner = false
                }
                // 如果这项不是空格，拼接上
                if (!/\s/.test(words[i])) {
                    _words += words[i]
                }else {
                    // 如果这项是空格，只有当它在标签内的时候，才拼接上
                    if (isInner) {
                        _words += ' '
                    }
                }
            }
            // 存起来
            tokens.push(['text', _words])
        }
        // 过双大括号
        scanner.scan('{{')
        // 收集开始标记出现之前的文字
        words = scanner.scanUtil('}}')
        if(words !== '') { // 避免空字符串
            // 这个words 就是{{}} 中间的东西，判断一下首字符
            if(words[0] === '#') {
                // 存起来，从下标为1的项开始存，因为下标为0的项是#
                tokens.push(['#',words.substring(1)])
            }else if(words[0] === '/') {
                // 存起来，从下标为1的项开始存，因为下标为0的项是/
                tokens.push(['/',words.substring(1)])
            }else {
                // 存起来
                tokens.push(['name',words])
            }
         }
        // 过双大括号
        scanner.scan('}}')
    }
    return nestTokens(tokens)
}