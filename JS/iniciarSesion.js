import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-app.js";
import { sendEmailVerification, getAuth, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-auth.js";

// Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCRB7vXByfKfEcPq4By_yZxpAuBafg2jII",
    authDomain: "pet-help-59290.firebaseapp.com",
    projectId: "pet-help-59290",
    storageBucket: "pet-help-59290.firebasestorage.app",
    messagingSenderId: "571022010836",
    appId: "1:571022010836:web:3c0cd01f953a00eb97ce41"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Agregar el evento para el botón de login
document.getElementById('iniciarSesion').addEventListener('click', (e) => {
    e.preventDefault(); // Evita que el formulario se envíe automáticamente
    
    const email = document.getElementById('emailLog').value;
    const contra = document.getElementById('contraLogin').value;
    
    signInWithEmailAndPassword(auth, email, contra).then((cred) => {
        alert("Sesión iniciada");
        
        // Verificación de email
        if (cred.user.emailVerified) {
            // Si el correo está verificado, redirige a la página deseada
            window.location.href = 'publiacion.html';
        } else {
            // Si no está verificado, cierra sesión y ofrece enviar el email de verificación
            auth.signOut()
                .then(() => {
                    alert('Por favor, verifica tu correo antes de iniciar sesión.');
                })
                .catch(error => {
                    console.error('Error al cerrar sesión:', error);
                });
        }
        
    }).catch((error) => {
        const errorCode = error.code;
        if (errorCode === 'auth/invalid-email') {
            alert("El correo no es válido");
        } else if (errorCode === 'auth/wrong-password') {
            alert("La contraseña no es correcta");
            console.log('Contraseña incorrecta');
        } else if (errorCode === 'auth/user-not-found') {
            alert("Usuario no encontrado");
        } else {
            alert("Error desconocido al intentar iniciar sesión");
            console.error("Error:", error);
        }
    });
});
