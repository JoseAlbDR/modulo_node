'use strict';

function suma(a, b, acelgas) {
  // hace algo que tarda mucho
  const lasuma = a + b;
  acelgas(lasuma)
}

const resultado = suma(2, 3, function(resultado) {
  console.log(resultado);
});
