const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin"); //use for cleaning previous built from the dist folder before new builds
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;

module.exports = {
  entry: "./src/hello-world.js",
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "./dist"),
    // publicPath: "dist/", //sets to auto from webpack 5
    publicPath: "http://localhost:9001/",
  },
  mode: "development",
  devServer: {
    contentBase: path.resolve(__dirname, "./dist"),
    index: "hello-world.html",
    port: 9001,
    writeToDisk: true,
  },
  //loaders
  module: {
    rules: [
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
      {
        test: /\.(woff2|woff|ttf)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "fonts/",
            },
          },
        ],
      },
    ],
  },
  //plugins
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: "hello-world.html",
      title: "Hello world",
      template: "src/page-template.hbs",
      description: "hello world",
    }),
    new ModuleFederationPlugin({
      name: "HelloWorldApp",
      filename: "remoteEntry.js",
      exposes: {
        "./HelloWorldButton":
          "./src/components/hello-world-button/hello-world-button.js",
        "./HelloWorldPage": "./src/components/hello-world-page.js",
      },
    }),
  ],
};

// Assets modules can replaces
// raw-loader
// url-loader
// file-loader

// {
//   test: /\.(woff2|woff|ttf)$/,
//   use: [                               {
//     {
//       loader: "file-loader",   =====>  test:/\.tff$/,
//       options: {                       type:'asset/resource'
//         name: "[name].[ext]",
//         outputPath: "fonts/",          }
//       },
//     },
//   ],
// },

// {
//   test: /\.svg$/,
//   use: [                               {
//     {                                   test: /\.svg$/,
//       loader: "url-loader",   =====>
//                                        type:'asset/inline'
//     },                                 }
//   ],
// },

// {
//   test: /\.txt$/,
//   use: [                               {
//     {
//       loader: "raw-loader",   =====>   test:/\.txt$/,
//                                        type:'asset/source'
//     },                                 }
//   ],
// },
