# grunt-bower-check

Checks that dependencies specified as repositories (git urls) points to the tags. 

## Setup
If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) 
guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. 
Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-bower-check --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-bower-check');
```

## Using grunt-bower-check

Just run

```shell
grunt grunt-bower-check
```

# How it works

Module checks bower.json file, which is expected to be in the same directory as Gruntfile.js. If any of 
 repository dependencies don't point to tag you will see an error about that.