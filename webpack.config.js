const path = require('path');

module.exports = {
	entry: './src/index.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js'
	},
	module: {
		rules: [
            { test: /\.jsx?$/, loader: ['babel-loader?cacheDirectory'] }
		]
    },
    devServer: {
	contentBase: "./dist"
    },
    mode: "development"
}