const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: "production",
  entry: {
    index: { import: './src/js/index.js' },
    home: { import: './src/js/home.js' },
  }, 
  output: {
    clean: true,
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    static: './'
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.css$/i, // Rule for .css files
        use: [
          'style-loader', // Injects styles into the DOM
          'css-loader'    // Interprets @import and url() like import/require() and will resolve them
        ],
      },
      {
        test: /\.scss$/i, // Rule for .scss files
        use: [
          "style-loader", // Injects styles into the DOM
          "css-loader",   // Interprets @import and url() like import/require() and will resolve them
          'postcss-loader',
          "sass-loader"   // Loads and compiles a SASS/SCSS file
        ],
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Development'
    }),
  ],
};