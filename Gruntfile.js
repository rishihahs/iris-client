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
                    modules: [
                        {
                            name: 'user/iris-chat-user',
                            include: ['deps/almond']
                        },

                        {
                            name: 'representative/iris-chat-representative',
                            include: ['deps/almond']
                        }
                    ],
                }
            }
        },

        copy: {
            main: {
                files: [{
                    expand: true,
                    flatten: true,
                    src: ['release/build/user/iris-chat-user.js', 'release/build/representative/iris-chat-representative.js'],
                    dest: 'release/'
                }]
            }
        },

        clean: ["release/build"],

        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            main: {
                files: [
                    {
                        src: ['release/iris-chat-user.js', 'lib/user/run.js'],
                        dest: 'release/iris-chat-user.js'
                    },

                    {
                        src: ['release/iris-chat-representative.js', 'lib/representative/run.js'],
                        dest: 'release/iris-chat-representative.js'
                    }
                ]
            }
        },

        compass: {
            compile: {
                options: {
                    sassDir: 'stylesheets',
                    cssDir: 'release',
                    specify: ['stylesheets/iris-chat-styles.scss'],
                    environment: 'production'
                }
            }
        }
    });

    // Load the plugin that provides the "beautify" task.
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-compass');

    // Default task(s).
    grunt.registerTask('default', ['requirejs', 'copy', 'clean', 'uglify', 'compass']);

};