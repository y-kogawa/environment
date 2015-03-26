var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var browserSync = require('browser-sync');
var rimraf = require('rimraf');
var runSequence = require('run-sequence');

// 開発ディレクトリ
var dev_dir = 'src/';

gulp.task('scss',function(){
  return gulp.src('src/sass/**/*.scss')
    .pipe($.sass({
      style: 'expanded'
    }))
    .pipe($.autoprefixer('last 2 version', 'ie 8', 'ie 9'))
    .pipe(gulp.dest(dev_dir+'css/'));
});

gulp.task('watch',function(){
  browserSync.init({
    proxy: 'http://environment.yk/',
/*    server:{
      baseDir: ['src'],
    },*/
    notify: false
  });

  gulp.watch([dev_dir+'sass/**/*.scss'], ['scss']);
  gulp.watch([dev_dir+'css/**/*.css'], browserSync.reload);
  gulp.watch([dev_dir+'**/*.html'], browserSync.reload);
  gulp.watch([dev_dir+'**/*.php'], browserSync.reload);
});

gulp.task('default',['watch']);