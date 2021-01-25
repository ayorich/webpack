const path = require("path");
const TerserPlugin = require("terser-webpack-plugin"); //use for minifying bundle size
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); //use for extracting css into a seperate bundle

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "./dist"),
    publicPath: "dist/", //sets to auto from webpack 5
  },
  mode: "none",
  //loaders
  module: {
    rules: [
      {
        test: /\.(png|jpg)$/,
        use: ["file-loader"], //loads images
      },
      // {
      //   test: /\.css$/,
      //   use: ["style-loader", "css-loader"], // css stylesheet loader
      // },
      // {
      //   test: /\.scss$/,
      //   use: ["style-loader", "css-loader", "sass-loader"], // scss stylesheet loader
      // },
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
    ],
  },
  //plugin
  plugins: [
    new TerserPlugin(),
    new MiniCssExtractPlugin({
      filename: "styles.css",
    }),
  ],
};
