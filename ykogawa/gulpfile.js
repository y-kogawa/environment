var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var browserSync = require('browser-sync');
var rimraf = require('rimraf');
var runSequence = require('run-sequence');
var del = require('del');

var setting = {
  autoprefixer: {
      browser: ['last 2 version', 'ie 9', 'ie 8', 'Android 4.0', 'Android 2.3']
  },
  browserSync: {
    server:{
        baseDir: 'httpdocs',
    },
    // proxy: 'domain.ab'
  },
  path: {
    base: {
      src: 'src',
      dest: 'httpdocs'
    },
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
    js: {
      src: 'src/assets/js/**/*',
      dest: 'httpdocs/assets/js/'
    },
    html: {
      src: ['src/**/*.html', 'src/**/*.php'],
      dest: 'httpdocs/',
    },
    etc: {
      src: 'src/assets/etc/**/*',
      dest: 'httpdocs/assets/etc/',
    },
  }
}

// 画像の圧縮
gulp.task('imagemin', function(){
  var imageminOptions = {
    optimizationLevel: 7
  };

  gulp.src(setting.path.image.src)
    .pipe($.changed(setting.path.image.dest))
    .pipe($.imagemin(imageminOptions))
    .pipe(gulp.dest(setting.path.image.dest))
    .pipe(browserSync.reload({stream: true}));
});

// SASS
gulp.task('scss',function(){
  return gulp.src(setting.path.sass.src)
    .pipe($.plumber({
      errorHandler: $.notify.onError("Error: <%= error.message %>") //<-
    }))
    .pipe($.sass())
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

// JavaScript
gulp.task('js', function(){
  return gulp.src(
    setting.path.js.src
  )
  .pipe($.changed(setting.path.js.dest))
  .pipe(gulp.dest(setting.path.js.dest))
  .pipe(browserSync.reload({stream: true}));
});

// Etc
gulp.task('etc', function(){
  return gulp.src(
    setting.path.etc.src
  )
  .pipe($.changed(setting.path.etc.dest))
  .pipe(gulp.dest(setting.path.etc.dest))
  .pipe(browserSync.reload({stream: true}));
});

// Minify
gulp.task('minify', function(){
  gulp.src(setting.path.js.dest+'**/*.js')
    .pipe($.uglify())
    .pipe(gulp.dest(setting.path.js.dest));

  gulp.src(setting.path.sass.dest+'**/*.css')
    .pipe($.minifyCss())
    .pipe(gulp.dest(setting.path.sass.dest));

});

// Clean
gulp.task('clean', del.bind(null, setting.path.base.dest));

// Build
gulp.task('build', function(){
  return runSequence(
    'clean',
    ['html', 'js', 'scss', 'etc'],
    ['imagemin', 'minify']
    );
});

// Watch
gulp.task('watch', function(){
  browserSync.init(setting.browserSync);

  gulp.watch([setting.path.html.src], ['html']);
  gulp.watch([setting.path.js.src], ['js']);
  gulp.watch([setting.path.sass.src], ['scss']);
  gulp.watch([setting.path.image.src], ['imagemin']);
});

gulp.task('default',['watch']);