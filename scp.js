const pkg = require('./package.json')
const dir = `/mnt/nfs/web/www/wechat/ytools/${pkg.name.split('/')[1] || 'none'}/`
console.log(`ssh -p 22000 castle@hz.s.tansuyun.cn "mkdir -p ${dir}" && scp -P 22000 dist/index.html castle@hz.s.tansuyun.cn:${dir}index.html`)