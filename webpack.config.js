const currentTask = process.env.npm_lifecycle_event
const path = require('path')
const {CleanWebpackPlugin} = require ('clean-webpack-plugin')
const miniCssExtractPlugin = require('mini-css-extract-plugin')
const htmlWebpackPlugin = require('html-webpack-plugin')
const fse = require('fs-extra')
const postCSSplugins = [
    require('postcss-import'),
    require('postcss-mixins'),
    require('postcss-simple-vars'),
    require('postcss-nested'),
    require('postcss-hexrgba'),
    require('autoprefixer')
]

class runAfterCompile {

    apply(compiler){

        compiler.hooks.done.tap('copy images', function(){
            fse.copySync('./app/assets/images', './dist/assets/images')
        })
    }
}

let cssConfig =  {
    test:/\.CSS$/i,
    use:['css-loader?url=false', {loader:'postcss-loader', options:{plugins: postCSSplugins}}]
}

let config = {
    entry: './app/assets/scripts/App.js',
    plugins:[new htmlWebpackPlugin({filename:'index.html', template:'./app/index.html'})],
    module:{
        rules:[
           
            cssConfig
        ]
    }

}

if (currentTask=='dev'){
    cssConfig.use.unshift('style-loader')
    config.output = {
        filename: 'bundled.js',
        path: path.resolve(__dirname, 'app')
    }

    config.devServer = {
        before: function(app, server){

            server._watch('./app/**/*.html')

        },
        contentBase:path.join(__dirname, 'app'),
        hot: true,
        port:3000,
        host:'0.0.0.0'
    }

    config.mode = 'development'
}

if (currentTask=='build'){
    config.module.rules.push({
        test:/\.js$/,
        exclude:/(node_modules)/,
        use: {

            loader: 'babel-loader',
            options: {
                presets: ['@babel/preset-env']  
            }
        }
    })
    cssConfig.use.unshift(miniCssExtractPlugin.loader)
    postCSSplugins.push(require('cssnano'))
    config.output = {
        filename: '[name].[chunkhash].js',
        chunkFilename: '[name].[chunkhash].js',
        path: path.resolve(__dirname, 'dist')
    }

    config.mode = 'production'
    config.optimization = {
        splitChunks: { chunks:'all'}
    }

    config.plugins.push(
        new CleanWebpackPlugin(), 
        new miniCssExtractPlugin({filename:'styles.[chunkhash].css'}),
        new runAfterCompile()
        )
    
}


module.exports = config