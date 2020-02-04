import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from "rollup-plugin-babel";
import json from '@rollup/plugin-json';
import { uglify } from "rollup-plugin-uglify";
// import { terser } from 'rollup-plugin-terser';
// import { eslint } from 'rollup-plugin-eslint';

const version = require('./package.json').version;

const isProd = process.env.NODE_ENV === 'production';

const banner =
  '/*!\n' +
  ` * guard-map.js v${version}\n` +
  ` * (c) 2014-${new Date().getFullYear()} Steinitz\n` +
  ' * Released under the MIT License.\n' +
  ' */';

export default [
	{
    input: 'src/main.js',
    // external: ['echarts'],
		output: {
			file: 'dist/index.js',
      format: 'cjs'
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



