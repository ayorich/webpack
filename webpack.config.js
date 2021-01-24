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
    ],
  },
};
