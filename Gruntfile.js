module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        requirejs: {
            compile: {
                options: {
                    baseUrl: "lib",
                    mainConfigFile: "lib/config.js",
                    dir: "release/build",
                    optimize: "none",
                    modules: [{
                            name: 'user/iris-chat-user'
                        },

                        {
                            name: 'representative/iris-chat-representative'
                        }
                    ],
                }
            }
        },

        copy: {
            main: {
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: ['release/build/user/iris-chat-user.js', 'release/build/representative/iris-chat-representative.js'],
                        dest: 'release/'
                    }
                ]
            }
        },

        clean: ["release/build"],

        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            main: {
                files: {
                    'release/iris-chat-user.js': 'release/iris-chat-user.js',
                    'release/iris-chat-representative.js': 'release/iris-chat-representative.js'
                }
            }
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // Default task(s).
    grunt.registerTask('default', ['requirejs', 'copy', 'clean', 'uglify']);

};