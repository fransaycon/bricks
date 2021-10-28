module.exports = {
    "env": {
        "browser": true,
    },
    "extends": [
        "plugin:react/recommended",
        "airbnb",
    ],
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
    },
    "plugins": [
        "react",
    ],
    "rules": {
        'react/prop-types': 'off',
    }
};
