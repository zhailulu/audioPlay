module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        banner: '/*!\n' +
        ' * =====================================================\n' +
        ' * company:http://www.witgo.cn/\n' +
        ' * author:zhailulu  date: <%= grunt.template.today("yyyy-mm-dd") %>\n' +
        ' * =====================================================\n' +
        ' */\n',
      },
      build: {
        options: {
                  banner: ''
              },
        src: [
            'lib/zepto.min.js',
            'lib/frozen.js'
        ],
        dest: 'lib/public.js'
      },
      css : {
           src: ['css/all/*.min.css'],
           dest:'css/all.min.css'
      }
    },
    uglify: {
      options: {
        banner: '/*!\n' +
        ' * =====================================================\n' +
        ' * company:http://www.witgo.cn/\n' +
        ' * author:zhailulu  date: <%= grunt.template.today("yyyy-mm-dd") %>\n' +
        ' * =====================================================\n' +
        ' */\n',
        mangle: true

      },
      buildall: {
                files: [{
                    expand:true,
                    cwd:'src',
                    src:'**/*.js',
                    dest: 'js/',
                    ext: '.min.js'
                }]
            }
    },

    cssmin: {
        options: {
          banner: '',
        },
        /*build: {
          src: 'css/src/<%= pkg.name %>.css',
          dest: 'css/<%= pkg.name %>.min.css'
        }*/
        buildall: {
                files: [{
                    expand:true,
                    cwd:'css/src',
                    src:'**/*.css',
                    dest: 'css/',
                    ext: '.min.css'
                }]
        }
      }

  });

  // 加载包含 "uglify" 任务的插件。
  grunt.loadNpmTasks('grunt-contrib-concat');//合并
  grunt.loadNpmTasks('grunt-contrib-uglify');//js压缩
  grunt.loadNpmTasks('grunt-contrib-cssmin');//css压缩
  //grunt.loadNpmTasks('grunt-contrib-watch');//任务监控

  // 默认被执行的任务列表。
  grunt.registerTask('default', ['uglify', 'cssmin', 'concat']);

};