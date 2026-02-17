import path from 'node:path';
import { fileURLToPath } from 'node:url';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
        entry: './src/index.tsx',
        plugins: [
            new HtmlWebpackPlugin({
                template: "./index.html",
            }),
            new ForkTsCheckerWebpackPlugin({
                typescript: {
                    diagnosticOptions: {
                        semantic: true,
                        syntactic: true,
                    },
                    mode: 'write-references',
                },
            }),
        ],
        module: {
            rules: [
                {
                    test: /\.svg$/i,
                    use: [
                        {
                            loader: '@svgr/webpack',
                            options: {
                                icon: true,
                                typescript: true,
                                ext: 'tsx',
                                svgoConfig: {
                                    plugins: [
                                        {
                                            name: 'convertColors',
                                            params: {
                                                currentColor: true,
                                            }
                                        }
                                    ]
                                }
                            }
                        }
                    ],
                },
                {
                    test: /\.(png|jpg|jpeg|gif)$/i,
                    type: 'asset/resource',
                },
                {
                    test: /\.(woff|woff2|eot|ttf|otf)$/i,
                    type: 'asset/resource',
                },
            ],
        },
        resolve: {
            extensions: ['.js', '.jsx', '.ts', '.tsx'],
            alias: {
                '@': path.resolve(__dirname, 'src'),
            },
        },
        output: {
            filename: '[name].[contenthash].js',
            path: path.resolve(__dirname, 'dist'),
            clean: true,
        },
}