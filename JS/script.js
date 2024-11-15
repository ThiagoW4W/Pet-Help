function volverInicio() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
console.log('Hola funciono')


// Importar los módulos de Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, doc, getDoc } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-firestore.js";
import {  getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-auth.js";


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
const db = getFirestore(app);
// Función para verificar si el usuario está registrado en la base de datos
async function verificarUsuarioRegistrado() {
    onAuthStateChanged(auth, async (user) => {
        if (user) {
            const uid = user.uid; // Obtener el UID del usuario autenticado
            const docRef = doc(db, "usuarios", uid); 
            const docSnap = await getDoc(docRef);
            console.log(uid);
            

            if (!docSnap.exists()) {
                // Si el UID no en la bd va página de inicio de sesión
                window.location.href = "../inciarsesion.html";
            }
        } else {
            // Si no hay un usuario autenticado, va a iniciar sesión
            window.location.href = "../inciarsesion.html";
        }
    });
} 
verificarUsuarioRegistrado();