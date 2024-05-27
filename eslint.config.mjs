import globals from 'globals'
import pluginJs from '@eslint/js'

export default [
    {
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node,
            },
        },
    },
    pluginJs.configs.recommended,
    {
        env: {
            node: true,
            es6: true,
        },
        rules: {
            'no-undef': 'off',
        },
    },
]
