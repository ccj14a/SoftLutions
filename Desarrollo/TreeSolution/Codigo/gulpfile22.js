const { src, dest, watch, series } = require('gulp')
// const gulp = require('gulp');
const cssmin = require('gulp-cssmin');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');
const glob = require('glob');

// Ruta de tus archivos CSS
const paths = {
    css: {
      src: [
        './Frontend/TreeSolution-v3/TreeSolution/Estilos/Inicio.css',
        './Frontend/TreeSolution-v3/TreeSolution/Estilos/Dashboard.css',
        './Frontend/TreeSolution-v3/TreeSolution/Estilos/Login.css',
        './Frontend/TreeSolution-v3/TreeSolution/Estilos/CrearCuenta.css',
        './Frontend/TreeSolution-v3/TreeSolution/Estilos/Dashboard_admin.css'
      ],
      dest: './Backend/public/build/css'
    },

    js: {
      src: [
        './Frontend/TreeSolution-v3/TreeSolution/JS/Inicio.js',
        './Frontend/TreeSolution-v3/TreeSolution/JS/Dashboard.js',
        './Frontend/TreeSolution-v3/TreeSolution/JS/Dashboard_admin.js',
        './Frontend/TreeSolution-v3/TreeSolution/JS/Login.js',
        './Frontend/TreeSolution-v3/TreeSolution/JS/NuevoRegistro.js'
      ],
      dest: './Backend/public/build/js'
    },
    images: {
      src: './Frontend/TreeSolution-v3/TreeSolution/images/**/*.{jpg,jpeg,png,gif,svg}',
      dest: './Backend/public/build/images'
    }
  };

// Minimizar y mover archivos CSS
function css() {
    return src(paths.css.src)
      .pipe(cssmin())
      .pipe(rename({ suffix: '.min' }))
      .pipe(dest(paths.css.dest));
  }

// Minimizar y mover archivos JS
function js() {

  return src(paths.js.src)
      .pipe(uglify())
      .pipe(rename({ suffix: '.min' }))
      .pipe(dest(paths.js.dest));
}  

// Tarea para optimizar y mover archivos de imágenes
function images() {
  const files = sync(paths.images.src);
  //console.log('Archivos de imágenes encontrados:', files);

  return src(files)
      .pipe(imagemin())
      .pipe(dest(paths.images.dest));
}

function watching() {
  watch(paths.css.src, css);
  watch(paths.js.src, js);
  watch(paths.images.src, images);
}
  
  exports.css = css;
  exports.js = js;
  exports.images= images;
  exports.watch= watching;
  exports.default = series(css, watching, js, images );