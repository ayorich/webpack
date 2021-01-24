const path = require("path");

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
    ],
  },
};
