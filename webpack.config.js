/* === dont forget to import scss to main.js file === */
/* ===> import './main.scss'; <=== */

// ExtractTextPlugin moves all the required *.css modules in entry chunks into a separate CSS file.
// So your styles are no longer inlined into the JS bundle.
// But we have to import css in js file.  Just css in bundled.
// We can use without sass, with just css-loader.

// to autoprefix in webpack use postcss-loader and
// just add 'postcss-loader' in extratplugin use and
// create postcss.config.js, check below!
// https://github.com/postcss/autoprefixer#webpack

const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require("webpack");
const isWebpackDevServer = require('is-webpack-dev-server');

const extractPlugin = new ExtractTextPlugin({
	filename: 'main.css'
});

var imgLoader = 'url-loader';
var imgLoaderOptions = {};
if(!isWebpackDevServer){
	imgLoader = 'file-loader';
	imgLoaderOptions = {
		emitFile: false,
		publicPath: '../images',
		name(file) {
			var fileArr = file.split('/images/');
			return fileArr[1];
		}
	};
}

module.exports = {
	entry: './src/js/main.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'app.js',
		publicPath: '/dist/'
	},
	devServer: {
		contentBase: '/demo/dist/',
		disableHostCheck: true
	},
	resolve: {
		alias: {
			'vue$': 'vue/dist/vue.esm.js'
		},
		extensions: ['*', '.js', '.vue', '.json']
	},
	module: {
		loaders: [{
			exclude: /node_modules/,
			test: /\.js$/,
			loader:  "babel"
		}],
		rules: [
			{
				test: /\.js$/,
				use: [
					{
						loader: 'babel-loader',
						options: {
							presets: ['env']
						}
					}
				]
			},
			{
				test: /\.scss$/,
				use: extractPlugin.extract({
					use: ['css-loader', 'sass-loader']
				})
			},
			{
				test: /\.(png|jpg|gif|svg)$/i,
				loader: imgLoader,
				options: imgLoaderOptions,
			}

		]
	},
	plugins: [
		extractPlugin,
		new webpack.ProvidePlugin({
			$: "jquery",
			jQuery: "jquery"
		})
	]

};
