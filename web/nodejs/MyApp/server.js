#!/usr/bin/env node

/**
 * Server module exports method returning new instance of app.
 *
 * @param {Object} params - compound/express webserver initialization params.
 * @returns CompoundJS powered express webserver
 */
var app = module.exports = function getServerInstance(params) {
    params = params || {};
    // specify current dir as default root of server
    params.root = params.root || __dirname;
    return require('compound').createServer(params);
};

if (!module.parent) {
    var port = process.env.PORT || 3000;
    var host = '127.0.0.1' || 'ec2-54-244-147-98.us-west-2.compute.amazonaws.com' || process.env.HOST || '127.0.0.1';

    var server = app();
    server.listen(port, host, function () {
        console.log(
            'Compound server listening on %s:%d within %s environment',
            host, port, server.set('env')
        );
    });
}

