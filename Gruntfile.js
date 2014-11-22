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
    },

    mox: {
      gen: {
        sourceFiles : ['src'],
        options: {
          name: "Grunt-Mox",
          version:"0.1.0",
          template : "default",
          outputFile: "outputFile.md",
          moxJsonFile : "moxJsonFile.json",
          htmlFile : "htmlOutput.html"
        }
      },
    },
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-mox');

  // Default task(s).


  grunt.registerTask('karma', 'shell:karma');
};