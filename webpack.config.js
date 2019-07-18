var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        'bundle.js'     : './src/main.js',
        'main.css'      : './src/styles/styles.less'
    },
    output: {
        path: __dirname + '/public/dist/',
        publicPath: "dist/",
        filename: "[name]"
    },   
     plugins: [
      new CopyWebpackPlugin([
          { from:'src/img',to:'img'},
          { from: 'src/includes', to: 'includes' }
      ])
    ],
    performance: {
        hints: false
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                  loader: "babel-loader"
                }
            },
            {
                test: /\.css$/,
                exclude: [/node_modules/, /public/],
                use: {
                    loader: "style-loader!css-loader!autoprefixer-loader"
                }
            },
            {
                test: /\.less$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'style-loader', // creates style nodes from JS strings
                      },
                      {
                        loader: 'css-loader', // translates CSS into CommonJS
                      },
                      {
                        loader: 'less-loader', // compiles Less to CSS
                      },
                ]
            },
            {
                test: /\.jsx$/,
                exclude: [/node_modules/, /public/],
                use: {
                    loader: "react-hot!babel-loader"
                }
            },
            {
                test: /\.json$/,
                use: {
                    loader: "json-loader"
                }
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                  {
                    loader: 'file-loader',
                    options: {
                      name: '[name].[ext]',
                      outputPath: 'fonts/'
                    }
                  }
                ]
            }
        ]
    }
}