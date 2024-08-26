// navbar.js
fetch('../Components/navbar.html')
  .then(response => response.text())
  .then(data => document.getElementById('Navbar').innerHTML = data);