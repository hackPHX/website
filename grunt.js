/*global module:false*/
module.exports = function(grunt) {

  var basename = require('path').basename;
  var events = grunt.file.expand('./events/*.json');

  var eventConfig = {};

  grunt.utils._.forEach(events, function(event){

    var eventAbbr = basename(event, '.json');

    eventConfig[eventAbbr] = {
      src: ['jade/index.jade'],
      dest: eventAbbr,
      options: {
        client: false,
        data: grunt.file.readJSON(event)
      }
    };

  });

  // Project configuration.
  grunt.initConfig({
    pkg: '<json:package.json>',
    meta: {
      banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
        '<%= pkg.homepage ? "* " + pkg.homepage + "\n" : "" %>' +
        '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
        ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */'
    },
    lint: {
      files: ['grunt.js', 'src/**/*.js', 'test/**/*.js']
    },
    qunit: {
      files: ['test/**/*.html']
    },
    concat: {
      dist: {
        src: ['<banner:meta.banner>', 'lib/zepto.js', 'lib/lodash.custom.js', '<file_strip_banner:src/<%= pkg.name %>.js>'],
        dest: 'dist/js/<%= pkg.name %>.js'
      }
    },
    min: {
      dist: {
        src: ['<banner:meta.banner>', '<config:concat.dist.dest>'],
        dest: 'dist/js/<%= pkg.name %>.min.js'
      }
    },
    jade: eventConfig,
    recess: {
      dist: {
        src: ['bootstrap/bootstrap.less'],
        dest: 'dist/css/bootstrap.css',
        options: {
          compile: true
        }
      },
      responsive: {
        src: ['bootstrap/responsive.less'],
        dest: 'dist/css/bootstrap-responsive.css',
        options: {
          compile: true
        }
      },
      loadingAnimation: {
        src: ['bootstrap/loading-animation.less'],
        dest: 'dist/css/loading-animation.css',
        options: {
          compile: true,
          strictPropertyOrder: false
        }
      }
    },
    watch: {
      files: ['<config:lint.files>', 'bootstrap/**/*.less'],
      tasks: 'default'
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        browser: true
      },
      globals: {
        '$': true,
        '_': true,
        console: true,
        require: true
      }
    },
    uglify: {}
  });

  grunt.loadNpmTasks('grunt-recess');
  grunt.loadNpmTasks('grunt-jade');

  // Default task.
  grunt.registerTask('default', 'lint qunit concat min recess jade');

};
