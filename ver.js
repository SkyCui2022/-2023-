const fs = require('fs')
const day = require('dayjs')
let file = (!process.cwd().includes('/dist') ? 'dist/' : '') + 'index.html'
let content = fs.readFileSync(file, { encoding: 'utf8' })
const Ver = day().format('YYYY-MM-DD_HH:mm:ss')
if (content.includes('._Ver = ')) {
    content = content.replace(/\._Ver = "[\d:_\-]+"/, '._Ver = "' + Ver + '"')
} else {
    content = content.replace('</script>', '</script><script src="//npm.tansuyun.cn/vconsole@latest/dist/vconsole.min.js"></script><script>window._Ver = "' + Ver + `";console.log("当前版本:",_Ver);if (location.href.includes('debug=1')){alert('版本:'+_Ver);new window.VConsole();}</script>`)
}
fs.writeFileSync(file, content)