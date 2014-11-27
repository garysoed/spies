var fs = require('fs');

module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    'shell': {
      'traceur': {
        command: 'traceur --out main.js src/main.js --source-maps=file --symbols=true --modules=inline'
      },
      'karma': {
        command: 'karma start karma.conf.js'
      },
      'mv': {
        command: function(from, to) {
          return 'mv ' + from + ' ' + to;
        }
      }
    },

    'jshint': {
      options: {
        'esnext': true
      },
      all: ['src/**/*.js']
    },

    'watch': {
      'traceur': {
        files: [
          'src/**/*.js'
        ],
        tasks: [ 'jshint', 'shell:traceur', 'karma' ],
        options: {
          atBegin: true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.registerTask('karma', 'shell:karma');
};