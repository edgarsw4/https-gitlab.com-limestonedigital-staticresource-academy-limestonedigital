const gulp = require('gulp');

const sass       = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const babel      = require('gulp-babel');
const eslint     = require('gulp-eslint');
const uglify     = require('gulp-uglify');
const concat     = require('gulp-concat');
const log        = require('fancy-log');
const rollup     = require('gulp-rollup');
const nodeResolve = require('@rollup/plugin-node-resolve').nodeResolve;

sass.compiler = require('node-sass');

const paths = {
    styles: {
        src: 'sass/**/*.scss',
        dest: '../build/styles/',
    },
    scripts: {
        src: 'js/**/*.js',
        dest: '../build/js/',
    },
};

function js_lint(){
    return gulp.src(['js/customization.js', 'js/components/**/*.js'])
        .pipe( eslint() )
        .pipe( eslint.format() );
}

function js_compile(){
	return gulp.src(paths.scripts.src)
        .pipe(sourcemaps.init())
        .pipe(rollup({
            // rollup: require('rollup'),
            output: {
                format: 'umd',
            },
            // allowRealFiles: true,
            input: 'js/customization.js',
            // plugins: [nodeResolve()],
        }))
        .pipe(babel({
            presets: ['@babel/env'],
        }))
        .pipe(uglify())
        .pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(paths.scripts.dest))
		.on('error', log.error);
}


function combile_libs_js(){
	return gulp.src([
            'js/intlTelInput.min.js',
		])
		.pipe(concat('libs.js'))
		.pipe(gulp.dest(paths.scripts.dest))
		.on('error', log.error);
}



function styles() {
    return gulp.src(paths.styles.src)
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(paths.styles.dest));
}


function watchAll() {
    gulp.watch(paths.styles.src, styles);
    gulp.watch(paths.scripts.src, gulp.parallel(combile_libs_js, js_compile, js_lint));
}

/*
 * You can use CommonJS `exports` module notation to declare tasks
 */
exports.watch = watchAll;
exports.lint  = js_lint;
exports.build = gulp.series(styles, gulp.parallel(combile_libs_js, js_compile, js_lint));
