const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
//1º parte da config do ReactRefleshWebpackPlugin
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
//Definir um objeto do tipo isDevelopment e passar uma variavel de ambiente(NODE_ENV)
const isDevelopment = process.env.NODE_ENV !== 'production';

module.exports = {
    //Passar no mode e no devtoll a variavél criada acima
    mode: isDevelopment? 'development' : 'production',
    devtool: isDevelopment? 'eval-source-map' : 'source-map',
    entry: path.resolve(__dirname, 'src', 'index.tsx'),
       output: {
       path: path.resolve(__dirname, 'dist'),
       filename: 'bundle.js'
    },
    resolve:{
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'public'),
        //3º parte da configuração do ReactRefleshWebpackPlugin
        hot: true,
    },
    plugins: [
        // 2º parte Se eu estiver em desenvolvimento o puglin ReactRefleshWebpackPlugin vai funcionar
        //se não ele não é execultado,
        //No final do array vai ser ulizado um hack para filtrar tudo o que for False
       isDevelopment && new ReactRefreshWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'public', 'index.html'),
        })
    ].filter(Boolean),
    module: {
        rules:[
            {   
                test:/\.(j|t)sx$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        plugins:[
                        isDevelopment && require.resolve('react-refresh/babel')
                       ].filter(Boolean)
                    }

                    },
                },

            {   
                test:/\.scss$/,
                exclude: /node_modules/,
                use:[ 'style-loader', 'css-loader','sass-loader'],
            }
        ],
    }
};