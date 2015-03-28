var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var browserSync = require('browser-sync');
var rimraf = require('rimraf');
var runSequence = require('run-sequence');
var del = require('del');

var setting = {
  autoprefixer: {
      browser: ['last 3 version', 'ie >= 8', 'Android 4.0']
  },
  sass: {
    option: {
      style: 'expanded'
    }
  },
  path: {
    base: {
      src: 'src',
      dest: 'httpdocs'
    },
    clean: [
      'httpdocs/assets/sass/',
      'httpdocs/sftp-config.json'
    ],
    sass: {
      src: 'src/assets/sass/**/*.scss',
      dest: 'httpdocs/assets/css/',
    },
    js: {
      src: 'src/assets/js/**/*.js',
      dest: 'httpdocs/assets/js/',
    },
    image: {
      src: 'src/assets/img/**/*',
      dest: 'httpdocs/assets/img/'
    },
    html: {
      src: ['src/**/*.html', 'src/**/*.php'],
      dest: 'httpdocs/',
    },
  }
}

// 画像の圧縮
gulp.task('imagemin', function(){
  var srcGlob = setting.path.image.src;
  var dstGlob = setting.path.image.dest;
  var imageminOptions = {
    optimizationLevel: 7
  };

  gulp.src(srcGlob)
    .pipe($.imagemin(imageminOptions))
    .pipe(gulp.dest(dstGlob));
});

// SASS
gulp.task('scss',function(){
  return gulp.src(setting.path.sass.src)
    .pipe($.plumber({
      errorHandler: $.notify.onError("Error: <%= error.message %>") //<-
    }))
    .pipe($.sass(setting.sass.option))
    .pipe($.changed(setting.path.sass.dest))
    .pipe($.autoprefixer(setting.autoprefixer.browser))
    .pipe(gulp.dest(setting.path.sass.dest))
    .pipe(browserSync.reload({stream: true}));
});

// HTML
gulp.task('html', function(){
  return gulp.src(
    setting.path.html.src,
    {base: setting.path.base.src}
  )
  .pipe($.changed(setting.path.base.dest))
  .pipe(gulp.dest(setting.path.base.dest))
  .pipe(browserSync.reload({stream: true}));
});

// Clean
gulp.task('clean', function(){
  del(setting.path.clean);
});

// Watch
gulp.task('watch',function(){
  browserSync.init({
    server:{
      baseDir: [setting.path.base.dest],
    }
  });

  gulp.watch([setting.path.html.src], ['html']);
  gulp.watch([setting.path.sass.src], ['scss']);
});

gulp.task('default',['watch']);