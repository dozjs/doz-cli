#!/usr/bin/env node
const program = require('commander');
const lib = require('./lib');
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
    //.command('app <name>', 'create app')
    .parse(process.argv)
;

//lib(program).then((f) => console.log('processed:', f)).catch(err => console.err(err));