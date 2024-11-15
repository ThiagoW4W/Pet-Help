var actual = 0;

function siguiente() {
  var imagenes = document.getElementsByClassName("imagen");

  // Remover la clase "actual" de la imagen visible
  imagenes[actual].classList.remove("actual");

  // Incrementar el índice de la imagen
  actual++;
  if (actual >= imagenes.length) {
    actual = 0; // Volver a la primera imagen si llegamos al final
  }

  // Agregar la clase "actual" a la nueva imagen
  imagenes[actual].classList.add("actual");
}

var velocidad = 5000;
var play = setInterval(siguiente, velocidad);
