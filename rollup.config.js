import resolve from '@rollup/plugin-node-resolve';
import babel from 'rollup-plugin-babel';
const packageJson = require('./package.json');

export default {
	input : "src/main.js",
	format : "umd",
	moduleName : "guard-map",
	plugins: [
		resolve({
			module: true,
			jsnext: true,
			preferBuiltins: false
		}),

		babel({
		  "presets": [
		    ["latest", {
		      "es2015": {
		        "modules": false
		      }
		    }]
		  ],
		  "plugins": ["external-helpers"],
		  "externalHelpers": false
		}
)
	],
	dest  : "dist/guard-map.es5.js",
	sourceMap: true,
	banner: "/** guard-map.js v" + packageJson.version + " */"
}
