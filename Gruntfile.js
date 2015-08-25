// Обязательная обёртка
module.exports = function (grunt) {
    "use strict";
    // Задачи
    grunt.initConfig({
        stylus: {
            compile: {
                options: {
                    compress: false
                },
                files: {
                    'build/css/style.css': [
                        'src/elements/**/*.styl',                        
                        'src/blocks/**/*.styl'
                    ]
                }
            }
        },

        autoprefixer: {
            single_file: {
                options: {
                    browsers: ['> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1', 'ie 8', 'ie 9']
                },

                src: 'build/css/style.css'
            }
        },

        cssmin: {
            minify: {
                files: [{
                    expand: true,
                    cwd: 'build/css/',
                    src: ['*.css', '!*.min.css'],
                    dest: 'build/css/',
                    ext: '.min.css'
                }]
            }
        },

        copy: {
            images: {
                expand: true,
                cwd: 'src/blocks/',
                src: ['**/images/*'],
                dest: 'build/images/',
                flatten: true,
                filter: 'isFile'
            },
            fonts: {
                expand: true,
                cwd: "src/",
                src: ["**/**/fonts/*"],
                dest: "build<%= version %>/fonts/",
                flatten: true,
                filter: "isFile"
            },
            csslibs: {
                expand: true,
                cwd: 'src/libs/css/',
                src: ['*'],
                dest: 'build/css/',
                flatten: true,
                filter: 'isFile'
            },
            jslibs: {
                expand: true,
                cwd: 'src/libs/js/',
                src: ['*'],
                dest: 'build/js/',
                flatten: true,
                filter: 'isFile'
            },
            html: {
                expand: true,
                cwd: 'src/',
                src: ['*.html'],
                dest: 'build/',
                flatten: true,
                filter: 'isFile'
            },
            final: {
                files: [
                      // includes files within path
                    {
                        cwd: 'src/',
                        src: 'build/**',
                        dest: 'final/',
                        expand: true
                      },
                      // flattens results to a single level
                    {
                        src: ['src/*'],
                        dest: 'final/',
                        filter: 'isFile',
                        expand: true,
                        flatten: true,
                      },
                 ],
            }
        },

        watch: {
            options: {
                reload: true
            },
            src: {
                files: ['src/*.*','src/**/*.*','src/**/**/*.*'],
                tasks: ['default']
            }
        },

        jscs: {
            src: "src/blocks/**/*.js",
            options: {
                config: true,
                requireCurlyBraces: ["if"]
            }
        },

        jshint: {
            options: {
                jshintrc: '.jshintrc' // relative to Gruntfile
            },
            // You get to make the name
            // The paths tell JSHint which files to validate
            myFiles: ['src/blocks/**/*.js','elements/blocks/**/*.js']
        },
        concat: {
            options: {
                separator: ';'
            },
            all: {
                src: ['src/elements/**/*.js', 'src/blocks/**/*.js'],
                dest: 'build/js/script.js'
            }
        },
        uglify: {
            all: {
                files: {
                    // Результат задачи concat
                    'build/js/script.min.js': '<%= concat.all.dest %>'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    grunt.loadNpmTasks('grunt-contrib-stylus');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks("grunt-jscs");

    grunt.registerTask('default', ['jscs', 'jshint', 'stylus', 'autoprefixer', 'cssmin', "concat", "uglify", "copy:images", "copy:fonts", "copy:csslibs", "copy:jslibs", "copy:html"]);

    grunt.registerTask('js', ['jscs', 'jshint']);

    grunt.registerTask("final", ["copy:final"]);
};