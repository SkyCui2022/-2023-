/// <reference types="vitest" />
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { visualizer } from 'rollup-plugin-visualizer'
// import { viteExternalsPlugin } from 'vite-plugin-externals'
//@ts-ignore
const { argv } = require('process')

// import VitePluginImp from 'vite-plugin-imp'
//@ts-ignore
const pkg = require('./package.json')
const pack = {
  // vue: /vue|pinia/,
  // ctsy: /ctsy|yakj/,
  lib: /sign|merge|md5|is-buff|crypt|charenc|ctsy|yakj/
}
// const ver = pkg.version.split('.').map((o, i) => {
//   return i == 2 ? Number(o) + 1 : o
// }).join('.')

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    environment: 'happy-dom',
    globals: true
  },
  base:
    // argv[argv.length - 1] == 'build'
    //   ? `//npm.tansuyun.cn/${pkg.name}@${pkg.version}/dist/`
    //   :
    './',
  plugins: [
    vue()
    // AutoImport({
    //   resolvers: [ElementPlusResolver(), VantResolver()],
    // }),
    // Components({
    //   resolvers: [ElementPlusResolver(), VantResolver()],
    // }),
    // viteExternalsPlugin({
    //   vue: 'Vue',
    //   lodash: '_',
    //   axios: 'axios',
    //   dayjs: 'dayjs',
    //   pinia: 'Pinia',
    //   vant: 'vant',
    //   buffer: 'Buffer',
    //   'vue-demi': 'VueDemi',
    //   'vue-router': "VueRouter"
    // }),
  ],
  build: {
    // lib: {
    //   entry: 'src/main.ts',
    //   name: 'd2',
    //   formats: ['umd']
    // },
    target: 'es2015',
    minify: 'esbuild',
    reportCompressedSize: false,
    chunkSizeWarningLimit: 512,
    // terserOptions: {
    //   compress: {
    //     drop_debugger: true,
    //     drop_console: true,
    //   }
    // },
    rollupOptions: {
      external: [
        // 'axios',
        // 'vue-router', 'axios', 'lodash'
      ],
      plugins: [
        // commonjs(),
        // externalGlobals({
        //   axios: 'Axios'
        //   // vue: "Vue",
        //   // "ant-design-vue": "antd",
        //   // moment: "moment",
        // }),
      ],
      output: {
        manualChunks (id, p) {
          if (id.slice(-3) == '.js') {
            for (let k in pack) {
              if (pack[k].test(id)) {
                return k
              }
            }
            //@ts-ignore
            if (id.includes('node_modules')) {
              return id
                .split('node_modules/')[1]
                .split('/')[0]
                .toString()
            }
          }
          return 'other'
        }
        // globals: {
        //   vue: 'Vue',
        //   // axios: 'axios',
        //   // lodash: '_'
        // }
      }
    }
  }
})
