import parseTemplateTokens from "./parseTemplateToTokens";
import renderTemplate from "./renderTemplate";
// 全局提供MyTemplate 对象
window.MyTemplate = {
    // 渲染方法
    render(templateStr,data) {
        // 调用parseTemplateTokens 函数，让模板字符串能够变为tokens 数组
       let tokens =  parseTemplateTokens(templateStr)
        // 调用renderTemplate 函数，让tokens 数组变为dom字符串
        let domStr = renderTemplate(tokens,data)
        return domStr
    }
}