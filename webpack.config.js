const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const CopyPlugin = require("copy-webpack-plugin");
const path = require('path');

const PUBLIC_PATH = path.resolve(__dirname, 'dist')

const htmlWebpackPluginDefaults = {
  scriptLoading: 'blocking',
  inject: 'head'
}

const pages = ['404.html', 'admin.html', 'admin-auth.html', 'admin-contest.html', 'admin-empty.html', 'admin-match.html', 'admin-pleyof.html', 'admin-team.html', 'admin-team-detail.html', 'admin-tournir.html', 'aim.html', 'contact.html', 'contest.html', 'contest-detail.html', 'docs.html', 'dude-inner.html', 'index.html', 'lk.html', 'lk-games.html', 'magazin.html', 'new-part.html', 'news.html', 'news-inner.html', 'partners.html', 'photos.html', 'photos-inner.html', 'refereeing.html', 'smi.html', 'tipycal.html', 'ui.html', 'video.html', 'lk-games-empty.html'];
const dialogs = ['dialog-add--admin.html', 'dialog-add--admin1.html', 'dialog-contest.html', 'dialog-contest-empty.html', 'dialog-form.html', 'dialog-lk-add.html', 'dialog-lk-contest.html', 'dialog-lk-dude.html', 'dialog-lk-edit.html', 'dialog-lk-games.html', 'dialog-match.html', 'dialog-protocol.html', 'dialog-remove--admin.html', 'dialog-remove--lk.html', 'dialog-success.html', 'dialog-success--lk.html', 'dialog-team.html'];

module.exports = {
  entry: './src/index.js',
  resolve: {
    alias: {
      '@src': path.resolve(__dirname, 'src/')

    }
  },
  output: {
    path: PUBLIC_PATH,
    filename: 'index.js',
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
      }
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: "css/style.css", }),
    ...pages.map((name) => new HtmlWebpackPlugin({
      ...htmlWebpackPluginDefaults,
      template: `./src/${name}`,
      filename: name
    })),
    // new HtmlWebpackPlugin({
    //   ...htmlWebpackPluginDefaults,
    //   template: './src/index.html',
    //   filename: 'index.html'
    // }),
    // new HtmlWebpackPlugin({
    //   ...htmlWebpackPluginDefaults,
    //   template: './src/ui.html',
    //   filename: 'ui.html'
    // }),
    new CopyPlugin({
      patterns: [
        { from: "./src/img/", to: "./img/" },
        ...dialogs.map((name) => ({ from: `./src/${name}`, to: `./${name}` }))
        // { from: "./src/dialog-small.html", to: "./dialog-small.html" },
        // { from: "./src/dialog-middle.html", to: "./dialog-middle.html" },
        // { from: "./src/dialog-large.html", to: "./dialog-large.html" },
      ],
    }),
  ],
  devServer: {
    contentBase: PUBLIC_PATH,
    compress: false,
    port: 9000,
    historyApiFallback: true,

  },

};
