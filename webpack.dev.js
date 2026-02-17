import {merge} from 'webpack-merge';
import common from './webpack.common.js';
import ReactRefreshTypeScript from "react-refresh-typescript";
import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";

export default merge(common, {
    mode: 'development',
    devtool: 'eval-cheap-module-source-map',
    cache: {
        type: 'filesystem',
    },
    devServer: {
        port: 3000,
        open: true,
        historyApiFallback: true,
        hot: true,
        static: './dist',
    },
    plugins: [
        new ReactRefreshWebpackPlugin(),
    ],
    module: {
        rules: [
            {
                exclude: /node_modules/,
                test: /\.tsx?$/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            transpileOnly: true,
                            getCustomTransformers: () => ({
                                before: [ReactRefreshTypeScript()],
                            }),
                        }
                    }
                ]
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    'style-loader',
                    {
                        loader: "css-loader",
                        options: {
                            esModule: false,
                            modules: {
                                auto: true,
                                localIdentName: '[name]__[local]--[hash:base64:5]',
                                namedExport: false,
                                exportLocalsConvention: 'camelCase',
                            },
                        },
                    },
                    'postcss-loader',
                    "sass-loader",
                ],
            }
        ]
    }
});