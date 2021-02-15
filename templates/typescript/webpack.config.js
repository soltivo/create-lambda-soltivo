const path = require('path');
const fs = require('fs');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const handlersFolder = './src/handlers'
const filesObject = {}
module.exports = {
    target: 'node',
    mode: 'development',

    // Lambdas already contains the aws-sdk we don't need to include it
    externals: [
        // We excludes imports like
        // aws-sdk
        // aws-sdk/clients/...
        /^aws-sdk(\/clients\/.*)?$/i,
    ],

    // All the entry point (Could be a function that return all the folder if your folder have an index 😉)
    entry: ()=> {
        // Read all the files in the ./src/handlers in a synchronous way so that
        //  it will stop any further execution of the code until the read process ends
        fs.readdirSync(handlersFolder).forEach(file => {
            // I need only the name of that file without the .ts
            fileName = file.split('.')[0]
            // I create an object with { [fileName]: pathOrTheFile/[fileName].ts }
            filesObject[fileName] = path.resolve(handlersFolder, file);
        });
        // return the object for webpack to use the files
        return filesObject;
    },
    // Where to ouput the handlers, they will be output seperatly and keep their name
    output: {
        libraryTarget: 'commonjs2',
        // ./handlers/{fileName}.js
        path: path.resolve(__dirname, 'handlers'),
        filename: '[name].js',
        sourceMapFilename: '[file].map',
    },
    optimization: {
        // Put it to false if you wanna debug the compile code
        minimize: true,
    },

    // Plugin to delete the old file before each compilation
    plugins: [new CleanWebpackPlugin()],

    module: {
        rules: [
            {
                // File which ends with .ts
                test: /\.ts$/,
                exclude: [
                    // Exclude the tests directory
                    path.resolve(__dirname, 'src', 'tests'),

                    // we shouldn't need processing `node_modules`
                    /node_modules/,
                ],
                use: [
                    {
                        // Special loader that will convert TypeScript into JS
                        loader: 'ts-loader',
                    },
                ],
            },
            {
                // If your lambda use any media we'll use the link
                test: /\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$/,
                use: 'url-loader',
            },
        ],
    },
    // Webpack will only check the typescript & js files
    resolve: {
        extensions: ['.ts', '.js'],
    },
};
