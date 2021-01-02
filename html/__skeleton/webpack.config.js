const path = require('path');

module.exports = {
    entry: ["@babel/polyfill", './src/js/main.js'],
    output: {
        path: path.resolve(__dirname, "dist"),
        library: "LIB",
        libraryTarget: "umd",
        filename: "js/[name].js",
        publicPath: "/dist/",
    },
    resolve: {
        alias: { "@": path.resolve(__dirname, "src/js"), },
        extensions: ['*', '.js', '.jsx', '.tsx', '.ts'],
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx|tsx|ts)$/,
                include: [
                    path.resolve(__dirname, 'src/js')
                ],
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env',
                            '@babel/preset-typescript'
                        ],
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