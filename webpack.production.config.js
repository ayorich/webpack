const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); //use for extracting css into a seperate bundle
const { CleanWebpackPlugin } = require("clean-webpack-plugin"); //use for cleaning previous built from the dist folder before new builds
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
  entry: {
    kiwi: "./src/kiwi.js",
    "hello-world": "./src/hello-world.js",
  },
  output: {
    filename: "[name].[contenthash].js",
    path: path.resolve(__dirname, "./dist"),
    // publicPath: "dist/", //sets to auto from webpack 5
    publicPath: "/static/",
  },
  mode: "production",
  optimization: {
    splitChunks: {
      chunks: "all",
      minSize: 3000, //set minimum size to activate code split overiding default
    },
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
        use: [MiniCssExtractPlugin.loader, "css-loader"], // seperating css stylesheet from the js bundle
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"], // seperating scss stylesheet from the js bundle
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
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
    }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: "hello-world.html",
      chunks: ["hello-world"],

      title: "Hello world",
      template: "src/page-template.hbs",
      description: "hello world",
      minify: false,
    }),
    new HtmlWebpackPlugin({
      filename: "kiwi.html",
      chunks: ["kiwi"],
      title: "kiwi",
      template: "src/page-template.hbs",
      description: "kiwi",
      minify: false,
    }),
  ],
};
