import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-app.js";
import { getAuth, sendEmailVerification, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-firestore.js";

// Configuración de Firebase (Lo q te pasa la pagina)
const firebaseConfig = {
    apiKey: "AIzaSyCRB7vXByfKfEcPq4By_yZxpAuBafg2jII",
    authDomain: "pet-help-59290.firebaseapp.com",
    projectId: "pet-help-59290",
    storageBucket: "pet-help-59290.firebasestorage.app",
    messagingSenderId: "571022010836",
    appId: "1:571022010836:web:3c0cd01f953a00eb97ce41"
  };
console.log('Entro al JS');

const app = initializeApp(firebaseConfig); // Inicializar Firebase con la config
const auth = getAuth(app); // Servicio para autentificar usuario
const db = getFirestore(app); // Servicio para guardar datos

// Evento de registro
const registro = document.getElementById('registro'); //Traemos el boton 
registro.addEventListener('click', async (e) => { //Cuando se detecta el evnto click 
    event.preventDefault()
    console.log('Detecto el evento');
    var email = document.getElementById('emailReg').value; 
    var contra = document.getElementById('contraReg').value; 
    var tipoUsuario = document.getElementById('tipoUsuarioOpcion').value; 
    var provincia = document.getElementById('provinciaOpcion').value;
    var nombre = document.getElementById('nombre').value;  
    var apellido = document.getElementById('apellido').value;//Traemos los valores que se ingreso en los inputs
    var esPaseador = false;
    var esUsuarioNormal = false;
    var esVeterinaria = false;
    
    if (tipoUsuario === 'Paseador/a"') {
        esPaseador = true;
    } else if (tipoUsuario === 'Usuario') {
        esUsuarioNormal = true;
    } else if (tipoUsuario === 'Organizaciones/Veterinaria') {
        esVeterinaria = true;
    }
    if (  provincia != '' && tipoUsuario != '' && email != '' && contra != '' && nombre != ''&& apellido != '') {
        console.log('Los campos no estan vacios');
        try {
            console.log('Entro al try');
            
            const credencial = await createUserWithEmailAndPassword(auth, email, contra) //Fucncion para crear user con email y contra 

            alert("Usuario Creado"); //Mostramos por pantalla
            await setDoc(doc(db, 'usuarios', credencial.user.uid),{               
                email:email,
                provincia:provincia,
                apellido:apellido,
                nombre:nombre,
                Paseador: esPaseador,
                UsuarioNormal: esUsuarioNormal,
                Veterinaria: esVeterinaria
            })

            await sendEmailVerification(auth.currentUser)//Funcion para enviar correo de verificacion
            alert('Se envió un correo de verificación');//Mostramos por pantalla
    
        
            }catch(error) { //En caso de error
                const errorCode = error.code; 
                if (errorCode == 'auth/email-already-in-use')
                    alert("El correo ya está en uso");
                else if (errorCode == 'auth/invalid-email')
                    alert("El correo no es válido");
                else if (errorCode == 'auth/weak-password')
                    alert("La contraseña debe tener al menos 6 caracteres");
            }; // Mostramos por pantalla el mensaje segun tipo de error
    }
else console.log('los campos estan vacios');

});
