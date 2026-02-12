import path from 'node:path';

import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config = (_env, argv) => {
  const isProduction = argv.mode === 'production';

  return {
    mode: isProduction ? 'production' : 'development',
    // Точка входа
    entry: './src/index.tsx',
    // Позволяет импортировать файлы, без указания формата
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
    },
    // Лоадеры
    module: {
      rules: [
        { test: /\.svg$/, use: 'svg-inline-loader' },
        { test: /\.css$/, use: ['style-loader', 'css-loader'] },
        // { test: /\.(js)$/, use: 'babel-loader' },
        {
          test: /\.(ts|tsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env',
                ['@babel/preset-react', { runtime: 'automatic' }],
                '@babel/preset-typescript',
              ],
            },
          },
        },
      ],
    },
    // Плагины для обработки CSS и генерации HTML
    plugins: [],
    // Файл- результат сборки
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'main.js',
    },
  };
};

export default config;

// const path = require('path');
// module.exports = {
//   mode: 'production'; // 'development',
//   entry: './src/index.js',
//   module: {
//     rules: [
//       { test: /\.svg$/, use: 'svg-inline-loader' },
//       { test: /\.css$/, use: ['style-loader', 'css-loader'] },
//       { test: /\.(js|ts|tsx)$/, use: 'babel-loader' },
//     ],
//   },
//   output: {
//     path: path.resolve(__dirname, 'dist'),
//     filename: 'main.js',
//   },
// };
