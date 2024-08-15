/**
 * JS para la gestion de datos
 * 
 */

//Definicion de variables
var nombre;
var email;
var tipoUsuario;
var provincia;


//Funciones

//Almacenar datos de usuario en memoria de la sesion
function datosUsuario(nombre,email,tipoUsuario,provincia){
    sessionStorage.setItem('nombre', nombre.value)
    sessionStorage.setItem('email', email.value)
    sessionStorage.setItem('tipoUsuario', tipoUsuario.value)
    sessionStorage.setItem('provincia', provincia.value)
}
//Visualizar los valores de los elementos de HTML
function getDatosUsuarios (){ 
    nombre = sessionStorage.getItem ('nombre'); //Muestra el item indicado (creado previamente)
    email = sessionStorage.getItem ('email'); //Muestra el item indicado (creado previamente)
    tipoUsuario = sessionStorage.getItem ('tipoUsuario'); //Muestra el item indicado (creado previamente)
    provincia = sessionStorage.getItem ('provincia');
}
//Comprobar si el usuario relleno los campos indicados, de ser false no deja avanzar en *juego.js*
function comprobardatosUser() {
    if (nombre==null){
        sessionStorage.setItem('error', 'Error de comprobacion de datos')
        //Almacenamos en memoria el error
        return false;
    }
    return true
}