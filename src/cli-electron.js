#!/usr/bin/env node

const program = require('commander');
const util = require('util');
const downloadRepo = util.promisify(require('download-git-repo'));
const {REPO, TESTING} = require('./constants');
const chalk = require('chalk');
const exec = util.promisify(require('child_process').exec);
const fs = require('fs-extra');

(async function () {

    try {
        program
            .parse(process.argv)
        ;

        const isTesting = program.args.length && program.args[program.args.length - 1] === TESTING;

        if (isTesting) {
            process.chdir('test/cwd');
        }

        const componentName = program.args[0];
        const cwd = process.cwd();
        const projectPath = `${cwd}/${componentName}`;

        if (!componentName) {
            await Promise.reject(new Error('Project name is required'));
        }

        if (componentName.trim() === '') {
            await Promise.reject(new Error('Project name cannot be empty'));
        }

        // ==== STEP 1 ====
        console.log('Downloading starter...');
        console.log(`Creating Electron app...`);

        if (isTesting) {
            console.log('testing mode...');
            fs.copySync('../repo/electron-app', projectPath);
            process.chdir(projectPath);
            console.log(`Installing dependencies...`);
        } else {
            // ==== STEP 2 ====
            await downloadRepo(REPO.ELECTRON, projectPath);

            // ==== STEP 3 ====
            // change directory to project
            process.chdir(projectPath);

            // ==== STEP 3 ====
            // install dependencies
            console.log(`Installing dependencies...`);
            await exec(`npm install`);
        }

        console.log(chalk.greenBright('Electron app created!'));
    } catch (e) {
        console.error(e.message);
    }

})();
