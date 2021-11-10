const path = require("path");
const { ModuleFilenameHelpers } = require("webpack");

// para conseguir utilizar esse arquivo, eu preciso exportar ele:
//tudo o que tiver no objeto, será exportado
module.exports = {
  mode: "development", //modo no qual eu estou trabalhando
  entry: "./frontend/main.js", //declarando o arquivo de entrada
  output: {
    path: path.resolve(__dirname, "public", "assets", "js"),
    filename: "bundle.js", //esse arquivo vai conter todos os arquivos da aplicação
  },
  /* o resolve()
   vai escolher como ele quer que as barras sejam postas para definir o caminho
   para a saida */

  module: {
    rules: [
      {
        exclude: /node_modules/, //não quero que o webpack analise esta pg pois senao o nav fica lento
        test: /\.js$/, //esse arquivo termina com a expressão .js
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/env"],
          },
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  devtool: "source-map", //para mapear erro no arquivo que ocorreu o erro
};
