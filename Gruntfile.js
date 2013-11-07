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
                            name: 'chat/chat',
                            include: ['deps/almond']
                        }
                    ],
                }
            }
        },

        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            main: {
                files: [
                    {
                        src: ['release/build/chat/chat.js', 'lib/chat/run.js'],
                        dest: 'release/iris.js'
                    }
                ]
            }
        },

        clean: ["release/build"],

        compass: {
            compile: {
                options: {
                    sassDir: 'stylesheets',
                    cssDir: 'release',
                    specify: ['stylesheets/iris-styles.scss'],
                    environment: 'production'
                }
            }
        }
    });

    // Load the plugin that provides the "beautify" task.
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-compass');

    // Default task(s).
    grunt.registerTask('default', ['requirejs', 'uglify', 'clean', 'compass']);

};