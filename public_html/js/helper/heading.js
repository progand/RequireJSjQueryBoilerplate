define(function (require, exports, module) {
    var _ = require("lodash"),
            greetings = require("helper/greetings");
    //Put traditional CommonJS module content here
    return greetings[_.random(0, greetings.length - 1)];
});