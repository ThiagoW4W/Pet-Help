   // Obtén el modal y el contenido del modal
   const modal = document.getElementById("modal");
   const modalBody = document.getElementById("modal-body");
   const closeBtn = document.getElementById("close-btn");
 
   // Todas las tarjetas
   const cards = document.querySelectorAll(".img-tarjeta");
   const body = document.body
   // Evento de clic en cada tarjeta
   cards.forEach(card => {
     card.addEventListener("click", function() {
       // Cambia el contenido del modal dinámicamente basado en la tarjeta clicada
      
       
       // Muestra el modal
       modal.style.visibility = "visible";
       modalBody.style.visibility = "visible";
       modalBody.style.display = "grid"
       modal.style.display = "grid"

   
     });
   });
 
   // Cierra el modal cuando se hace clic en el botón de cerrar
   closeBtn.addEventListener("click", function() {
     modalBody.style.visibility = "hidden";
     modal.style.visibility = "hidden";
     body.style.overflow ='visible';
   });
 
   // Cierra el modal si se hace clic fuera del modal
   window.addEventListener("click", function(event) {
     if (event.target === modal  ) {
       modalBody.style.visibility = "hidden";
     modal.style.visibility = "hidden";
     body.style.overflow ='visible';
     }
   });