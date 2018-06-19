const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");

module.exports = function(options) {
  return {
    context: path.resolve(__dirname, '..'),
    entry: [
      ...options.mainEntries
    ],
    devtool: "inline-source-map",
    module: {
      rules: [
        {
          test: /\.(j|t)s(x)?$/,
          exclude: /node_modules/,
          use: ["babel-loader", "ts-loader"]
        },
        {
          test: /\.ts(x)$/,
          enforce: "pre",
          loader: "tslint-loader",
        },
        { 
          test: /\.json$/, 
          loader: "json-loader" 
        },
        /*
        { 
          test: /\.(jpg|png|gif|ttf|eot|svg|woff2?)$/, 
          use: {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "assets"
            }
          }
        },
        */
        {
          test: /\.(jpg|png|gif|ttf|eot|svg|woff2?)$/,
          loader: "url-loader"
        },
        {
          test: /\.css$/,
          use: [{
            loader: "style-loader" // creates style nodes from JS strings
          }, {
            loader: "css-loader" // translates CSS into CommonJS
          }]
        },
        {
          test: /\.scss$/,
          use: [{
            loader: "style-loader" // creates style nodes from JS strings
          }, {
            loader: "css-loader" // translates CSS into CommonJS
          }, {
            loader: "sass-loader" // compiles Sass to CSS
          }]
        }
      ]
    },
    resolve: {
      extensions: ["*", ".js", ".jsx", ".ts", ".tsx"]
    },
    output: {
      filename: "[name].[hash].js",
      path: path.resolve(__dirname, options.targetPath),
      publicPath: options.publicPath
    },
    devServer: {
      historyApiFallback: true,
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./index.html",
        inject: true
      }),
      new CleanWebpackPlugin([path.resolve(__dirname, options.targetPath)], {
        root: path.resolve(__dirname, "..")
      })
    ],
    optimization: {
      splitChunks: {
        chunks: "all"
      }
    }
  };
}