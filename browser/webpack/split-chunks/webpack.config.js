const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;


/**
 * @type {import("webpack/types").Configuration}
 */
const config = {
  mode: 'production',
  entry: {
    main: './src',
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    clean: true,
  },
  optimization: {
    // Instruct webpack not to obfuscate the resulting code
    minimize: false,
    // splitChunks: false,
    splitChunks: {
        chunks: 'all',
        minSize: 0,
    },
  },
  context: __dirname,
  plugins: [
    new BundleAnalyzerPlugin()
  ]
};

module.exports = config;
