const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
    },
}; module.exports = {
    entry: './path/to/my/entry/file.js'
};
module.exports = {
    output: {
        filename: 'my-first-bundle.js',
        pathname: __dirname + '/dist'
    }
}
moduel.exports = {
    module: {
        rules: [
            { test: /\.txt$/, use: 'raw-loader' }
        ]
    }
}
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    plugins: [
        new HtmlWebpackPlugin({ template: './src/index.html' })
    ]
};