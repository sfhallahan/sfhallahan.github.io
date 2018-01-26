/*
  "grunt" alone creates a new, completed images directory
  "grunt clean" removes the images directory
  "grunt responsive_images" re-processes images without removing the old ones
*/

module.exports = function(grunt) {

  grunt.initConfig({
    responsive_images: {
      dev: {
        options: {
          engine: 'gm',
          sizes: [{
            width: 1280,
            suffix: "w",
            quality: 60
          },
          {
            width: 640,
            suffix: "w",
            quality: 80
          },
          {
            width: 320,
            suffix: "w",
            quality: 90
          }]
        },
        files: [{
          expand: true,
          src: ['*.{gif,jpg,png}'],
          cwd: 'img/img_src/',
          dest: 'img/'
        }]
      }
    },

    /* Clear out the img directory if it exists */
    clean: {
      dev: {
        src: ['img/*.{gif,jpg,png}']
      }
    },

    /* Copy the "fixed" images that don't go through processing into img */
    copy: {
      dev: {
        files: [{
          expand: true,
          src: 'img/img_src/fixed/*.{gif,jpg,png}',
          dest: 'img/',
          flatten: true
        }]
      },
    },
  });

  grunt.loadNpmTasks('grunt-responsive-images');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-mkdir');
  grunt.registerTask('default', ['clean', 'copy', 'responsive_images']);

};
