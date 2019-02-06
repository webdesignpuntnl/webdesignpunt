module.exports = {
    "plugins": ["prettier"],
    "extends": ["airbnb-base", "prettier"],
    "env": {
        "es6": true,
        "browser": true,
        "node": true,
        "jquery": true
    },

    "rules": {
        "prettier/prettier": ["error"],
        "linebreak-style": 0, //0 is off, 1 is warn, 2 is error
        "prefer-arrow-callback": 1,
        "no-console": 0,
        "no-param-reassign": 1
    }
};