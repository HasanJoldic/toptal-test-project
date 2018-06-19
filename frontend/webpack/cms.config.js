const path = require("path");
const makeWebpackConfig = require("./webpack.config.js");

module.exports = makeWebpackConfig({
  mainEntries: [
    "./src/cms/index.tsx"
  ],
  targetPath: "../dist/cms",
  publicPath: "/cms"
});