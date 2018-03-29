import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'

import packageJson from './package.json'

const babelOpts = {
  presets: ['es2015-rollup', 'flow'],
  plugins: [
    'transform-async-to-generator',
    'transform-class-properties',
    ['transform-es2015-for-of', { loose: true }],
    'transform-object-rest-spread',
    'transform-regenerator'
  ]
}

const commonjsOpts = {
  include: 'build/bundle.js'
}

const external = [
  'regenerator-runtime/runtime',
  ...Object.keys(packageJson.dependencies),
  ...Object.keys(packageJson.devDependencies)
]

export default [
  {
    external,
    input: 'src/index.js',
    output: [
      { file: packageJson.main, format: 'cjs' },
      { file: packageJson.module, format: 'es' }
    ],
    plugins: [commonjs(commonjsOpts), babel(babelOpts)],
    sourcemap: true
  }
]
