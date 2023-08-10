const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const CopyPlugin = require("copy-webpack-plugin");
const path = require('path');
const { VueLoaderPlugin } = require('vue-loader')
const fs = require('fs');
const webpack = require('webpack')

const PUBLIC_PATH = path.resolve(__dirname, 'dist')

const htmlWebpackPluginDefaults = {
  scriptLoading: 'blocking',
  inject: 'head'
}


function generateHtmlPlugins(templateDir) {
  const templateFiles = fs.readdirSync(path.resolve(__dirname, templateDir));
  return templateFiles.map(item => {
 
    const parts = item.split('.');
    const name = parts[0];
    const extension = parts[1];
    if (extension !== 'html') return null;
    if (name.includes('dialog')) return null;

    return new HtmlWebpackPlugin({
      ...htmlWebpackPluginDefaults,
      filename: `${name}.html`,
      template: path.resolve(__dirname, `${templateDir}/${name}.${extension}`),

    })
  }).filter((item) => item !== null)
}

function generateCopyDialogsPlugins(templateDir) {
  const templateFiles = fs.readdirSync(path.resolve(__dirname, templateDir));
  return templateFiles.map(item => {
    const parts = item.split('.');
    const name = parts[0];
    const extension = parts[1];
    if (extension !== 'html') return null;
    if (!name.includes('dialog')) return null;

    return { from: `${templateDir}/${name}.${extension}`, to: `./${name}.${extension}` }
  }).filter((item) => item !== null)
}

module.exports = {
  entry: {
    index: './src/js/index.js',
    ['conference-map']: './src/js/conference-map/index.js'
  },
  resolve: {
    alias: {
      '@src': path.resolve(__dirname, 'src/')

    }
  },
  output: {
    path: PUBLIC_PATH,
    filename: 'js/[name].js',
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'img/[name][ext]'
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name][ext]'
        }
      },
      { test: /\.css$/, use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'] },
      { test: /\.s[ac]ss$/, use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'] },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.html$/,
        include: path.resolve(__dirname, 'src/includes'),
        use: ['raw-loader']
      },
    ],
  },
  plugins: [
    ...generateHtmlPlugins('./src'),
    ...generateHtmlPlugins('./src/html'),
    ...generateHtmlPlugins('./src/html/site'),
    ...generateHtmlPlugins('./src/html/store'),
    new MiniCssExtractPlugin({ filename: "css/style.css", }),
    new CopyPlugin({
      patterns: [
        { from: "./src/img/", to: "./img/" },
        ...generateCopyDialogsPlugins('./src'),
        ...generateCopyDialogsPlugins('./src/html'),
        ...generateCopyDialogsPlugins('./src/html/site'),
        ...generateCopyDialogsPlugins('./src/html/store'),
      ],
    }),
    new VueLoaderPlugin(),
    new webpack.DefinePlugin({
      __VUE_OPTIONS_API__: true,
      __VUE_PROD_DEVTOOLS__: false
    })

  ],
  devServer: {
    compress: false,
    port: 9000,
    historyApiFallback: true,

  },

};
