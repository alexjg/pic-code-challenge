var path = require("path")
var webpack = require("webpack")
var ManifestRevisionPlugin = require('manifest-revision-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var autoprefixer = require("autoprefixer");
var reporter = require("postcss-reporter");
var rucksack = require("rucksack-css");
var syntax = require("postcss-scss");

module.exports = {
    entry: {
        maincss: [path.join(__dirname, '/assets/sass/main.scss')],
        mainjs: ['babel-polyfill', path.join(__dirname, '/assets/js/index.js')]
    },
    output: {
        path: './build/',
        filename: "[name]-[hash].js",
        publicPath: "/assets/",
        chunkFilename: "[id].[chunkhash].js",
    },
    module: {
        preLoaders: [
            {
                test: /\.jsx$|\.js$/,
                loader: "eslint-loader",
                include: __dirname + "/assets"
            },
        ],
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ["react", "es2015", "stage-0"],
                    plugins: ["transform-decorators-legacy"],
                }
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract(
                    "css-loader!postcss-loader!sass-loader"
                )
            },
            {
                test: /\.png$/,
                loader: "url-loader?limit=8192&mimetype=image/png"
            },
            {
                test: /\.jpg$/,
                loader: "url-loader?limit=8192&mimetype=image/jpg"
            },
            {
                test: /\.svg$/,
                loader: "file-loader"
            },
        ],
    },
    postcss: function () {
        return {
            defaults: [
                rucksack({}),
                autoprefixer({ browsers: ['last 2 versions'] }),
                reporter({ clearMessages: true }),
            ],
        }
    },
    resolve: {
        modulesDirectories: ['node_modules'],
        extensions: ['', '.js', '.jsx']
    },
    plugins: [
        new ExtractTextPlugin("[name].[chunkhash].css", {
            allChunks: true
        }),
        new ManifestRevisionPlugin(path.join("build", "manifest.json"),{
            rootAssetPath: "./assets",
            ignorePaths: ["/sass", "/js"],
        }),
    ],
    eslint: {
        formatter: require("eslint-friendly-formatter")
    }
}
