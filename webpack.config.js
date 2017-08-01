const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'lib')
  },
	module: {
		rules: [{
			use: {
					loader:'babel-loader',
					options: { presets: ['es2015'] }
			},
			test: /\.js$/,
			exclude: /node_modules/
		}]
	}
}
