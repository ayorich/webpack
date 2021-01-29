const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin"); //use for cleaning previous built from the dist folder before new builds
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;

module.exports = {
  entry: "./src/kiwi.js",
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "./dist"),
    // publicPath: "dist/", //sets to auto from webpack 5
    publicPath: "",
  },
  mode: "development",
  devServer: {
    contentBase: path.resolve(__dirname, "./dist"),
    index: "kiwi.html",
    port: 9002,
    writeToDisk: true,
  },
  //loaders
  module: {
    rules: [
      {
        test: /\.(png|jpg)$/,
        use: ["file-loader"], //loads images
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"], // scss stylesheet loader
      },
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
        test: /\.hbs$/,
        use: ["handlebars-loader"],
      },
    ],
  },
  //plugins
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: "kiwi.html",
      title: "kiwi",
      template: "src/page-template.hbs",
      description: "kiwi",
    }),
    new ModuleFederationPlugin({
      name: "kiwiApp",
      remotes: {
        HelloWorldApp: "HelloWorldApp@http://localhost:9001/remoteEntry.js",
      },
    }),
  ],
};
