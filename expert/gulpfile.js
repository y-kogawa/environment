var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var browserSync = require('browser-sync');
var runSequence = require('run-sequence');
var del = require('del');

var setting = {
  autoprefixer: {
      browser: ['last 2 version', 'ie 9', 'ie 8', 'Android 4.0', 'Android 2.3']
  },
  browserSync: {
    // 使わない方はコメントアウトする
    // proxy: 'environment.yk',
    server:{
        baseDir: 'httpdocs',
    },
  },
  imagemin: {
    disabled: false,  // falseでimageminを実行
    level: 7
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
    lib: {
      src: 'src/assets/lib/**/*',
      dest: 'httpdocs/assets/lib/',
    },
    include: {
      src: 'src/assets/include/**/*',
      dest: 'httpdocs/assets/include/',
    },
    etc: {
      src: 'src/assets/etc/**/*',
      dest: 'httpdocs/assets/etc/',
    },
    html: {
      src: ['src/**/*', '!src/assets/**/*']
    },
  }
}

// 画像の圧縮
gulp.task('imagemin', function(){
  if(!setting.imagemin.disabled){
    var imageminOptions = {
      optimizationLevel: setting.imagemin.lebel
    };

    gulp.src(setting.path.image.src)
      .pipe($.changed(setting.path.image.dest))
      .pipe($.imagemin(imageminOptions))
      .pipe(gulp.dest(setting.path.image.dest))
      .pipe(browserSync.reload({stream: true}));
  }
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

// Lib
gulp.task('lib', function(){
  return gulp.src(
    setting.path.lib.src
  )
  .pipe($.changed(setting.path.lib.dest))
  .pipe(gulp.dest(setting.path.lib.dest))
  .pipe(browserSync.reload({stream: true}));
});

// Include
gulp.task('include', function(){
  return gulp.src(
    setting.path.include.src
  )
  .pipe($.changed(setting.path.include.dest))
  .pipe(gulp.dest(setting.path.include.dest))
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
    .pipe($.csso())
    .pipe(gulp.dest(setting.path.sass.dest));

});

// Clean
gulp.task('clean', del.bind(null, setting.path.base.dest));

// Build
gulp.task('build', function(){
  return runSequence(
    'clean',
    ['html', 'js', 'scss', 'lib', 'include', 'etc'],
    ['imagemin', 'minify']
    );
});

// Watch
gulp.task('watch', function(){
  browserSync.init(setting.browserSync);

  gulp.watch([setting.path.sass.src], ['scss']);
  gulp.watch([setting.path.js.src], ['js']);
  gulp.watch([setting.path.lib.src], ['lib']);
  gulp.watch([setting.path.include.src], ['include']);
  gulp.watch([setting.path.etc.src], ['etc']);
  gulp.watch([setting.path.html.src], ['html']);
  gulp.watch([setting.path.image.src], ['imagemin']);
});

gulp.task('default',['watch']);