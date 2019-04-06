#!/usr/bin/env node

const program = require('commander');
const {version} = require('../package');
const figlet = require('figlet');
const chalk = require('chalk');

console.log(
    chalk.magentaBright(
        figlet.textSync('Doz cli')
    )
);

program
    .version(version)
    .command('component <name>', 'create component')
    .command('app <name>', 'create app')
    .command('electron <name>', 'create Electron app')
    .parse(process.argv)
;