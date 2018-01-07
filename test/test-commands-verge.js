exports.testClientInit = function(test) {
    var client = require('../lib/verge');
    test.notEqual(client, null, "client shall not be null");
    test.done();
};
