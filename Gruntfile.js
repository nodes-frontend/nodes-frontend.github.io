'use strict';

module.exports = function(grunt) {

	require('load-grunt-tasks')(grunt);
	require('time-grunt')(grunt);

	var config = require('./config/config.json');

	grunt.initConfig({

		config: {
			src: config.tasks.sourceDIR,
			dist: config.tasks.buildDIR,
			tmp: config.tasks.tempDIR,
			rootUrl: config.rootURL
		},

		/*
			Watch + BrowserSync
		*/
		watch: {
			assemble: {
				files: [
					'<%= config.src %>/site/templates/**/*.hbs',
					'<%= config.src %>/content/blog/**/*.md',
					'<%= config.src %>/content/pages/**/*.hbs',
					'<%= config.src %>/data/**/*'
				],
				tasks: ['assemble', 'copy:pageAssets', 'copy:pageAssets']
			},
			sass: {
				files: [
					'<%= config.src %>/site/assets/scss/**/*.scss',
					'<%= config.src %>/app/**/*.scss'
				],
				tasks: ['sass:server', 'autoprefixer:server']
			}
		},

		browserSync: {
			dev: {
				bsFiles: {
					src: [
						'<%= config.src %>/*.html',
						'<%= config.src %>/app/**/*.html',
						'<%= config.src %>/app/**/*.js',
						'<%= config.dist %>/**/*.html',
						'<%= config.tmp %>/assets/css/{,*/}*.css'
					]
				},
				options: {
					watchTask: true,
					server: {
						baseDir: ['<%= config.src %>', '<%= config.tmp %>'],
						routes: {
							'/bower_components': './bower_components',
							'/content': '<%= config.dist %>/content',
							'/assets': './src/site/assets'
						}
					}
				}
			},
			dist: {
				options: {
					server: {
						port: 3000,
						baseDir: ['<%= config.dist %>']
					}
				}
			}
		},

		/*
		 	Deployment to Github Pages
		 */
		'gh-pages': {
			options: {
				branch: 'master',
				base: '<%= config.dist %>',
				dotfiles: true
			},
			src: ['**/*']
		},

		/*
			Sass + Autprefixer
		*/
		sass: {
			options: {
				loadPath: [
					'bower_components'
				]
			},
			server: {
				files: [{
					expand: true,
					cwd: '<%= config.src %>/site/assets/scss',
					src: ['*.scss'],
					dest: '<%= config.tmp %>/assets/css',
					ext: '.css'
				}]
			},
			build: {
				options:{
					sourceMap: false,
					style: 'compressed'
				},
				files: [{
					expand: true,
					cwd: '<%= config.src %>/site/assets/scss',
					src: ['*.scss'],
					dest: '<%= config.tmp %>/assets/css',
					ext: '.css'
				}]
			}
		},

		autoprefixer: {
			options: {
				browsers: ['last 2 version']
			},
			server: {
				files: [{
					expand: true,
					cwd: '<%= config.tmp %>/assets/css/',
					src: '{,*/}*.css',
					dest: '<%= config.tmp %>/assets/css'
				}]
			},
			build: {
				options: {
					map: false
				},
				files: [{
					expand: true,
					cwd: '<%= config.tmp %>/assets/css/',
					src: '{,*/}*.css',
					dest: '<%= config.tmp %>/assets/css'
				}]
			}
		},

		/*
			Assemble
		*/
		assemble: {
			options: {
				plugins: ['config/tasks/grunt-n-assemble-blog-config.js'],
				helpers: '<%= config.src %>/site/helpers/**/*.js',
				layout: 'ajax.hbs',
				layoutdir: '<%= config.src %>/site/templates/layouts/',
				partials: '<%= config.src %>/site/templates/partials/**/*',
				blogConfig: {
					dest: '<%= config.dist %>/content/'
				},
				marked: {
					highlight: function(code, lang) {
						return require('highlight.js').highlightAuto(code).value;
					}
				}
			},
			posts: {
				files: [{
					cwd: '<%= config.src %>/content',
					dest: '<%= config.dist %>/content',
					expand: true,
					flatten: false,
					src: ['blog/**/*.md']
				}]
			},
			pages: {
				files: [{
					cwd: '<%= config.src %>/content',
					dest: '<%= config.dist %>/content',
					expand: true,
					flatten: false,
					src: ['pages/**/*.hbs']
				}]
			}
		},

		/*
			Bower Wiring
		*/
		wiredep: {
			options: {
				exclude: []
			},

			app: {
				src: [
					'<%= config.src %>/index.html'
				],
				ignorePath: /\.\.\//
			},

			sass: {
				src: [
					'<%= config.src %>/site/assets/scss/app.scss'
				]
			}
		},

		/*
		 	Javascript Build Tasks (Usemin, Concat, Minify, Cache Busting)
		 */
		useminPrepare: {
			html: '<%= config.src %>/index.html',
			options: {
				dest: '<%= config.dist %>',
				flow: {
					steps: {
						js: [
							'concat',
							'uglifyjs'
						],
						css: [
							'cssmin'
						]
					},
					post: {}
				}
			}
		},

		usemin: {
			html: ['<%= config.dist %>/index.html'],
			css: ['<%= config.dist %>/assets/css/{,*/}*.css'],
			options: {
				assetsDirs: ['<%= config.dist %>', '<%= config.dist %>/assets/img']
			}
		},

		concat: {
			build: {
				src: [
					'<%= config.tmp %>/concat/assets/js/site.js',
					'<%= config.tmp %>/concat/assets/js/templates.js'],
				dest: '<%= config.tmp %>/concat/assets/js/site.js'
			}
		},

		uglify: {
			options: {
				mangle: false
			}
		},

		cssmin: {
			build: {
				files: [{
					expand: true,
					cwd: '<%= config.tmp %>/assets/css',
					src: ['*.css'],
					dest: '<%= config.dist %>/assets/css',
					ext: '.min.css'
				}]
			}
		},

		filerev: {
			build: {
				src: [
					'<%= config.dist %>/assets/css/main.min.css',
					'<%= config.dist %>/assets/js/*.js'
				]
			}
		},

		cdn: {
			options: {
				cdn: '<%= config.rootUrl %>',
				flatten: true
			},
			build: {
				cwd: '<%= config.dist %>/',
				dest: '<%= config.dist %>/',
				src: ['index.html'],
			}
		},

		/*
		 	Angular Build Tasks (Annotation, Inline Templating)
		 */
		ngAnnotate: {
			build: {
				files: [{
					expand: true,
					cwd: '<%= config.tmp %>/concat/assets/js',
					src: '*.js',
					dest: '<%= config.tmp %>/concat/assets/js'
				}]
			}
		},

		ngtemplates: {
			build: {
				cwd: '<%= config.src %>',
				src: [
					'app/common/**/*.template.html',
					'app/modules/**/*.template.html'
				],
				dest: '<%= config.tmp %>/concat/assets/js/templates.js',
				options: {
					bootstrap:  function(module, script, options) {
						return "(function() {" + options.angular+".module('"+module+"'"+(options.standalone ? ', []' : '')+").run(['$templateCache', function($templateCache) {\n"+script+"\n}]);})();\n";
					},
					usemin: 'assets/js/site.js',
					module: 'nBlog',
					htmlmin: {
						collapseBooleanAttributes: false,
						collapseWhitespace: false,
						removeAttributeQuotes: false,
						removeComments: false, // Only if you don't use comment directives!
						removeEmptyAttributes: false,
						removeRedundantAttributes: false,
						removeScriptTypeAttributes: false,
						removeStyleLinkTypeAttributes: false
					}
				}
			}
		},

		/*
		 	Image Build Tasks (Image / Svg optimization)
		 */
		imagemin: {
			build: {
				files: [{
					expand: true,
					cwd: '<%= config.src %>/site/assets/img',
					src: '{,*/}*.{gif,jpeg,jpg,png}',
					dest: '<%= config.dist %>/assets/img'
				}]
			},
			buildBlog: {
				files: [{
					expand: true,
					cwd: '<%= config.src %>/content/blog',
					src: '**/*.{jpg,jpeg,png,gif}',
					dest: '<%= config.dist %>/content/blog'
				}]
			},
			buildPages: {
				files: [{
					expand: true,
					cwd: '<%= config.src %>/content/pages',
					src: '**/*.{jpg,jpeg,png,gif}',
					dest: '<%= config.dist %>/content/pages',
				}]
			}
		},

		svgmin: {
			build: {
				files: [{
					expand: true,
					cwd: '<%= config.src %>/site/assets/img',
					src: '{,*/}*.svg',
					dest: '<%= config.dist %>/assets/img'
				}]
			},
			buildBlog: {
				files: [{
					expand: true,
					cwd: '<%= config.src %>/content/blog',
					src: '**/*.svg',
					dest: '<%= config.dist %>/content/blog'
				}]
			},
			buildPages: {
				files: [{
					expand: true,
					cwd: '<%= config.src %>/content/pages',
					src: '**/*.svg',
					dest: '<%= config.dist %>/content/pages',
				}]
			}
		},

		/*
		 	Static file Build Tasks
		 */
		copy: {
			blogAssets: {
				files: [{
					expand: true,
					dot: true,
					cwd: '<%= config.src %>/content/blog',
					dest: '<%= config.dist %>/content/blog',
					src: ['**/*.{jpg,jpeg,png,svg,gif}']
				}]
			},
			pageAssets: {
				files: [{
					expand: true,
					dot: true,
					cwd: '<%= config.src %>/content/pages',
					dest: '<%= config.dist %>/content/pages',
					src: ['**/*.{jpg,jpeg,png,svg,gif}']
				}]
			},
			rootAssets: {
				files: [{
					expand: true,
					dot: true,
					cwd: '<%= config.src %>',
					dest: '<%= config.dist %>',
					src: [
						'index.html',
						'*.{ico,png,jpg,txt}']
				}]
			},
			fontAssets: {
				files: [{
					expand: true,
					dot: true,
					cwd: '<%= config.src %>/site/assets/fonts',
					dest: '<%= config.dist %>/assets/fonts',
					src: ['{,*/}*.*']
				}]
			}
		},

		/*
		 	Misc Tasks
		 */
		clean: ['<%= config.dist %>','<%= config.tmp %>'],
	});

	grunt.loadNpmTasks('assemble');

	grunt.registerTask('serve', [
		'clean',
		'assemble',
		'copy:blogAssets',
		'copy:pageAssets',
		'wiredep',
		'sass:server',
		'autoprefixer:server',
		'browserSync:dev',
		'watch'
	]);

	grunt.registerTask('dist', [
		'browserSync:dist'
	]);

	grunt.registerTask('build', [
		'clean',
		'assemble',
		'copy:rootAssets',
		'copy:fontAssets',
		'useminPrepare',
		'sass:build',
		'autoprefixer:build',
		'ngtemplates',
		'ngAnnotate',
		'imagemin',
		'svgmin',
		'concat',
		'uglify',
		'cssmin',
		'filerev',
		'usemin'
	]);

	grunt.registerTask('deploy', [
		'build',
		'cdn',
		'gh-pages'
	]);

	grunt.registerTask('default', [
		'deploy'
	]);

};
