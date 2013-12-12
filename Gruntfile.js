module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: 'dist/out.js',
                dest: 'dist/out.min.js'
            }
        },
        typescript: {
            base: {
                src: ['src/main/ts/**/*.ts', 'src/main/d.ts/**/*.d.ts'],
                dest: 'dist/out.js',
                options: {
                    module: 'amd', //or commonjs
                    target: 'es5', //or es3
                    base_path: 'src/main/ts',
                    sourcemap: true,
                    declaration: true
                }
            }
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    // Load the plugin that provides the "TS" task.
    grunt.loadNpmTasks('grunt-typescript');

    // Default task(s).
    grunt.registerTask('default', ['typescript', 'uglify']);

};