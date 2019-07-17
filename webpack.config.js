var webpack = require('webpack');

module.exports = {
    entry: {
        'bundle.js': './src/main.js',
        'main.css': './src/styles/styles.less'
    },
    output: {
        path: __dirname + '/public/build/',
        publicPath: "build/",
        filename: "[name]"
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
                test: /\.(scss)$/,
                use: [{
                  loader: 'style-loader', // inject CSS to page
                }, {
                  loader: 'css-loader', // translates CSS into CommonJS modules
                }, {
                  loader: 'postcss-loader', // Run post css actions
                  options: {
                    plugins: function () { // post css plugins, can be exported to postcss.config.js
                      return [
                        require('precss'),
                        require('autoprefixer')
                      ];
                    }
                  }
                }, {
                  loader: 'sass-loader' // compiles Sass to CSS
                }]
            },
            {
                test: /\.gif$/,
                use: {
                    loader: "url-loader?limit=10000&mimetype=image/gif"
                }
            },
            {
                test: /\.jpg$/,
                use: {
                    loader: "url-loader?limit=10000&mimetype=image/jpg"
                }
            },
            {
                test: /\.png$/,
                use: {
                    loader: "url-loader?limit=10000&mimetype=image/png"
                }
            },
            {
                test: /\.svg/,
                use:{
                    loader: "url-loader?limit=26000&mimetype=image/svg+xml"
                }
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