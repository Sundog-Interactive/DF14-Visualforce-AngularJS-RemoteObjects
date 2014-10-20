module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		compress: {
			main: {
				options: {
					archive: 'bin/ContactManagerSPA.zip'
				},
				files: [
					{expand: true, cwd: 'src/', src: ['**/*'], dest: '/'}
					,{expand: true, cwd: 'vendor/', src: ['**/*'], dest: '/vendor'}
				]
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-compress');

	grunt.registerTask('default', ['compress']);
};