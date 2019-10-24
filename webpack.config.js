const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      }
    ]
  },
  performance: { hints: false },
  devServer: {
    stats: "minimal",
    open: true
  },
  entry: "./test/index.js",
  output: {
    filename: "index.js"
  },
  plugins: [
    new HtmlWebPackPlugin({
      title: "Earl",
      template: "./test/index.html",
      filename: "./index.html"
    })
  ]
};
