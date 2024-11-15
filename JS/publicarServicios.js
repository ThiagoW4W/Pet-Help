// Importar los módulos de Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, doc, getDoc } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-firestore.js";


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

const db = getFirestore(app);

document.getElementById('addDataFormPaseador').addEventListener('submit', async (e) => {
    e.preventDefault();
    console.log("Detecto el evento");

    const nombrePaseador = document.getElementById('nombrePaseador').value;
    const ProvinciaPaseador = document.getElementById('provinciaPaseador').value;
    const LocalidadPaseador = document.getElementById('LocalidadPaseador').value;
    const BarrioPaseador = document.getElementById('BarrioPaseador').value;
    const DisponibildadPaseador = document.getElementById('DisponibildadPaseador').value;
    const ContactoPaseador = document.getElementById('ContactoPaseador').value;
    const CapacidadMAXPaseador = document.getElementById('CapacidadMAXPaseador').value;
    const OrientacionPaseador = document.getElementById('OrientacionPaseador').value;
    const DescpcionPaseador = document.getElementById('DescpcionPaseador').value;
    const TipoAnimalPaseador = document.getElementById('TipoAnimalPaseador').value;
    const fotoInputPaseador = document.getElementById('fotoPaseador');
    let fotoBase64Paseador = "";
    if (fotoInputPaseador.files.length > 0) {
        const file = fotoInputPaseador.files[0];
        fotoBase64Paseador = await convertirABase64(file); // Convierte la imagen a Base64
    }

    try {
        // Agregar el documento a la colección 'Paseadores'
        const docRef = await addDoc(collection(db, 'Paseadores'), {
            nombrePaseador,
            ProvinciaPaseador,
            LocalidadPaseador,
            BarrioPaseador,
            DisponibildadPaseador,
            ContactoPaseador,
            CapacidadMAXPaseador,
            OrientacionPaseador,
            DescpcionPaseador,
            TipoAnimalPaseador,
            fotoPaseador: fotoBase64Paseador,
        });

        console.log("Documento añadido con ID: ", docRef.id);
        alert('Se subió el paseador');

        // Cerrar el modal y resetear el formulario
        document.getElementById('addModalPaseador').close();
        document.getElementById('addDataFormPaseador').reset();

        crearBotonPaseador(docRef.id, nombrePaseador, DescpcionPaseador);
    } catch (error) {
        console.error("Error al añadir documento: ", error);
        alert(error);
    }
}); 

function convertirABase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

async function crearBotonPaseador(docId, nombrePaseador, DescpcionPaseador) {
    const divContainer = document.createElement('div'); //Crea un div
    divContainer.classList.add('tarjeta'); //Le pone la clase tarjeta
    const button = document.createElement('button'); //Crea un botón
    button.classList.add('boton-paseador-nuevo');  // Agregar clase al botón
    document.getElementById('tarjetaPaseador').appendChild(divContainer); // Agregar el div a la sección de paseadores
    divContainer.appendChild(button); // Agregar botón dentro del div
    
    const imagenDelBoton = document.createElement('img');  // Crea el  img
    imagenDelBoton.setAttribute('data-id-Paseador', docId);  // Usar un atributo único como 'data-id'
    button.appendChild(imagenDelBoton);  // Agrega la imagen al botón

    const titulo = document.createElement('h2');
    titulo.textContent = nombrePaseador;
    divContainer.appendChild(titulo);

    const subtitulo = document.createElement('p');
    subtitulo.textContent = DescpcionPaseador;
    divContainer.appendChild(subtitulo);
//Poner la imagen de la BD en imagenDelBoton
const docRef = doc(db, 'Paseadores', docId);
const docSnap = await getDoc(docRef);

if (docSnap.exists()) {
    const data = docSnap.data();
    
    
    // Aquí, en lugar de `document.getElementById('imagenDelBoton')`, usas `data-id`
    const imagenElemento = button.querySelector('[data-id-Paseador="' + docId + '"]');
    
    if (imagenElemento) {
        imagenElemento.src = data.fotoPaseador || '';  // Agregar la imagen al botón
    }

    
}
    button.onclick = async () => {
        // Mostrar el modal con los datos del paseador
        await ObtenerYrellenarPaseador(docId);
    };
}

