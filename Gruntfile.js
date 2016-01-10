/*
 * grunt-bower-check
 * https://github.com/acierto/grunt-bower-check
 *
 * Copyright (c) 2016 Bogdan Nechyporenko
 * Licensed under the MIT license.
 */

'use strict';

var exec = require('child_process').exec;
var splitLines = require('split-lines');
var _ = require('lodash');

module.exports = function (grunt) {

    grunt.loadNpmTasks('grunt-release');

    grunt.registerTask('verify-repositories', 'Verifies that repositories as dependencies are tags', function () {

        var done = this.async();
        var bowerJson = grunt.file.readJSON('bower.json');

        if (_.isEmpty(bowerJson.dependencies)) {
            done();
        }

        _.forEach(bowerJson.dependencies, function (dependency) {
            if (_.startsWith(dependency, 'git@')) {
                var hashSymbol = '#';
                var hashInd = dependency.indexOf(hashSymbol);
                var repository = dependency.substring(0, hashInd);
                var tagVersion = dependency.substring(hashInd + hashSymbol.length);

                exec('git ls-remote ' + repository, function (err, stdout, stderr) {
                    if (err || stderr) {
                        console.error(err || stderr);
                        done();
                        return;
                    }

                    var found = _.reduce(splitLines(stdout), function (result, line, index) {
                        return result || _.endsWith(line, 'refs/tags/' + tagVersion);
                    }, false);

                    if (!found) {
                        grunt.fail.fatal('Tag ' + tagVersion + ' hasn\'t been found for repository ' + repository);
                    }

                    done();
                });
            }
        });
    });

    grunt.registerTask('default', ['verify-repositories']);
};