import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import babel from "rollup-plugin-babel";
import { uglify } from "rollup-plugin-uglify";
// import { terser } from 'rollup-plugin-terser';
// import { eslint } from 'rollup-plugin-eslint';

const version = require('./package.json').version;

const isProd = process.env.NODE_ENV === 'production';

const banner = `/*
* guard-map.js v${version}
* (c) 2019-${new Date().getFullYear()} Steinitz
* Released under the MIT License.
*/`;

export default [
	{
    input: 'src/main.js',
    external: ['echarts'],
		output: {
      name: 'guardMap',
      file: 'dist/bundle.js',
      format: 'umd',
      banner
		},
		plugins: [
      json(),
			resolve(),
			commonjs(),
			// eslint(),
			babel({
        // 防止打包node_modules下的文件
        exclude: 'node_modules/**'
      }),
      uglify()
			// terser()
		]
	}
];



