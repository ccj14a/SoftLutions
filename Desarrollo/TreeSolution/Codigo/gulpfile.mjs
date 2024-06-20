import gulp from 'gulp';
import cssmin from 'gulp-cssmin';
import rename from 'gulp-rename';
import uglify from 'gulp-uglify';

import * as glob from 'glob';

// Rutas de tus archivos CSS, JS e imágenes
const paths = {
    css: {
        src: './Frontend/TreeSolution-v3/TreeSolution/Estilos/**/*.css',
        dest: './Backend/public/build/css'
    },
    js: {
        src: './Frontend/TreeSolution-v3/TreeSolution/JS/**/*.js',
        dest: './Backend/public/build/js'
    },
    images: {
        src: './Frontend/TreeSolution-v3/TreeSolution/images/**/*.{jpg,jpeg,png,gif,svg}',
        dest: './Backend/public/build/images'
    }
};

// Tarea para minimizar y mover archivos CSS
function css() {
    const files = glob.sync(paths.css.src);
    console.log('Archivos CSS encontrados:', files);

    return gulp.src(files)
        .pipe(cssmin())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(paths.css.dest));
}

// Tarea para minimizar y mover archivos JS
function js() {
    const files = glob.sync(paths.js.src);
    console.log('Archivos JS encontrados:', files);

    return gulp.src(files)
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(paths.js.dest));
}

/// Tarea para convertir imágenes a WebP
function copyImages() {
    const files = glob.sync(paths.images.src);
    console.log('Archivos de imágenes encontrados:', files);

    return gulp.src(files)
        .pipe(gulp.dest(paths.images.dest));
}

// Tarea para observar cambios en archivos CSS, JS e imágenes
function watching() {
    gulp.watch(paths.css.src, css);
    gulp.watch(paths.js.src, js);
    gulp.watch(paths.images.src);
}

// Definir tareas
export const build = gulp.series(css, js, copyImages);
export const watchTask = watching;
export default gulp.series(css, js, copyImages, watching);