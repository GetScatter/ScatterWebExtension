const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const IgnoreEmitPlugin = require('ignore-emit-webpack-plugin');
const ZipPlugin = require('zip-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');


function replaceSuffixes(file){
    return file
        .replace('scss', 'css')
}

const filesToCopy = [
    'index.html',
    'manifest.json',
    'icon.png',
    'copied'
];

const filesToPack = [
  'background.js',
  'popup.js',
  'content.js',
  'inject.js',
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
            vue: 'vue/dist/vue.js',
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
        new ExtractTextPlugin({ filename: '[name]', allChunks: true }),
        new IgnoreEmitPlugin(/\.omit$/),
        new CopyWebpackPlugin(filesToCopy.map(file => `./src/${file}`)),
        new ZipPlugin({ path: '../', filename: 'scatter.zip' }),
    ],
    stats: { colors: true },
    devtool: 'inline-source-map'
}