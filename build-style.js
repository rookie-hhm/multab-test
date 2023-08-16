import path from 'path'
import gulpSass from 'gulp-sass'
import dartSass from 'sass'
import { fileURLToPath } from 'url'
import gulp from 'gulp'
const sass = gulpSass(dartSass)
const componentPath = path.dirname(path.resolve(fileURLToPath(import.meta.url)))
console.log(componentPath, 'componentPath')

export const buildStyle = () => {
  return gulp.src(`${componentPath}/src/**/**.scss`)
    .pipe(sass.sync())
    // .pipe(autoprefixer())
    .pipe(gulp.dest(`${componentPath}/dist/lib`))
    .pipe(gulp.dest(`${componentPath}/dist/es`));
};

const build = gulp.series(buildStyle)

export default build