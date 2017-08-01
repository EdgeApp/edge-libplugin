#!/usr/bin/env node

const gulp = require('gulp')
const inline = require('gulp-inline')
const argv = require('yargs')
  .default({ s: 'src', o: 'build' }).argv

function airbitzify (finished) {
  gulp.src('./' + argv.s + '/index.html')
    .pipe(inline({
      base: argv.s
    }))
    .pipe(gulp.dest(argv.o))
}

airbitzify(function () {
  console.log('All finished')
})
