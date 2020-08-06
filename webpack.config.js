module.exports = {
	mode: 'none',
	output: {
		filename: 'app.js',
	},
	module: {
		rules: [{
			test: /\.(js)$/,
			// exclude: /(node_modules)/,
			loader: 'babel-loader',
			query: {
				presets: ['@babel/preset-env']
			}
		}]
	},
	externals: {
		jquery: 'jQuery'
	}
}