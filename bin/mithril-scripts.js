#!/usr/bin/env node

const path = require("path");
const webpack = require("webpack");
const WebpackDevServer = require("webpack-dev-server");
const rimraf = require("rimraf");
const Spinner = require("cli-spinner").Spinner;
const config = require("../configs/webpack.config");

let arg = process.argv[2];
let spinner = new Spinner('%s building...');
let context = process.cwd();

config.mode = arg == "build" ? "production" : "development";

let compiler = webpack(config);

if (arg == "build") {
  spinner.setSpinnerString('|/-\\');
  spinner.start();

  rimraf.sync(path.resolve(context, "dist"));

  compiler.context = context;

  compiler.run((err, stats) => {
    spinner.stop();
    console.log("\n");

    if (err) {
      console.error(err);
      return;
    }
  
    console.log(stats.toString({
      all: false,
      colors: true,
      assets: true,
      assetsSort: "field",
      cached: true,
      cachedAssets: true,
      children: true,
      chunks: true,
      chunksSort: "field",
      modules: true,
      maxModules: 0,
      errors: true,
      warnings: true,
      moduleTrace: true,
      errorDetails: true
    }));
  });
} else if (arg == "serve") {
  let server = new WebpackDevServer(compiler, {
    filename: config.output.filename,
    publicPath: config.output.publicPath,
    open: true,
    stats: {
      context: context,
      all: false,
      colors: true,
      assets: true,
      assetsSort: "field",
      cached: true,
      cachedAssets: true,
      children: true,
      chunks: true,
      chunksSort: "field",
      modules: true,
      maxModules: 0,
      errors: true,
      warnings: true,
      moduleTrace: true,
      errorDetails: true
    }
  });

  server.listen(8888, "localhost");
} else {
  console.error("command not found");
}