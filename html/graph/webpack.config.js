const path = require('path');

module.exports = {
    entry: './main.js',
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
    devtool: 'source-map',
    // https://webpack.js.org/concepts/mode/#mode-development
    mode: 'production'
};