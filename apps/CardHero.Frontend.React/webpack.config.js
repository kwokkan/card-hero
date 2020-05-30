﻿const glob = require("glob");
const path = require("path");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const PurgecssPlugin = require("purgecss-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const webpack = require("webpack");

const isProd = process.env.NODE_ENV === "production";
const chAnalyse = !!process.env.CH_ANALYSE;

const constants = require("./src/constants/constants.ts");
const pathSep = path.sep;
const sourcePath = path.resolve(__dirname, "src") + pathSep;
const modulePath = path.resolve(__dirname, "node_modules") + pathSep;
const moduleLength = modulePath.length;

module.exports = {
    mode: isProd ? "production" : "development",

    // Enable sourcemaps for debugging webpack's output.
    devtool: isProd ? false : "hidden-source-map",

    entry: {
        "app.main": [
            "./src/globals.ts",
            "./src/app/index.tsx"
        ],
        "styles.shared": [
            //"./src/styles/index.tsx",
            "./src/styles/vendor.scss",
            "./src/styles/index.scss"
        ]
    },

    output: {
        filename: isProd ? "[name].[contenthash].min.js" : "[name].bundle.min.js",
        path: path.resolve(__dirname, "../CardHero.NetCoreApp.TypeScript/wwwroot/dist"),
        devtoolModuleFilenameTemplate: "/src/[resource-path]?[loaders]",
        jsonpFunction: "wj"
    },

    cache: true,

    bail: true,

    //watch: true,
    watchOptions: {
        ignored: [
            "node_modules"
        ]
    },

    optimization: {
        minimize: isProd,
        minimizer: isProd ? [
            new TerserPlugin({
                cache: true,
                parallel: true,

                terserOptions: {
                    ecma: 8,
                    toplevel: true,
                    compress: {
                        booleans_as_integers: true,
                        drop_console: true,
                        ecma: 8,
                        passes: 4,
                        toplevel: true
                    },
                    mangle: {
                        toplevel: true
                    },
                    output: {
                        beautify: false,
                        comments: false
                    }
                }
            }),
            new OptimizeCSSAssetsPlugin({
            })
        ] : [],
        //concatenateModules: false,
        moduleIds: "hashed",
        //runtimeChunk: "single",
        runtimeChunk: {
            name: "runtime"
        },
        sideEffects: true,
        usedExports: true,
        splitChunks: {
            cacheGroups: {
                shared: {
                    chunks: "all",
                    name: "shared",
                    test: /[\\/]src[\\/](clients|components[\\/]shared|constants|contexts|models|styles|services|utils)[\\/]/,
                    enforce: true
                },
                "styles.app": {
                    chunks: "all",
                    name: "styles.app",
                    test: /\.s?css$/,
                    enforce: true,
                    priority: 1
                },
                "styles.vendor": {
                    chunks: "all",
                    name: "styles.vendor",
                    test: path.resolve(sourcePath, "styles", "vendor.scss"),
                    enforce: true,
                    priority: 10
                },
                "vendor.default": {
                    chunks: "all",
                    name: (module, chunk, cacheGroupKey) => {
                        if (module.resource) {
                            if (module.resource.startsWith(modulePath)) {
                                const moduleFile = module.resource.substring(moduleLength);
                                const packageName = moduleFile.substring(0, moduleFile.indexOf(pathSep));
                                return "vendor." + packageName;
                            }
                        }

                        return cacheGroupKey;
                    },
                    test: (module, chunk) => {
                        return module.resource && module.resource.startsWith(modulePath);
                    },
                    enforce: true,
                    priority: -100
                }
            }
        }
    },

    //profile:true,

    resolve: {
        // Add ".ts" and ".tsx" as resolvable extensions.
        extensions: [".ts", ".tsx", ".js", ".jsx"],

        //alias: {
        //    "react": "preact",
        //    "react-dom": "preact",
        //}
    },

    plugins: [
        new webpack.EnvironmentPlugin({
            "NODE_ENV": process.env.NODE_ENV
        }),
        new webpack.DefinePlugin({
            "Constants": constants
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: isProd ? "[name].[contenthash].min.css" : "[name].bundle.min.css",
            chunkFilename: isProd ? "[name].[contenthash].min.css" : "[name].bundle.min.css",
        }),
        new PurgecssPlugin({
            paths: glob.sync("src/**/*", { nodir: true }),
            whitelistPatterns: [
                /close/,
                /modal/,
                /sr-only/
            ]
        }),
        chAnalyse ? new BundleAnalyzerPlugin({
            analyzerMode: "static",
            openAnalyzer: false,
            generateStatsFile: true,
            statsOptions: {
                assetsSort: "identifier",
                chunksSort: "identifier",
                modulesSort: "identifier",
                colors: true,
                depth: true,
                entrypoints: true,
                maxModules: 1024,
                usedExports: true,
                providedExports: true,
                builtAt: false,
                env: true,
                hash: false,
                version: false,
                reasons: false
            }
        }) : null
    ].filter(Boolean),

    module: {
        rules: [
            {
                test: /\.ts(x?)$/,
                include: sourcePath,
                exclude: modulePath,
                use: [
                    "cache-loader",
                    {
                        loader: "ts-loader",
                        //options: {
                        //    experimentalWatchApi: true
                        //}
                    },
                    {
                        loader: "eslint-loader",
                        options: {
                            cache: true,
                            emitError: true,
                            emitWarning: true,
                            failOnError: true,
                            failOnWarning: true,
                        }
                    }
                ]
            },
            // All output ".js" files will have any sourcemaps re-processed by "source-map-loader".
            {
                enforce: "pre",
                test: /\.js$/,
                include: sourcePath,
                exclude: modulePath,
                use: [
                    "cache-loader",
                    {
                        loader: "source-map-loader"
                    }
                ]
            },
            {
                test: /\.scss$/,
                include: sourcePath,
                exclude: modulePath,
                use: [
                    //"file-loader",
                    //"extract-loader",
                    //"style-loader",
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    {
                        loader: "css-loader"
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            sassOptions: {
                                outputStyle: "expanded"
                            }
                        }
                    }
                ]
            }
        ]
    },

    node: {
        Buffer: false,
        fs: "empty",
        process: false
    },

    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    externals: {
        //"react": "React",
        //"react-dom": "ReactDOM",
        //"react-router-dom": "ReactRouterDOM"
    }
};
