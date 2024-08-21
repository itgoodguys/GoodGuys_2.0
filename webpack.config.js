const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  mode: "production",
  entry: {
    index: { import: './src/js/index.js' },
    home: { import: './src/js/home.js' },
    aboutUs: { import: './src/js/aboutUs.js' },
    blogArchive: { import: './src/js/blogArchive.js' },
    blogSingle: { import: './src/js/blogSingle.js' },
    brandingDesign: { import: './src/js/brandingDesign.js' },
    calendarBooking: { import: './src/js/calendarBooking.js' },
    contactUs: { import: './src/js/contactUs.js' },
    cookiePolicy: { import: './src/js/cookiePolicy.js' },
    integrationsArchive: { import: './src/js/integrationsArchive.js' },
    integrationsSingle: { import: './src/js/integrationsSingle.js' },
    migrationsArchive: { import: './src/js/migrationsArchive.js' },
    migrationsSingle: { import: './src/js/migrationsSingle.js' },
    portfolioArchive: { import: './src/js/portfolioArchive.js' },
    portfolioSingle: { import: './src/js/portfolioSingle.js' },
    googleAds: { import: './src/js/googleAds.js' },
    webflowDevelopment: { import: './src/js/webflowDevelopment.js' },
    webflowSeo: { import: './src/js/webflowSeo.js' },
    author: { import: './src/js/author.js' },
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
      title: 'Production',
      minify: {
        collapseWhitespace: true, // Minifies HTML
        removeComments: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
      },
    }),
  ],

  optimization: {
    minimize: true, // Enable minification
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: false, // Removes console statements if true
          },
        },
      }),
      new CssMinimizerPlugin(),
    ],
  },

  devServer: {
    static: './',
  },

};