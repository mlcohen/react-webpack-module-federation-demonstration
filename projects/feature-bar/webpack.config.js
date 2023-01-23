const package = require("./package.json");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

const REMOTE_MODULE_NAME = "FeatureBar";

const config = {
    mode: "development",
    context: path.join(__dirname, "src"),
    entry: "./index.js",
    resolve: {
        extensions: [".js", ".jsx"],
    },
    output: {
        filename: "[name]-[chunkhash].bundle.js",
        path: path.join(__dirname, "dist"),
    },
    plugins: [
        new ModuleFederationPlugin({
            name: REMOTE_MODULE_NAME,
            filename: "moduleEntry.js",
            exposes: {
                "./Bar": "./Bar.jsx",
            },
            shared: {
                "react": {
                    requiredVersion: package.dependencies.react,
                    singleton: true,
                    eager: true,
                    strictVersion: true,
                },
                "react-dom": {
                    requiredVersion: package.dependencies["react-dom"],
                    singleton: true,
                    eager: true,
                    strictVersion: true,
                },
            },
        }),
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: path.join(__dirname, "/assets/index.html"),
            excludeChunks: [REMOTE_MODULE_NAME],
        }),
    ],
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /\/node_modules\//,
                use: 'babel-loader'
            }
        ]
    },
    devtool: false,
    target: "web",
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /\/node_modules\//,
                    name: 'vendor',
                    filename: '[name]-[chunkhash].bundle.js',
                    chunks: 'all',
                },
            },
        },
    },
};

module.exports = config;
