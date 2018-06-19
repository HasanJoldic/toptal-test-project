const path = require("path");
const makeWebpackConfig = require("./webpack.config.js");

module.exports = makeWebpackConfig({
  mainEntries: [
    "./src/app/index.tsx"
  ],
  targetPath: "../dist/app",
  publicPath: "/"
});