var fs = require('fs');

module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    'shell': {
      'traceur': {
        command: function(src, out) {
          return 'traceur --out=' + out + ' ' + src + ' --source-maps=file --symbols=true';
        }
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
        'src/spies'
      ]
    },

    'watch': {
      'traceur': {
        files: [
          'src/**/*.js'
        ],
        tasks: [ 'multi-traceur' ],
        options: {
          atBegin: true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-shell');

  // Default task(s).
  grunt.registerTask('multi-traceur', 'runs traceur on all modules', function() {
    grunt.config.requires('multi-traceur.modules');
    grunt.config('multi-traceur.modules').forEach(function(module) {
      var outDir = grunt.config('multi-traceur.out');
      var fileName = module.match(/[^\/]*$/);
      var outJs = fileName + '.js';
      var outMap = fileName + '.map';
      var moduleOut = module.replace('src/', 'out/');

      grunt.task.run('shell:traceur:' + module + ':' + outJs);
      grunt.file.mkdir(outDir);

      grunt.task.run('shell:mv:' + outJs + ':' + moduleOut + '.js');
      grunt.task.run('shell:mv:' + outMap + ':' + moduleOut + '.map');
    });
  });

  grunt.registerTask('karma', 'shell:karma');
};