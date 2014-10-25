module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    // 'traceur': {
    //   options: {
    //     modules: 'inline'
    //   },

    //   custom: {
    //     files: [{
    //       expand: true,
    //       cwd: 'src/',
    //       src: ['*.es6'],
    //       dest: 'src/',
    //       ext: '.js'
    //     }]
    //   },
    // },

    'shell': {
      'traceur': {
        command: 'traceur --out=js.js src/spies.es6 --modules=inline'
      }
    },

    'watch': {
      'traceur': {
        files: [
          'src/**/*.es6'
        ],
        tasks: [ 'traceur-sh' ],
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