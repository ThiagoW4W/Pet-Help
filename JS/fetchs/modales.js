// navbar.js
fetch('../Components/modales.html')
  .then(response => response.text())
  .then(data => document.getElementById('addModalMascotaPerdida').innerHTML = data);

// Pop-Up Mascotas


  