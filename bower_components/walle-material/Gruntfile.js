module.exports = function (grunt) {
	"use strict";
	
	grunt.initConfig({
		pkg : grunt.file.readJSON('package.json'),
		// Task config
		clean : {
			dist : 'dist'
		},
		less : {
			walle : {
				options : {
					paths : ["less"],
					sourceMap : true,
					sourceMapRootpath : "/",
					sourceMapFilename : "dist/css/walle.css.map",
					sourceMapURL : "walle.css.map"
				},
				files : {
					"dist/css/bs.walle.css" : "less/bs.walle.less",
					"dist/css/mdb.walle.css" : "less/mdb.walle.less",
					"dist/css/walle.css" : "less/walle.less"
				}
			}
		},
		autoprefixer : {
			options : {
				map : true,
				browsers : [
					"Android 2.3",
					"Android >= 4",
					"Chrome >= 20",
					"Firefox >= 24",
					"Explorer >= 8",
					"iOS >= 6",
					"Opera >= 12",
					"Safari >= 6"
				]
			},
			walle : {
				files : {
					"dist/css/walle.css" : "dist/css/walle.css"
				}
			}
		},
		csslint: {
			options : {
				csslintrc: 'less/.csslintrc'
			},
			dist : [
				'dist/css/walle.css'
			],
			distmin : [
				'dist/css/walle.min.css'
			]
		},
		cssmin : {
			options: {
				compatibility : 'ie8',
				keepSpecialComments : '*',
				sourceMap : true,
				advanced : false
			},
			walle : {
				src : "dist/css/walle.css",
				dest : "dist/css/walle.min.css"
			}
		},
		connect : {
			options : {
				port : 8041,
				hostname : 'localhost',
				livereload : 35730
			},
			livereload : {
				options : {
					open : true,
					base : "."
				}
			}
		},
		watch : {
			src : {
				files : 'scripts/**/*.js',
				tasks : ['jshint:core']
			},
			less : {
				files : ["less/**/*.less"],
				tasks : ["dist-less"]
			},
			livereload : {
				options : {
					livereload : "<%= connect.options.livereload %>"
				},
				files : [
					"index.html",
					"dist/js/**/*.js",
					"dist/css/**/*.css",
					"demo/**/*.{png,jpg,jpeg,gif,webp,svg}"
				]
			}
		}
	});

	require("load-grunt-tasks")(grunt, {scope: 'devDependencies'});

	grunt.registerTask("less-compile", [
		"less:walle"
	]);

	grunt.registerTask("dist-less", [
		"less-compile",
		"autoprefixer:walle",
		"csslint:dist",
		"cssmin:walle",
		"csslint:distmin"
	]);

	grunt.registerTask("dist", [
		"clean:dist",
		"dist-less"
	]);

	grunt.registerTask("serve", [
		"dist-less",
		"connect:livereload",
		"watch"
	]);
};