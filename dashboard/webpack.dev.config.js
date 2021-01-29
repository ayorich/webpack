const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin"); //use for cleaning previous built from the dist folder before new builds
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;

module.exports = {
  entry: "./src/dashboard.js",
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "./dist"),
    // publicPath: "dist/", //sets to auto from webpack 5
    publicPath: "http://localhost:9002/",
  },
  mode: "development",
  devServer: {
    contentBase: path.resolve(__dirname, "./dist"),
    index: "dashboard.html",
    port: 9000,
    historyApiFallback: {
      index: "dashboard.html",
    },
  },
  //loaders
  module: {
    rules: [
      {
        test: /\.js$/, //code transpiller from es6 es7 syntax to old syntax for older browser
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/env"],
          },
        },
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
  //plugins
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: "dashboard.html",
      title: "Dashboard",
    }),
    new ModuleFederationPlugin({
      name: "App",
      remotes: {
        HelloWorldApp: "HelloWorldApp@http://localhost:9001/remoteEntry.js",
        KiwiApp: "KiwiApp@http://localhost:9002/remoteEntry.js",
      },
    }),
  ],
};
