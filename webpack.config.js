const path = require("path");
const fs = require("fs");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const appDirectory = fs.realpathSync(process.cwd());

module.exports = {
  entry: path.resolve(appDirectory, "src/app.ts"),
  output: {
    path: path.resolve(appDirectory, "dist"),
    //name for the js file that is created/compiled in memory
    filename: "js/hanabiBundle.js",
  },
  resolve: {
    // extensions: [".ts"]
    extensions: [".tsx", ".ts", ".js"],
  },
  devServer: {
    host: "0.0.0.0",
    port: 8080,
    static: path.resolve(appDirectory, "public"), //tells webpack to serve from the public folder
    // publicPath: '/',
    hot: true,
  },
  module: {
    rules: [
      // {test: /\.tsx?$/,
      // loader: "ts-loader"}
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: "public",
          globOptions: {
            dot: true,
            gitignore: true,
            ignore: ["**/index.html"],
          },
        },
      ],
    }),
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve(appDirectory, "public/index.html"),
    }),
    new CleanWebpackPlugin(),
  ],
  mode: "development",

  devServer: {
    port: 9000,
  }
};
