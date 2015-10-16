var gulp          = require('gulp');
var browserSync   = require('browser-sync').create();
var reload        = browserSync.reload;

//監視するファイルのパス
var source        = [
					'./httpdocs/**/*'
					];

gulp.task('browser-sync', function() {
	browserSync.init({
		// Webアプリケーションが動作しているアドレス(例ではIPアドレス)
		// proxy: '192.168.33.69',
		// open: false
		server:{
			baseDir: 'httpdocs',
		},
	});
});

gulp.task('watch', function () {
	gulp.watch(source, {interval: 500}, reload);
});

gulp.task('default', ['browser-sync', 'watch']);