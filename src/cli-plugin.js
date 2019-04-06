#!/usr/bin/env node

const program = require('commander');
const util = require('util');
const downloadRepo = util.promisify(require('download-git-repo'));
const {REPO, TESTING, REPLACE_FILES, TAG} = require('./constants');
const chalk = require('chalk');
const exec = util.promisify(require('child_process').exec);
const fs = require('fs-extra');
const replaceInFile = require('replace-in-file');
const {dashToCamelCase} = require('./helper');

(async function () {

    try {
        program
            .parse(process.argv)
        ;

        const isTesting = program.args.length && program.args[program.args.length - 1] === TESTING;

        if (isTesting) {
            process.chdir('test/cwd');
        }

        let componentName = program.args[0];
        const cwd = process.cwd();
        const projectPath = `${cwd}/${componentName}`;

        if (!componentName) {
            await Promise.reject(new Error('Project name is required'));
        }

        if (componentName.trim() === '') {
            await Promise.reject(new Error('Project name cannot be empty'));
        }

        componentName = componentName.toLowerCase();

        // ==== STEP 1 ====
        console.log('Downloading starter...');
        console.log(`Creating plugin...`);

        if (isTesting) {
            console.log('testing mode...');
            fs.copySync('../repo/plugin', projectPath);
            process.chdir(projectPath);
            console.log(`Installing dependencies...`);
        } else {
            // ==== STEP 2 ====
            await downloadRepo(REPO.PLUGIN, projectPath);

            // ==== STEP 3 ====
            // change directory to project
            process.chdir(projectPath);

            // ==== STEP 4 ====
            // install dependencies
            console.log(`Installing dependencies...`);
            await exec(`npm install`);
        }

        console.log(`Configuring...`);

        // ==== STEP 5 ====
        await replaceInFile({
            from: TAG.plugin,
            to: `"${componentName}"`,
            files: REPLACE_FILES.pluginTag
        });

        // ==== STEP 6 ====
        await replaceInFile({
            from: TAG.pluginCamel,
            to: dashToCamelCase(componentName),
            files: REPLACE_FILES.pluginCamelTag
        });

        // ==== STEP 7 ====
        fs.removeSync('README.md');
        fs.moveSync('README.md.sample', 'README.md');

        console.log(chalk.greenBright('Plugin created!'));
    } catch (e) {
        console.error(e.message);
    }

})();
