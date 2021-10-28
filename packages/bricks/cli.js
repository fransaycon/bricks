#!/usr/bin/env node

const yargs = require('yargs');
const liveServer = require('live-server');
const { createBuild, readConfiguration, BUILD_SRC } = require('./dist/cjs');
const path = require('path');
const fs = require('fs-extra');
const chokidar = require('chokidar');

const { argv } = yargs
  .scriptName('bricks')
  .usage('Usage: $0 <command> [options]')
  .command('build', 'Build the project directory.')
  .command('start', 'Start development server')
  .demandCommand(1)
  .help();

const processImages = async (config) => {
  const imagemin = await import('imagemin');
  const imageminPngQuant = await import('imagemin-pngquant');

  const buildDir = config.buildPath;

  const buildAssets = fs.readdirSync(path.join(buildDir, BUILD_SRC));
  const imagePaths = buildAssets
    .filter((ba) => path.extname(ba) === '.png')
    .map((img) => path.join(buildDir, BUILD_SRC, img));

  imagemin(imagePaths, {
    destination: path.join(buildDir, BUILD_SRC),
    plugins: [
      imageminPngQuant({
        quality: [0.5, 0.6],
      }),
    ],
  });
};

const buildBricks = async () => {
  const config = await readConfiguration();
  await createBuild(config);

  if (process.env.NODE_ENV === 'production') {
    processImages(config);
  }
};

switch (argv._[0]) {
  case 'build': {
    buildBricks();
    break;
  }
  case 'watch-pages': {
    chokidar
      .watch(path.join(process.cwd(), 'pages'))
      .on('change', (event, path) => {
        buildBricks();
      });
    break;
  }
  case 'watch-bricks': {
    chokidar
      .watch(path.join(process.cwd(), 'bricks'))
      .on('change', (event, path) => {
        buildBricks();
      });
    break;
  }
  case 'server': {
    liveServer.start({
      host: '0.0.0.0',
      root: path.join(process.cwd(), 'dist'),
      open: false,
      wait: 1000,
      logLevel: 2,
    });
  }
  case 'start': {
    chokidar
      .watch(path.join(process.cwd(), 'pages'))
      .on('change', (event, path) => {
        buildBricks();
      });
    chokidar
      .watch(path.join(process.cwd(), 'bricks'))
      .on('change', (event, path) => {
        buildBricks();
      });
    liveServer.start({
      host: '0.0.0.0',
      root: path.join(process.cwd(), 'dist'),
      open: false,
      wait: 1000,
      logLevel: 2,
    });
    break;
  }
  default:
    console.log('Invalid command.');
}
