const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const clean = require('gulp-clean');
const rebaseUrls = require('gulp-css-rebase-urls');
const urlAdjuster = require('gulp-css-url-adjuster');
const gulpIf = require('gulp-if');
const webpack = require('webpack-stream');


const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';

gulp.task('images-clean-dist', () =>
gulp.src('./public/dist/images', {read: false})
    .pipe(clean())
);

gulp.task('styles-clean-dist', () =>
    gulp.src('./public/dist/styles', {read: false})
        .pipe(clean())
);

gulp.task('images', ['images-clean-dist'], () =>
gulp.src('./src/images/**/*')
    .pipe(gulp.dest('./public/dist/images'))
);

gulp.task('images:watch', ['images'],  () =>
gulp.watch('./src/images/**/*', ['images-clean-dist', 'images'])
);

gulp.task('sass', () =>
gulp.src('./src/styles/default.scss')
    .pipe(gulpIf(isDevelopment, sourcemaps.init()))
    .pipe(sass().on('error', sass.logError))
    .pipe(urlAdjuster({
        replace: ['../../../../images/icons', '../images/icons'],

    }))
    .pipe(urlAdjuster({
        replace: ['../../images/icons', '../images/icons'],

    }))
    .pipe(gulpIf(isDevelopment, sourcemaps.write('./')))
    .pipe(gulp.dest('./public/dist/styles'))
);

gulp.task('sass:watch', ['sass'], () =>
gulp.watch('./src/styles/**/*.scss', ['styles-clean-dist', 'sass'])
);


gulp.task('scripts-clean-dist', () =>
    gulp.src('./public/dist/scripts', {read: false})
        .pipe(clean())
);

gulp.task('webpack', () =>
    gulp.src('./src/scripts/main.js')
        .pipe(webpack(require('./webpack.config.js')))
        .pipe(gulp.dest('public/dist/scripts'))
);

gulp.task('webpack:watch', ['webpack'], () =>
    gulp.watch('./src/scripts/**/*.js', ['scripts-clean-dist', 'webpack'])
);


// common
gulp.task('build', ['styles-clean-dist', 'sass',
                    'images-clean-dist', 'images',
                    'scripts-clean-dist', 'webpack']);
gulp.task('default', ['sass:watch', 'images:watch', 'webpack:watch']);