const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: {
        popup: path.resolve('src/popup/popup.tsx'),
        options: path.resolve('src/options/options.tsx'),
        background: path.resolve('src/background/background.ts'),
        content: path.resolve('src/contentScript/contentScript.ts'),
    },
    module: {
        rules: [
            {
                use: 'ts-loader',
                test: /\.tsx?$/,
                exclude: /node_modules/
            },
{
                use: ['style-loader', 'css-loader'],
                test: /\.css$/i,
            },
            {
                type: "asset/resource",
                test: /\.(woff|woff2|eot|ttf|png|svg|jpg|jpeg|gif)$/,
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin({
            cleanStaleWebpackAssets: false
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve('src/static'),
                    to: path.resolve("dist")
                }
            ]
        }),
        ...getHtmlPlugins([
            'popup',
            'options'
        ])
    ],
    resolve: {
        extensions: [ '.tsx', '.ts', '.js' ]
    },
    output: {
        filename: '[name].js',
        path: path.resolve('dist')
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
        }
    }
}

function getHtmlPlugins(chunks) {
    return chunks.map(chunk => new HtmlWebpackPlugin({
        title: "AutoJetIQ",
        filename: `${chunk}.html`,
        chunks: [chunk],
        template: path.resolve(`src/${chunk}/${chunk}.html`)
    }));
}