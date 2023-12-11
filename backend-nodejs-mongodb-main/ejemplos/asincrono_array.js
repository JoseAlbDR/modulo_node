'use strict';

function escribeTras2Segundos(texto, callback) {
  setTimeout(function() {
    console.log(texto);
    callback();
  }, 2000)
}

function serie(arr, fn, callback) {
  if (arr.length == 0) {
    // termino el bucle
    callback();
    return;
  }
  fn('texto' + arr.shift(), function() {
    serie(arr, fn, callback)
  })
}

serie([1, 2, 3, 'cuatro', 5], escribeTras2Segundos, function() {
  console.log('fin.');
})