async function ObtenerYrellenarPaseador(docId) {
    try {
        const docRef = doc(db, 'Paseadores', docId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const data = docSnap.data(); // Guarda los datos en la constante data una vez y reutilízala

            // Rellena los elementos HTML con los datos del documento
            document.getElementById('remplazarnombrePaseador').textContent = data.nombrePaseador || 'No disponible';
            document.getElementById('remplazarProvinciaPaseador').textContent = data.ProvinciaPaseador || 'No disponible';
            document.getElementById('remplazarLocalidadPaseador').textContent = data.LocalidadPaseador || 'No disponible';
            document.getElementById('remplazarBarrioPaseador').textContent = data.BarrioPaseador || 'No disponible';
            document.getElementById('remplazarDisponibildadPaseador').textContent = data.DisponibildadPaseador || 'No disponible';
            document.getElementById('remplazarContactoPaseador').textContent = data.ContactoPaseador || 'No disponible';
            document.getElementById('remplazarCapacidadMAXPaseador').textContent = data.CapacidadMAXPaseador || 'No disponible';
            document.getElementById('remplazarOrientacionPaseador').textContent = data.OrientacionPaseador || 'No disponible';
            document.getElementById('remplazarDescpcionPaseador').textContent = data.DescpcionPaseador || 'No disponible';
            document.getElementById('remplazarTipoAnimalPaseador').textContent = data.TipoAnimalPaseador || 'No disponible';

            // Rellena la imagen del paseador si data.foto está disponible
            document.getElementById('remplazarfotoPaseador').src = data.fotoPaseador || 'No disponible';

            // Abre el modal si está disponible
            const modal = document.getElementById("verPaseador");
            if (modal) {
                document.body.classList.add('modal-open');
                modal.showModal();
            } else {
                console.error("No se encontró el elemento modal.");
            }
        } else {
            console.log("No se encontró el documento.");
        }
    } catch (error) {
        console.error("Error al obtener documento: ", error);
    }
}

async function refrescarPaseadores() {
    const querySnapshot = await getDocs(collection(db, 'Paseadores'));
    querySnapshot.forEach((doc) => {
        const data = doc.data();
        crearBotonPaseador(doc.id, data.nombrePaseador, data.DescpcionPaseador);
    });
}
refrescarPaseadores();

//CUIDADORES

document.getElementById('addDataFormCuidador').addEventListener('submit', async (e) => {
    e.preventDefault();

    const nombreCuidador = document.getElementById('nombreCuidador').value;
    const provinciaCuidador = document.getElementById('provinciaCuidador').value;
    const localidadCuidador = document.getElementById('LocalidadCuidador').value;
    const barrioCuidador = document.getElementById('BarrioCuidador').value;
    const disponibilidadCuidador = document.getElementById('DisponibildadCuidador').value;
    const contactoCuidador = document.getElementById('ContactoCuidador').value;
    const capacidadMaxCuidador = document.getElementById('CapacidadMAXCuidador').value;
    const orientacionCuidador = document.getElementById('OrientacionCuidador').value;
    const descripcionCuidador = document.getElementById('DescpcionCuidador').value;
    const tipoAnimalCuidador = document.getElementById('TipoAnimalCuidador').value;
    const fotoInputCuidador = document.getElementById('fotoCuidador');
    let fotoBase64Cuidador = "";

    if (fotoInputCuidador.files.length > 0) {
        const file = fotoInputCuidador.files[0];
        fotoBase64Cuidador = await convertirABase64(file); // Convierte la imagen a Base64
    }

    try {
        const docRef = await addDoc(collection(db, 'Cuidadores'), {
            nombreCuidador,
            provinciaCuidador,
            localidadCuidador,
            barrioCuidador,
            disponibilidadCuidador,
            contactoCuidador,
            capacidadMaxCuidador,
            orientacionCuidador,
            descripcionCuidador,
            tipoAnimalCuidador,
            fotoCuidador: fotoBase64Cuidador,
        });

        alert('Se subió el cuidador');
        document.getElementById('addModalCuidador').close();
        document.getElementById('addDataFormCuidador').reset();
        crearBotonCuidador(docRef.id, nombreCuidador, descripcionCuidador);
    } catch (error) {
        console.error("Error al añadir documento: ", error);
        alert(error);
    }
});



