const path = require("path");
const package = require("./package.json");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin"); 

const appConfig = {
    name: "app",
    mode: "development",
    // dependencies: ["vendor"],
    context: path.join(__dirname, "src"),
    entry: "./main.js",
    output: {
        filename: "[name]-[chunkhash].bundle.js",
        path: path.join(__dirname, "dist"),
    },
    resolve: {
        extensions: [".js", ".jsx"]
    },
    devtool: false,
    target: "web",
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /\/node_modules\//,
                use: 'babel-loader'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: path.join(__dirname, "/assets/index.html"),
        }),
        new ModuleFederationPlugin({
            name: "host",
            remotes: {
                FeatureFoo: `promise new Promise(${fetchRemoteModule("FeatureFoo", "/moduleEntry.js")})`,
                FeatureBar: `promise new Promise(${fetchRemoteModule("FeatureBar", "/moduleEntry.js")})`,
            },
            shared: {
                "react": {
                    requiredVersion: package.dependencies.react,
                    singleton: true,
                    eager: true,
                },
                "react-dom": {
                    requiredVersion: package.dependencies["react-dom"],
                    singleton: true,
                    eager: true,
                },
            },
        }),
    ],
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

let config = [
    appConfig
];

function fetchRemoteModule(remoteId, path) {
    return `
    (resolve) => {
        const script = document.createElement("script");
        script.src = window.${remoteId}Url + "${path}";
        script.onload = () => {
            const m = {
                get: (request) => window.${remoteId}.get(request),
                init: (arg) => {
                    try {
                        return window.${remoteId}.init(arg);
                    } catch (e) {
                        console.log("${remoteId} has already been loaded");
                    }
                },
            };
            resolve(m);
        }
        document.head.appendChild(script);
    }
    `;
}

module.exports = config;