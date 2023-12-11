'use strict';

function escribeTras2Segundos(texto, callback) {
  setTimeout(function() {
    console.log(texto);
    callback();
  }, 2000)
}

function serie(n, fn, callback) {
  if (n == 0) {
    // termino el bucle
    callback();
    return;
  }
  n = n - 1;
  fn('texto' + n, function() {
    serie(n, fn, callback)
  })
}

serie(6, escribeTras2Segundos, function() {
  console.log('fin.');
})
