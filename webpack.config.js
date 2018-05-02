const path = require('path');
const webpack = require('webpack')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const IgnoreEmitPlugin = require('ignore-emit-webpack-plugin');
const ZipPlugin = require('zip-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const nodeExternals = require('webpack-node-externals')
const Dotenv = require('dotenv-webpack');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');

console.log(process.env.SCATTER_ENV);

const production = process.env.SCATTER_ENV === 'production';
const vueAlias = `vue/dist/vue${production ? '.min' : ''}.js`;
const productionPlugins = !production ? [] : [
    new ZipPlugin({ path: '../', filename: 'scatter.zip' }),
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: '"production"'
        }
    }),
    new UglifyJsPlugin()
];

const runningTests = process.env.SCATTER_ENV === 'testing';
const externals = runningTests ? [nodeExternals()] : [];

function replaceSuffixes(file){
    return file
        .replace('scss', 'css')
}

const filesToPack = [
  'background.js',
  'popup.js',
  'content.js',
  'inject.js',
  'prompt.js',
  'scatterdapp.js',
  'styles.scss',
];
const entry = filesToPack.reduce((o, file) => Object.assign(o, {[replaceSuffixes(file)]: `./src/${file}`}), {});

module.exports = {
    entry,
    output: {
        path: path.resolve(__dirname, './build'),
        filename: '[name]'
    },
    resolve: {
        alias: {
            vue: vueAlias,
            'extension-streams': 'extension-streams/dist/index.js',
            'aes-oop': 'aes-oop/dist/AES.js',
        },
        modules: [ path.join(__dirname, "node_modules") ]
    },
    module: {
        loaders: [
            { test: /\.js$/, loader: 'babel-loader', query: { presets: ['es2015', 'stage-3'] }, exclude: /node_modules/ }
        ],
        rules:[
            { test: /\.(sass|scss)$/, loader: ExtractTextPlugin.extract(['css-loader', 'sass-loader']) },
            { test: /\.(html|png)$/, loader: 'file-loader', options: { name: '[name].[ext]' } },
            { test: /\.vue$/, loader: 'vue-loader', options: {
                loaders: {
                    js: 'babel-loader',
                    scss: 'vue-style-loader!css-loader!sass-loader'
                }
            } }
        ]
    },
    plugins: [
        new HardSourceWebpackPlugin(),
        new ExtractTextPlugin({ filename: '[name]', allChunks: true }),
        new IgnoreEmitPlugin(/\.omit$/),
        new CopyWebpackPlugin([`./src/copied`]),
        new Dotenv({
            path: './.env',
            safe: true
        })
    ].concat(productionPlugins),
    stats: { colors: true },
    devtool: 'inline-source-map',
    externals
}