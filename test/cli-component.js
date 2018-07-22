const {spawn} = require('child_process');
const {TESTING} = require('../src/constants');
const fs = require('fs-extra');

describe('doz cli-component', function () {

    this.timeout(5000);

    beforeEach(function () {
        fs.removeSync('test/cwd/my-component');
    });

    describe('component', function () {

        it('create', function (done) {
            const cli = spawn('node', [
                'src/cli-component.js',
                'my-component',
                TESTING
            ]);

            cli.stdout.on('data', data => {
                console.log(`${data}`);
            });

            cli.stderr.on('data', data => {
                console.error(`${data}`);
                done(`${data}`);
            });

            cli.on('close', code => {
                console.log(`child process exited with code ${code}`);
                done()
            });
        });

        it('component name error', function (done) {

            const cli = spawn('node', [
                'src/cli-component.js',
                'component',
                TESTING
            ]);

            cli.stdout.on('data', data => {
                console.log(`${data}`);
            });

            cli.stderr.on('data', data => {
                console.error(`${data}`);
                done();
            });

        });

    });

});