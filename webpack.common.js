const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
    entry: {
        app: path.resolve(__dirname, "src", "index.js"),
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "TodoMVC: React",
            template: path.resolve(__dirname, "public", "index.html"),
        }),
    ],
    output: {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, "dist"),
        clean: true,
    },
    resolve: {
        extensions: [".js", ".jsx"],
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            ["@babel/preset-env", { targets: "defaults" }],
                            ["@babel/preset-react", { runtime: "automatic" }],
                        ],
                    },
                },
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                  loader: "webpack-plugin-istanbul/loader",
                  options: {
                    include: ["src/**/*.js", "src/**/*.jsx"],
                    exclude: ["src/**/*.spec.js"],
                    extension: [".js",".jsx"],
                    cwd: process.cwd(),
                  },
                },
                enforce: 'post',
              },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: "asset/resource",
            },
        ],
    },
};
