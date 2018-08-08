# doz-cli
Command line interface for Doz

## Install
```
$ npm install -g doz-cli
```

### Create a component
```
$ doz component your-component-tag
```

After installing write your component inside `lib/` folder

#### Script
- Development:
    - run script `watch`
- Production:
    - run script `build:production`
- Testing:
    - run script `test`
- Publish on NPM, you can run scripts below (automatically build for production)
    - `release:major` (publish a major)
    - `release:minor` (publish a minor)
    - `release:patch` (publish a patch)

## Todo
 - [x] Component project
 - [x] App project with Koa

## Changelog
You can view the changelog <a target="_blank" href="https://github.com/dozjs/doz-cli/blob/master/CHANGELOG.md">here</a>

## License
doz-cli is open-sourced software licensed under the <a target="_blank" href="http://opensource.org/licenses/MIT">MIT license</a>

## Author
<a target="_blank" href="http://rica.li">Fabio Ricali</a>