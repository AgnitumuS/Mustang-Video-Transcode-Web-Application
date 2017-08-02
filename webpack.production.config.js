var webpack = require('webpack');
var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
var path = require('path');

module.exports = {
  context: path.join(__dirname, "src"),
  devtool: 'cheap-module-source-map',
  entry: "./js/client.js",
  module: {
    loaders: [
      {

          test: /\.jsx?$/,
          loader: 'babel-loader',
          exclude: /(node_modules|bower_components)/,
        query: {
          presets: ['react', 'es2015', 'stage-0'],
          plugins: ['react-html-attrs', 'transform-class-properties', 'transform-decorators-legacy'],
        }
      },
      {
        test: /\.css/,
        loaders: [
          'style-loader?sourceMap',
          'css-loader?modues&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]'
        ],
      },
      {
        test: /\.sass$/,
        loaders: [
          'style-loader',
          'css-loader?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]',
          'resolve-url',
          'sass'
        ]
      },
      {
          test: /\.html$/,
          loader: 'html-loader?attrs[]=video:src'
      },
      {
          test: /\.mp4$/,
          loader: 'url?limit=10000&mimetype=video/mp4'
      },
      {
          test: /\.png$/,
          loader: "url-loader",
          query: { mimetype: "image/png" }
      }
    ]
  },
  resolve: {
    alias: {
      webworkify$: 'webworkify-webpack',
      'videojs-contrib-hls': __dirname + '/node_modules/videojs-contrib-hls/dist/videojs-contrib-hls'
    }
  },
  output: {
      path: path.join(__dirname, "public"),
      filename: "dist/js/[name].js",
      libraryTarget: "umd",
      umdNamedDefine: true,
  },
  devServer:{
    host:'0.0.0.0',
    port:'8080',
    historyApiFallback: true,
    noInfo: false,
    stats: 'minimal',
    disableHostCheck:true,
    headers: {
      "Access-Control-Allow-Origin": "*"
    }
  },
  plugins: [
    new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
    }),
    new webpack.optimize.UglifyJsPlugin({
        minimize: true
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin()

  ]
};
/*
plugins: debug ? [] : [
  new webpack.optimize.DedupePlugin(),
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
],

webpack --profile --json > stats.json

Will generate a JSON file called stats.json. Go to http://webpack.github.io/analyse/ and upload the file,
and see all dependencies in a tree like structure
*/
