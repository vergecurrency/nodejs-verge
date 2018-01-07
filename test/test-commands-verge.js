var client = require('../lib/verge')();

exports.testClientInit = function(test) {
    test.notEqual(client, null, "client shall not be null");
    test.done();
};

exports.testClientInvalidFunction = function(test) {
    test.throws(client.exec('unknown'), 'No such command "unknown"', "invalid command throws an error");
    test.done();
};
