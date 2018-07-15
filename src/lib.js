const figlet = require('figlet');
const chalk = require('chalk');
const downloadRepo = require('util').promisify(require('download-git-repo'));

class DozCLI {
    constructor(opts) {
        console.log(opts);
        //this.run();
        return Promise.resolve('test')
    }

    run() {
        require('download-git-repo')('dozjs/doz-component-starter', 'starter', (err => {
            console.log(err)
        }));
    }

}

module.exports = (opts) => {
    return new DozCLI(opts);
};