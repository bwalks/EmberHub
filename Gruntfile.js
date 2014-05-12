module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		concat: {
  			options: {
    			separator: '\n'
  			},
  			dist: {
    			src: ['js/**/*.js'],
    		 dest: 'dist/<%= pkg.name %>.js'
  			}
		},
		nodestatic: {
			server: {
				options: {
					port: 9999,
					keepalive: true
				}
			}

		}
	});

	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-nodestatic')
	grunt.registerTask('default', ['concat', 'nodestatic:server']);
}; 