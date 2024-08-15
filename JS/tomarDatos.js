/** 
 * JS para el tomar los datos de usuarios y comprobar errores
 * 
 */

//Tomar datos
const nombreInput = document.getElementById('nombre')
const emailInput = document.getElementById('email')
const tipoUsuarioInput = document.getElementById('tipoUsuario')
const provincianput = document.getElementById('provincia')
const error = document.getElementById('error') 


//Funcioens de eventos 

function comprobarForm (event) {
    if (nombreInput.value.match(/(?<!\S)[0-9]/)){
        nombreInput.focus();//El cursor se coloca donde esta el problema
        error.innerText='Debes escribir un nombre. No puede empezar con un numero' //Se le agrega el mensaje a error
        event.preventDefault() //Cancela el evento si este es cancelable
        return false;//Buena practica usada cuando son entradas incorrectas
    }
    else if (tipoUsuarioInput.value=='0'){
        error.innerText='Debes elegir un tipo de usuario' //Se le agrega el mensaje a error
        event.preventDefault() //Cancela el evento si este es cancelable
        return false;//Buena practica usada cuando son entradas incorrectas
    }
    else if (provincianput.value=='0'){
        error.innerText='Debes elegir una provincia' //Se le agrega el mensaje a error
        event.preventDefault() //Cancela el evento si este es cancelable
        return false;//Buena practica usada cuando son entradas incorrectas
    }
    datosUsuario(nombreInput,emailInput,tipoUsuarioInput.provincianput)
    return true;
}
formInicio.addEventListener('submit',comprobarForm);

