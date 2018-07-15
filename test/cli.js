const util = require('util');
const dozCLI = util.promisify(require('child_process').exec);

describe('doz cli', function () {

    describe('component', function () {
        it('create', function (done) {
            dozCLI('node src/cli.js component my-component')
                .then(p => {
                    if(!p.stderr) {
                        console.log(p.stdout);
                        done();
                        //return fs.readFile('./test/fixtures/index1.html');
                    }else
                        done(p.stderr);
                }).catch(e => {
                    done(e)
            })
        });
    });

});