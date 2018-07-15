#!/usr/bin/env node
const program = require('commander');

program
    .parse(process.argv)
;

console.log('Downloading starter...');
console.log(program.args[0]);