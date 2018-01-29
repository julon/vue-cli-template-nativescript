import babel from "rollup-plugin-babel"
import commonjs from "rollup-plugin-commonjs"
import filesize from "rollup-plugin-filesize"
import json from "rollup-plugin-json"
import license from "rollup-plugin-license"
import resolve from "rollup-plugin-node-resolve"
import replace from "rollup-plugin-replace"
import uglify from "rollup-plugin-uglify"
import vue from "rollup-plugin-vue"
import { minify } from "uglify-es"
import path from "path"

const target = process.env.TARGET || 'production'

const config = {
  input: "src/main.js",
  external: (id) => id.startsWith('ui/') || id.startsWith('application') || id.startsWith('text'),
  output: {
    name: '{{ name }}',
    file: "app/app.js",
    format: "cjs",
    sourcemap: false
  },
  plugins: [
    replace({
      "process.env.NODE_ENV": JSON.stringify(target)
    }),
    resolve({
      browser: true,
      jsnext: true,
      extensions: [".js", ".json", ".vue"]
    }),
    commonjs(),
    vue({
      compileTemplate: true,
      css: "app/app.css"
    }),
    json(),
    babel({
      exclude: "node_modules/**",
      runtimeHelpers: true
    }),
    filesize()
  ]
}

// minify on production targets
if (target === "production") {
  config.plugins.push(uglify({}, minify))
  config.plugins.push(license({
    banner: {
      file: path.resolve("LICENSE.md")
    }
  }))
}

module.exports = config
