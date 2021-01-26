const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin"); //use for cleaning previous built from the dist folder before new builds
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
  entry: {
    kiwi: "./src/kiwi.js",
    "hello-world": "./src/hello-world.js",
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "./dist"),
    // publicPath: "dist/", //sets to auto from webpack 5
    publicPath: "",
  },
  mode: "development",
  devServer: {
    contentBase: path.resolve(__dirname, "./dist"),
    index: "index.html",
    port: 9000,
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
        test: /\.css$/,
        use: ["style-loader", "css-loader"], // css stylesheet loader
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
            plugins: ["@babel/plugin-proposal-class-properties"],
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
      filename: "hello-world.html",
      chunks: ["hello-world"],
      title: "Hello world",
      template: "src/page-template.hbs",
      description: "hello world",
    }),
    new HtmlWebpackPlugin({
      filename: "kiwi.html",
      chunks: ["kiwi"],
      title: "kiwi",
      template: "src/page-template.hbs",
      description: "kiwi",
    }),
  ],
};
