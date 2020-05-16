var gulp = require('gulp');
var deploy = require('gulp-gh-pages');
var exec = require('child_process').exec;
var fs = require('fs');

gulp.task('mkdir-build', function(callback){
	fs.exists('build', function(exists){
		if (!exists) {
			fs.mkdir('build', callback);
		} else {
			callback();
		}
	});
});

gulp.task('jshint', function(callback) {
  exec('jshint .', function(err, stdout, stderr){
  	if (err) return callback(err);
  	console.log(stdout);
  	console.log(stderr);
  	callback();
  });
});

gulp.task('jshint-html', ['mkdir-build'], function(callback) {
  exec('jshint . --reporter node_modules/jshint-html-reporter/reporter.js > build/jshint.html', callback);
});

gulp.task('jshint-badge', ['mkdir-build'], function(callback) {
  exec('jshint . --reporter index.js > build/jshint-badge.svg', callback);
});

gulp.task('lint', ['jshint', 'jshint-html', 'jshint-badge']);

gulp.task('git-config', function(callback){
	exec('git config --global user.email "alban.mouton@gmail.com" && git config --global user.name "Alban Mouton through Travis-CI"', callback);
});

gulp.task('deploy-build', ['lint', 'git-config'], function() {
	var deployOptions = {
		cacheDir: './build/repos/jshint-reporter-badge'
	};
	if (process.env.githubToken) {
		console.log('"githubToken" environment variable found, use it to authenticate to github');
		deployOptions.remoteUrl = 'https://' + process.env.githubToken + '@github.com/albanm/jshint-reporter-badge';
	}
	return gulp.src('./build/**/*')
		.pipe(deploy(deployOptions));
});

gulp.task('default', ['lint']);