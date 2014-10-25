module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    'shell': {
      'traceur': {
        command: 'traceur --out=js.js src/spies.es6 --source-maps=file'
      }
    },

    'watch': {
      'traceur': {
        files: [
          'src/**/*.es6.js'
        ],
        tasks: [ 'shell:traceur' ],
        options: {
          atBegin: true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-traceur');
  grunt.loadNpmTasks('grunt-shell');

  // Default task(s).
};