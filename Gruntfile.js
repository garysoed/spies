var fs = require('fs');

module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    'shell': {
      'traceur': {
        command: 'traceur --out main.js src/main.js --source-maps=file --symbols=true'
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

    'multi-traceur': {
      out: 'out',
      modules: [
        'src/main',
      ]
    },

    'watch': {
      'traceur': {
        files: [
          'src/**/*.js'
        ],
        tasks: [ 'shell:traceur' ],
        options: {
          atBegin: true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-shell');

  // Default task(s).


  grunt.registerTask('karma', 'shell:karma');
};