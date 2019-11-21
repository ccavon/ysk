const fs = require('fs');

const PATH = `./node_modules/babel-preset-react-app/create.js`;
const InputStr = `[require("@babel/plugin-proposal-decorators").default, { legacy: true }],`

const InsteadStartLine = 117;

const data = fs.readFileSync(PATH, 'utf8').split('\n')
if (data[InsteadStartLine - 1] !== InputStr) {
  data.splice(InsteadStartLine - 1, 0, InputStr)
} else {
  console.log('已经存在')
}
fs.writeFileSync(PATH, data.join('\n'), 'utf8')