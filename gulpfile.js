const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync');
const concat = require('gulp-concat');
const del = require('del');
const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const svgmin = require('gulp-svgmin');
const svgstore = require('gulp-svgstore');
const twig = require('gulp-twig');
const uglify = require('gulp-uglify-es').default;

gulp.task('twig', async function() {
    gulp.src([
        'source/layout/*.twig',
        'source/layout/blog/**/*.twig'
    ])
      .pipe(twig())
      .pipe(gulp.dest('source/pages/'))
      .pipe(browserSync.reload({ stream: true }))
  });


gulp.task('scss', function () {
    return gulp.src('source/scss/**/style.scss')
        .pipe(sass({ outputStyle: 'compressed' }))
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 8 versions'],
            cascade: false
        }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('source/css'))
        .pipe(browserSync.reload({ stream: true }))
});

gulp.task('css', function () {
    return gulp.src([
        'node_modules/normalize.css/normalize.css',
        'node_modules/animate.css/animate.css'
    ])
        .pipe(concat('libs.scss'))
        .pipe(gulp.dest('source/scss'))
        .pipe(browserSync.reload({ stream: true }))
});

gulp.task('html', function () {
    return gulp.src('source/*.html')
        .pipe(browserSync.reload({ stream: true }))
});

gulp.task('js', function () {
    return gulp.src('source/js/*.js')
        .pipe(browserSync.reload({ stream: true }))
});

gulp.task('libs', function (){
    return gulp.src([
        'node_modules/wow.js/dist/wow.js'
    ])
    .pipe(concat('libs.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('source/js'))
    .pipe(browserSync.reload({ stream: true }))
})

gulp.task('watch', function () {
    gulp.watch('source/**/*.scss', gulp.parallel('scss'));
    gulp.watch('source/*.html', gulp.parallel('html'));
    gulp.watch('source/layout/**/*.twig', gulp.parallel('twig'));
    gulp.watch('source/js/*.js', gulp.parallel('js'));
});

gulp.task('browser-sync', function () {
    browserSync.init({
        server: {
            baseDir: "source/"
        }
    });
});

gulp.task('clean', async function () {
    del.sync('build')
});

gulp.task('export', function () {
    const buildHtml = gulp.src('source/**/*html')
        .pipe(gulp.dest('build'));

    const buildCss = gulp.src('source/css/**/*css')
        .pipe(gulp.dest('build/css'));

    const buildJs = gulp.src('source/js/**/*js')
        .pipe(gulp.dest('build/js'));

    const buildFonts = gulp.src('assets/fonts/**/*.*')
        .pipe(gulp.dest('build/fonts'));

    const icons = gulp.src('source/images/icons/sprite.svg')
        .pipe(gulp.dest('build/images/icons'))
});

gulp.task('images', function () {
    return gulp.src('source/images/*.{png,jpg}')
        .pipe(imagemin([
            imagemin.mozjpeg({ quality: 80, progressive: true }),
            imagemin.optipng({ optimizationLevel: 3 }),
            imagemin.svgo({
                plugins: [
                    { removeViewBox: false },
                    { removeUnusedNS: false },
                    { removeUselessStrokeAndFill: false },
                    { cleanupIDs: false },
                    { removeComments: true },
                    { removeEmptyAttrs: true },
                    { removeEmptyText: true },
                    { collapseGroups: true }
                ]
            })
        ]))
        .pipe(gulp.dest('build/images'))
        .pipe(browserSync.reload({ stream: true }))
});

gulp.task('script', function () {
    return gulp.src('source/js/*.js')
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('source/js/min'))
})

gulp.task('sprite', function () {
    return gulp.src("source/images/icons/*.svg")
        .pipe(svgmin())
        .pipe(svgstore({
            inlineSvg: true,
            removeViewBox: false
        }))
        .pipe(rename("sprite.svg"))
        .pipe(gulp.dest("source/images/icons"))
});

gulp.task('svg', function () {
    return gulp.src('source/images/*.svg')
        .pipe(svgmin())
        .pipe(gulp.dest('build/images'))
});



gulp.task('build', gulp.series('clean', 'images', 'script', 'svg', 'export'));

gulp.task('default', gulp.parallel('twig', 'css', 'scss', 'libs', 'js', 'browser-sync', 'watch'));