async function crearBotonCuidador(docId, nombreCuidador, descripcionCuidador) {
    const divContainer = document.createElement('div');
    divContainer.classList.add('tarjeta');
    const button = document.createElement('button');
    button.classList.add('boton-cuidador-nuevo');
    document.getElementById('tarjetaCuidador').appendChild(divContainer);
    divContainer.appendChild(button);

    const imagenDelBoton = document.createElement('img');
    imagenDelBoton.setAttribute('data-id-Cuidador', docId);
    button.appendChild(imagenDelBoton);

    const titulo = document.createElement('h2');
    titulo.textContent = nombreCuidador;
    divContainer.appendChild(titulo);

    const subtitulo = document.createElement('p');
    subtitulo.textContent = descripcionCuidador;
    divContainer.appendChild(subtitulo);

    const docRef = doc(db, 'Cuidadores', docId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        const data = docSnap.data();
        const imagenElemento = button.querySelector('[data-id-Cuidador="' + docId + '"]');
        if (imagenElemento) {
            imagenElemento.src = data.fotoCuidador || '';
        }
    }

    button.onclick = async () => {
        await obtenerYrellenarCuidador(docId);
    };
}

async function obtenerYrellenarCuidador(docId) {
    try {
        const docRef = doc(db, 'Cuidadores', docId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const data = docSnap.data();
            document.getElementById('remplazarnombreCuidador').textContent = data.nombreCuidador || 'No disponible';
            document.getElementById('remplazarProvinciaCuidador').textContent = data.provinciaCuidador || 'No disponible';
            document.getElementById('remplazarLocalidadCuidador').textContent = data.localidadCuidador || 'No disponible';
            document.getElementById('remplazarBarrioCuidador').textContent = data.barrioCuidador || 'No disponible';
            document.getElementById('remplazarDisponibildadCuidador').textContent = data.disponibilidadCuidador || 'No disponible';
            document.getElementById('remplazarContactoCuidador').textContent = data.contactoCuidador || 'No disponible';
            document.getElementById('remplazarCapacidadMAXCuidador').textContent = data.capacidadMaxCuidador || 'No disponible';
            document.getElementById('remplazarOrientacionCuidador').textContent = data.orientacionCuidador || 'No disponible';
            document.getElementById('remplazarDescpcionCuidador').textContent = data.descripcionCuidador || 'No disponible';
            document.getElementById('remplazarTipoAnimalCuidador').textContent = data.tipoAnimalCuidador || 'No disponible';
            document.getElementById('remplazarfotoCuidador').src = data.fotoCuidador || '';

            const modal = document.getElementById("verCuidador");
            if (modal) {
                document.body.classList.add('modal-open');
                modal.showModal();
            } else {
                console.error("No se encontró el elemento modal.");
            }
        } else {
            console.log("No se encontró el documento.");
        }
    } catch (error) {
        console.error("Error al obtener documento: ", error);
    }
}

async function refrescarCuidadores() {
    const querySnapshot = await getDocs(collection(db, 'Cuidadores'));
    querySnapshot.forEach((doc) => {
        const data = doc.data();
        crearBotonCuidador(doc.id, data.nombreCuidador, data.descripcionCuidador);
    });
}
refrescarCuidadores();