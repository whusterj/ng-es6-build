const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = [
  {
    entry: [
      path.resolve(__dirname, 'client/src/app/app.js'),
    ],
    output: {
      filename: 'app.[hash].js',
      path: path.resolve(__dirname, 'client/dist/static'),
    },
    resolve: {
      extensions: ['.js', '.less', '.html'],
    },
    module: {
      loaders: [
        {
          test: /\.html$/,
          exclude: '/node_modules',
          use: {
            loader: 'raw-loader',
          },
        },
        {
          test: /\.js$/,
          exclude: '/node_modules',
          use: {
            loader: 'babel-loader',
            query: {
              presets: ['es2015'],
            }
          }
        },
        {
          test: /\.less$/,
          exclude: '/node_modules/',
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              {loader: 'css-loader'},
              {
                loader: 'postcss-loader',
                options: {
                  plugins: function () {
                    return [
                      require('autoprefixer')
                    ];
                  }
                }
              },
            ]
          })
        }
      ],
    },
    plugins: [
      new CleanWebpackPlugin(['client/dist']),
      new ExtractTextPlugin('[name].[hash].css'),
      new HtmlWebpackPlugin({
        template: '!!ejs-loader!' + path.resolve(__dirname, 'client/src/base.html'),
        filename: path.resolve(__dirname, 'client/dist/templates/base.html'),
        // Set 'inject' to 'false', since our template will include
        // templating for where to insert CSS and JS.
        inject: false
      }),
      new CopyWebpackPlugin([
        {from: path.resolve(__dirname, 'client/src/templates'),
         to: path.resolve(__dirname, 'client/dist/templates')}
      ])
    ],
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    },
  }
];
