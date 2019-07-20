const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /\/node_modules\//,
        loader: "babel-loader",
        query: {
          presets: [
            "@babel/preset-env"
          ],
          plugins: [
            [
              "@babel/transform-react-jsx",
              {
                pragma: "m",
                pragmaFrag: "'['"
              }
            ]
          ]
        }
      },
      {
        test: /\.scss$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          { loader: "css-loader" },
          { loader: "sass-loader" }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html"
    }),
    new MiniCssExtractPlugin({
      filename: "bundle.css"
    }),
    new CopyPlugin([
      { from: "public" }
    ])
  ]
};
