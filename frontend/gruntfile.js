module.exports = function(grunt) {
    // grunt init
    grunt.initConfig({
        // sass
        sass: {
            dist: {
                options: {
                    style: 'expanded',
                    compass: false
                },
                files: {
                    'assets/css/style.css': 'assets/scss/style.scss'
                }
            }
        },
        // prefix all
        autoprefixer: {
            options: {
                browsers: ['last 10 version']
            },
            multiple_files: {
                expand: true,
                flatten: true,
                src: 'assets/css/*.css',
                dest: '../backend/static/css/'
            }
        },
        // minimize styles
        cssmin: {
            combine: {
                files: {
                    '../backend/static/css/style.min.css': ['../backend/static/css/style.css']
                }
            }
        },
        // sync files additional files
        sync: {
            main: {
                files: [
                    {
                        expand: true,
                        cwd: 'bower_components/handlebars',
                        src: ['handlebars.min.js', 'handlebars.js'],
                        dest: '../backend/static/js/libs/'
                    },
                    {
                        expand: true,
                        cwd: 'bower_components/normalize-css/',
                        src: ['normalize.css'],
                        dest: '../backend/static/css/'
                    },
                    {
                        expand: true,
                        cwd: 'bower_components/font-awesome/fonts',
                        src: ['*'],
                        dest: '../backend/static/fonts/'
                    },
                    {
                        expand: true,
                        cwd: 'bower_components/font-awesome/css',
                        src: ['font-awesome.min.css'],
                        dest: '../backend/static/css/'
                    }
                ]
            }
        },
        // concat files
        concat: {
            dist: {
                src: ['assets/js/**/*.js'],
                dest: '../backend/static/js/app.js'
            }
        },
        // uglify code
        uglify: {
            my_target: {
                files: {
                    '../backend/static/js/app.min.js': ['../backend/static/js/app.js']
                }
            }
        },
        // image optimize
        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: 'assets/images/',
                    src: ['**/*.{png,jpg,gif,svg}'],
                    dest: '../backend/static/images/'
                }]
            }
        },
        // watch files
        watch: {
            options: {
                livereload: true,
            },
            sync: {
                files: 'assets/js/*.js',
                tasks: ['sync']
            },
            css: {
                files: ['assets/scss/*.scss', 'assets/scss/**/*.scss'],
                tasks: ['sass', 'autoprefixer'],
                options: {
                    spawn: false,
                    livereload: false,
                }
            },
            autoprefixer: {
                files: 'assets/css/**',
                tasks: ['autoprefixer']
            },
            images: {
                files: ['assets/images/*.{png,jpg,gif}'],
                tasks: ['imagemin'],
            }
        },
    });

    require('load-grunt-tasks')(grunt);

    grunt.registerTask('build', ['sync', 'imagemin', 'sass', 'autoprefixer', 'concat', 'uglify', 'cssmin']);
    grunt.registerTask('run', ['sync', 'imagemin', 'sass', 'autoprefixer', 'concat', 'watch']);
    grunt.registerTask('default', ['run']);
}
