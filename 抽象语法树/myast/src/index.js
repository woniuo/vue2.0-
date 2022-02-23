import parse from "./parse";

let templateString = `
    <div>
        <h3 id="box" class="a-box b-box c-box">你好</h3>
        <ul>
            <li>A</li>
            <li>B</li>
            <li>C</li>
        </ul>
    </div>
`

const ast = parse(templateString)
console.log(ast)