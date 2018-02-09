/*
  "grunt" runs clean, copies images from fixed directory and processing images
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
            width: 760,
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
        src: ['img/*.{gif,jpg,png,svg}', 'js/*.js', 'css/*.css']
      }
    },

    /* Copy the "fixed" images that don't go through processing into img */
    copy: {
      dev: {
        files: [{
          expand: true,
          src: 'img/img_src/fixed/*.{gif,jpg,png,svg}',
          dest: 'img/',
          flatten: true
        }]
      },
    },
    uglify: {
      my_target: {
        files: {
          'js/main.min.js': ['js/js_src/jquery-3.2.1.min.js', 'js/js_src/main.js']
        }
      }
    },
    cssmin: {
      target: {
        files: [{
          expand: true,
          cwd: 'css/css_src',
          src: ['*.css'],
          dest: 'css',
          ext: '.min.css'
        }]
      }
    }
  });

  grunt.loadNpmTasks('grunt-responsive-images');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.registerTask('default', ['clean', 'copy', 'responsive_images', 'uglify', 'cssmin']);

};
