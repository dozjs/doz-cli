#!/usr/bin/env node
const program = require('commander');
const util = require('util');
const downloadRepo = util.promisify(require('download-git-repo'));
const {REGEX, REPO, TESTING, REPLACE_FILES, TAG} = require('./constants');
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

        const componentName = program.args[0];
        const cwd = process.cwd();
        const projectPath = `${cwd}\\${componentName}`;

        if (!REGEX.IS_CUSTOM_TAG.test(componentName)) {
            await Promise.reject(new Error('Project name must contain a dash (-) like my-component'));
        }

        // ==== STEP 1 ====
        console.log('Downloading starter...');
        console.log(`Creating component...`);

        if (isTesting) {
            console.log('testing mode...');
            fs.copySync('../repo/component', projectPath);
            process.chdir(projectPath);
            console.log(`Installing dependencies...`);
        } else {
            // ==== STEP 2 ====
            await downloadRepo(REPO.COMPONENT, projectPath);

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
            from: TAG.component,
            to: componentName,
            files: REPLACE_FILES.componentTag
        });

        // ==== STEP 6 ====
        await replaceInFile({
            from: TAG.componentCamel,
            to: dashToCamelCase(componentName),
            files: REPLACE_FILES.componentCamelTag
        });

        // ==== STEP 7 ====
        fs.removeSync('README.md');
        fs.moveSync('README.md.sample', 'README.md');

        console.log(chalk.greenBright('Component created!'));
    } catch (e) {
        console.error(e.message);
    }

})();
