module.exports = {
    REGEX: {
        IS_CUSTOM_TAG: /^\w+-[\w-]+$/,
    },
    REPO: {
        APP: 'dozjs/doz-app-starter',
        ELECTRON: 'dozjs/doz-electron-starter',
        COMPONENT: 'dozjs/doz-component-starter',
        PLUGIN: 'dozjs/doz-plugin-starter'
    },
    TESTING: '__testing__',
    REPLACE_FILES: {
        componentTag: [
            'index.js',
            'dist/*',
            'README.md.sample',
            'package.json',
        ],
        componentCamelTag: 'dist/*',
        pluginTag: [
            'package.json'
        ],
        pluginCamelTag: 'dist/*'
    },
    TAG: {
        component: [
            /\[your-component-tag]/g,
            /your-component-tag/g
        ],
        componentCamel: /YourComponentTag/g,
        plugin: /"YOUR-PLUGIN"/g,
        pluginCamel: /YourPlugin/g
    }
};