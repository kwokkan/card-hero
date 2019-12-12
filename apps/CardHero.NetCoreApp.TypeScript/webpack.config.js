const glob = require("glob");
const path = require("path");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const PrettierPlugin = require("prettier-webpack-plugin");
const PurgecssPlugin = require("purgecss-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const webpack = require("webpack");
const WebpackDeepScopeAnalysisPlugin = require("webpack-deep-scope-plugin").default;

const isProd = process.env.NODE_ENV == "production";
const chAnalyse = !!process.env.CH_ANALYSE;

const constants = require("./ClientApp/constants/constants.ts");

module.exports = {
    mode: isProd ? "production" : "development",

    // Enable sourcemaps for debugging webpack's output.
    devtool: isProd ? false : "hidden-source-map",

    entry: {
        "app.main": [
            "./ClientApp/globals.ts",
            "./ClientApp/app/index.tsx"
        ],
        "styles.shared": [
            //"./ClientApp/styles/index.tsx",
            "./ClientApp/styles/vendor.scss",
            "./ClientApp/styles/index.scss"
        ]
    },

    output: {
        filename: isProd ? "[name].[contenthash].min.js" : "[name].bundle.min.js",
        path: path.resolve(__dirname, "wwwroot/dist"),
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

    recordsPath: path.resolve(__dirname, "records.json"),

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
            })
        ] : [],
        //concatenateModules: false,
        moduleIds: "hashed",
        //runtimeChunk: "single",
        runtimeChunk: {
            name: "runtime"
        },
        sideEffects: false,
        usedExports: true,
        splitChunks: {
            cacheGroups: {
                shared: {
                    chunks: "all",
                    name: "shared",
                    test: /[\\/]ClientApp[\\/](clients|components[\\/]shared|constants|contexts|models|styles|services|utils)[\\/]/,
                    enforce: true
                },
                styles: {
                    chunks: "all",
                    name: "styles",
                    test: /\.s?css$/,
                    enforce: true,
                    priority: 1
                },
                "styles.vendor": {
                    chunks: "all",
                    name: "styles.vendor",
                    test: /[\\/]ClientApp[\\/]styles[\\/]vendor\.s?css$/,
                    enforce: true,
                    priority: 10
                },
                "vendor.default": {
                    chunks: "all",
                    name: "vendor.default",
                    test: /node_modules/,
                    enforce: true,
                    priority: -100
                },
                "vendor.fortawesome": {
                    chunks: "all",
                    name: "vendor.fortawesome",
                    test: /node_modules[\\/]@fortawesome[\\/]/,
                    enforce: true,
                    priority: -10
                },
                "vendor.global": {
                    chunks: "all",
                    name: "vendor.global",
                    test: /node_modules[\\/](bootstrap|jquery)[\\/]/,
                    enforce: true,
                    priority: -10
                },
                "vendor.react": {
                    chunks: "all",
                    name: "vendor.react",
                    test: /node_modules[\\/](react|react-.+)[\\/]/,
                    enforce: true,
                    priority: -10
                },
                "vendor.unused": {
                    chunks: "all",
                    name: "vendor.unused",
                    test: /node_modules[\\/](moment|popper\.js)[\\/]/,
                    enforce: true,
                    priority: -10
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
            "NODE_ENV": "production"
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
            paths: glob.sync("ClientApp/**/*", { nodir: true })
        }),
        //new PrettierPlugin({
        //    jsxSingleQuote: true
        //}),
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
        }) : null,
        isProd ? new WebpackDeepScopeAnalysisPlugin() : null
    ].filter(Boolean),

    module: {
        rules: [
            {
                test: /\.ts(x?)$/,
                include: /ClientApp/,
                exclude: /node_modules/,
                use: [
                    "cache-loader",
                    {
                        loader: "ts-loader",
                        //options: {
                        //    experimentalWatchApi: true
                        //}
                    }
                ]
            },
            // All output ".js" files will have any sourcemaps re-processed by "source-map-loader".
            {
                enforce: "pre",
                test: /\.js$/,
                include: /ClientApp/,
                loader: [
                    "cache-loader",
                    "source-map-loader"
                ]
            },
            {
                test: /\.s?css$/,
                include: /ClientApp/,
                exclude: /node_modules/,
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
                                outputStyle: isProd ? "compressed" : "expanded"
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