#!/usr/bin/env node
const program = require('commander');
const util = require('util');
const downloadRepo = util.promisify(require('download-git-repo'));
const {REGEX, REPO} = require('./constants');
const chalk = require('chalk');
const exec = util.promisify(require('child_process').exec);

(async function () {
    program
        .parse(process.argv)
    ;

    const projectName = program.args[0];

    if (!REGEX.IS_CUSTOM_TAG.test(projectName)) {
        throw new TypeError('Project name must contain a dash (-) like my-component');
    }

    console.log('Downloading starter...');
    console.log(`Creating ${projectName}...`);
    const projectPath = `${process.cwd()}/${projectName}`;

    await downloadRepo(REPO.COMPONENT, projectPath);

    // change directory
    process.chdir(projectPath);
    // install dependencies
    console.log(`Installing dependencies...`);
    await exec(`npm install`);
    //await exec(`npm init`);

    console.log(chalk.greenBright('Component created!'));
})();

