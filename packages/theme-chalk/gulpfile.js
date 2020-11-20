'use strict'

const gulp = require('gulp')
const sass = require('gulp-sass')
const autoprefixer = require('gulp-autoprefixer')
const cssmin = require('gulp-cssmin')
const concat = require('gulp-concat')
const clean = require('gulp-clean')

/**
 * 清除编译的css
 * @returns
 */
function cleanScss() {
  return gulp.src('./lib/*.css').pipe(clean({ force: true }))
  // .pipe(gulp.dest('./tmp'))
}

function concatScss() {
  return gulp
    .src(['./src/*.scss', '!./src/index.scss'])
    .pipe(concat('index.scss'))
    .pipe(gulp.dest('./src/'))
}

function compile() {
  return gulp
    .src(['./src/*.scss', '!./src/variable.scss'])
    .pipe(sass.sync())
    .pipe(
      autoprefixer({
        browsers: ['ie > 9', 'last 5 versions', '> 1%'],
        cascade: false
      })
    )
    .pipe(cssmin())
    .pipe(gulp.dest('./lib'))
}

function cpScssToLib() {
  return gulp.src(['./src/**/*.scss']).pipe(gulp.dest('./lib/theme'))
}

/**
 * 字体图标由于渲染字体在各个系统的差异，已经过时了，此处建议使用svg图标，不再编译字体图标
 * @returns
 */
// eslint-disable-next-line no-unused-vars
function copyfont() {
  return gulp
    .src('./src/fonts/**')
    .pipe(cssmin())
    .pipe(gulp.dest('./lib/fonts'))
}

// exports.build = gulp.series(compile, copyfont)
exports.build = gulp.series(cleanScss, concatScss, compile, cpScssToLib)
