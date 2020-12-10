const path = require('path');

module.exports = {
    entry: ["@babel/polyfill", './main.js'],
    output: {
        path: path.resolve(__dirname, "dist"),
        library: "APP",
        libraryTarget: "umd",
        filename: "js/[name].js",
        publicPath: "/dist/",
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "src/js"),
        },
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                include: [
                    path.resolve(__dirname, 'src/js')
                ],
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    }
                }
            }
        ]
    },
    // https://webpack.js.org/concepts/mode/#mode-development
    // devtool: 'source-map',
    // mode: 'development'
    mode: 'production'
};