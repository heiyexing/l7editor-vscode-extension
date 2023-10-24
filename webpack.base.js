const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: path.join(__dirname, './src/view/index.tsx'), // 入口文件
  output: {
    filename: 'static/js/[name].js',
    path: path.join(__dirname, './dist'),
    clean: true,
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|tsx)$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react', '@babel/preset-typescript'],
          },
        },
      },
      {
        test: /.css$/,
        //注意webpack的使用的顺序是按照从右像左的所以先使用css去识别css文件，然后在把css提取出来放到，头部的style里面
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /.less$/,
        use: ['style-loader', 'css-loader', 'less-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.tsx', '.ts'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/view/index.html'),
      inject: true, // 自动注入静态资源
    }),
  ],
};
