module.exports = {
    REGEX: {
        IS_CUSTOM_TAG: /^\w+-[\w-]+$/,
    },
    REPO: {
        COMPONENT: 'dozjs/doz-component-starter'
    },
    TESTING: '__testing__',
    REPLACE_FILES: {
        componentTag: [
            'index.js',
            'dist/*',
            'example/index.html',
            'README.md.sample',
            'package.json',
        ],
        componentCamelTag: 'dist/*'
    },
    TAG: {
        component: [
            /\[your-component-tag]/g,
            /your-component-tag/g
        ],
        componentCamel: /YourComponentTag/g
    }
};