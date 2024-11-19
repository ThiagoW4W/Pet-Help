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
document.getElementById('addDataFormVeterinaria').addEventListener('submit', async (e) => {
    e.preventDefault();
    console.log("Detecto el evento de veterinaria");

    // Obtener los datos del formulario
    const nombreVeterinaria = document.getElementById('nombreVeterinaria').value;
    const provinciaVeterinaria = document.getElementById('provinciaVeterinaria').value;
    const localidadVeterinaria = document.getElementById('localidadVeterinaria').value;
    const ubicacionVeterinaria = document.getElementById('ubicacionVeterinaria').value;
    const disponibildadVeterinaria = document.getElementById('disponibildadVeterinaria').value;
    const ContactoVeterinaria = document.getElementById('ContactoVeterinaria').value;
    const EspecialidadVeterinaria = document.getElementById('EspecialidadVeterinaria').value;
    const DescpcionVeterinaria = document.getElementById('DescpcionVeterinaria').value;

    const fotoInputVeterinaria = document.getElementById('fotoVeterinaria');
    let fotoBase64Veterinaria = "";
    if (fotoInputVeterinaria.files.length > 0) {
        const file = fotoInputVeterinaria.files[0];
        fotoBase64Veterinaria = await convertirABase64(file);
    }

    try {
        // Agregar el documento a la colección 'Veterinarias'
        const docRef = await addDoc(collection(db, 'Veterinaria'), {
            nombreVeterinaria,
            provinciaVeterinaria,
            localidadVeterinaria,
            ubicacionVeterinaria,
            disponibildadVeterinaria,
            ContactoVeterinaria,
            EspecialidadVeterinaria,
            DescpcionVeterinaria,
            fotoVeterinaria: fotoBase64Veterinaria,
        });
        console.log("Veterinaria añadida con ID: ", docRef.id);
        alert('Se agregó la veterinaria correctamente.');

        // Cerrar el modal y resetear el formulario
        document.getElementById('addModalVeterinaria').close();
        document.getElementById('addDataFormVeterinaria').reset();

        // Crear el botón dinámico
        crearBotonVeterinaria(docRef.id, nombreVeterinaria, EspecialidadVeterinaria);
    } catch (error) {
        console.error("Error al añadir veterinaria: ", error);
        alert(error);
    }
});

async function crearBotonVeterinaria(docId, nombreVeterinaria, EspecialidadVeterinaria) {
    const divContainer = document.createElement('div');
    divContainer.classList.add('tarjeta');
    const button = document.createElement('button');
    button.classList.add('boton-mascota-nueva');
    document.getElementById('tarjetaVeterinaria').appendChild(divContainer);
    divContainer.appendChild(button);

    const imagenDelBoton = document.createElement('img');
    imagenDelBoton.setAttribute('data-id-veterinaria', docId);
    button.appendChild(imagenDelBoton);

    const titulo = document.createElement('h2');
    titulo.textContent = nombreVeterinaria;
    divContainer.appendChild(titulo);

    const subtitulo = document.createElement('p');
    subtitulo.textContent = EspecialidadVeterinaria;
    divContainer.appendChild(subtitulo);

    // Poner la imagen de la BD en imagenDelBoton
    const docRef = doc(db, 'Veterinaria', docId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        const data = docSnap.data();
        const imagenElemento = button.querySelector('[data-id-veterinaria="' + docId + '"]');
        if (imagenElemento) {
            imagenElemento.src = data.fotoVeterinaria || '';
        }
    }

    button.onclick = async () => {
        await obtenerYRellenarVeterinaria(docId);
    };
}

async function obtenerYRellenarVeterinaria(docId) {
    try {
        const docRef = doc(db, 'Veterinaria', docId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const data = docSnap.data();

            document.getElementById('remplazarnombreVeterinaria').textContent = data.nombreVeterinaria || 'No disponible';
            document.getElementById('remplazarProvinciaVeterinaria').textContent = data.provinciaVeterinaria || 'No disponible';
            document.getElementById('remplazarLocalidadVeterinaria').textContent = data.localidadVeterinaria || 'No disponible';
            document.getElementById('remplazarBarrioVeterinaria').textContent = data.ubicacionVeterinaria || 'No disponible';
            document.getElementById('remplazarDisponibildadVeterinaria').textContent = data.disponibildadVeterinaria || 'No disponible';
            document.getElementById('remplazarContactoVeterinaria').textContent = data.ContactoVeterinaria || 'No disponible';
            document.getElementById('remplazarOrientacionVeterinaria').textContent = data.EspecialidadVeterinaria || 'No disponible';
            document.getElementById('remplazarDescpcionVeterinaria').textContent = data.DescpcionVeterinaria || 'No disponible';

            const fotoElement = document.getElementById('remplazarfotoVeterinaria');
            if (fotoElement) {
                fotoElement.src = data.fotoVeterinaria || '/Imagenes/img-tarjeta-Veterinaria.jpg';
            }

            const modal = document.getElementById("verVeterinaria");
            if (modal) {
                document.body.classList.add('modal-open');
                modal.showModal();
            } else {
                console.error("No se encontró el modal.");
            }
        } else {
            console.log("No se encontró la veterinaria.");
        }
    } catch (error) {
        console.error("Error al obtener veterinaria: ", error);
    }
}


async function cargarVeterinarias() {
    const querySnapshot = await getDocs(collection(db, 'Veterinaria'));
    querySnapshot.forEach((doc) => {
        const data = doc.data();
        crearBotonVeterinaria(doc.id, data.nombre, data.especialidad);
    });
}
function convertirABase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

// Llamar a cargarVeterinarias al inicio
cargarVeterinarias();

//ORGANIZACIONES


// Escucha el evento de envío del formulario de organización
document.getElementById('addDataFormOrganizacion').addEventListener('submit', async (e) => {
    e.preventDefault();
    console.log("Evento detectado");

    // Obtener valores del formulario
    const nombreOrganizacion = document.getElementById('nombreOrganizacion').value;
    const provinciaOrganizacion = document.getElementById('provinciaOrganizacion').value;
    const localidadOrganizacion = document.getElementById('LocalidadOrganizacion').value;
    const disponibilidadOrganizacion = document.getElementById('DisponibildadOrganizacion').value;
    const contactoOrganizacion = document.getElementById('ContactoOrganizacion').value;
    const orientacionOrganizacion = document.getElementById('OrientacionOrganizacion').value;
    const descripcionOrganizacion = document.getElementById('DescpcionOrganizacion').value;
    const fotoInputOrganizacion = document.getElementById('fotoOrganizacion');
    let fotoBase64Organizacion = "";

    // Convertir la imagen a Base64 si existe
    if (fotoInputOrganizacion.files.length > 0) {
        const file = fotoInputOrganizacion.files[0];
        fotoBase64Organizacion = await convertirABase64(file);
    }

    try {
        // Subir los datos a Firebase
        const docRef = await addDoc(collection(db, 'organizaciones'), {
            nombreOrganizacion,
            provinciaOrganizacion,
            localidadOrganizacion,
            disponibilidadOrganizacion,
            contactoOrganizacion,
            orientacionOrganizacion,
            descripcionOrganizacion,
            fotoOrganizacion: fotoBase64Organizacion,
        });
        console.log("Organización añadida con ID: ", docRef.id);
        alert('Organización agregada exitosamente');

        // Cerrar el modal y resetear el formulario
        document.getElementById('addModalOrganizacion').close();
        document.getElementById('addDataFormOrganizacion').reset();

        // Crear la tarjeta dinámica para la nueva organización
        crearTarjetaOrganizacion(docRef.id, nombreOrganizacion, orientacionOrganizacion);
    } catch (error) {
        console.error("Error al añadir la organización: ", error);
        alert("Error al guardar la organización");
    }
});


// Crear tarjeta dinámica para la organización
async function crearTarjetaOrganizacion(docId, nombreOrganizacion, orientacionOrganizacion) {
    const container = document.createElement('div');
    container.classList.add('tarjeta');

    const button = document.createElement('button');
    button.classList.add('boton-mascota-nueva');
    document.getElementById('tarjetaOrganizaciones').appendChild(container);
    container.appendChild(button);

    const imagen = document.createElement('img');
    imagen.setAttribute('data-id-organizacion', docId);
    button.appendChild(imagen);

    const titulo = document.createElement('h2');
    titulo.textContent = nombreOrganizacion;
    container.appendChild(titulo);

    const subtitulo = document.createElement('p');
    subtitulo.textContent = orientacionOrganizacion;
    container.appendChild(subtitulo);

    // Obtener datos de Firebase para asignar la imagen
    const docRef = doc(db, 'organizaciones', docId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        const data = docSnap.data();
        const imagenElemento = button.querySelector(`[data-id-organizacion="${docId}"]`);
        if (imagenElemento) {
            imagenElemento.src = data.fotoOrganizacion || '';
        }
    }

    // Evento de clic para abrir el modal con los detalles
    button.onclick = async () => {
        await obtenerYMostrarOrganizacion(docId);
    };
}

// Obtener datos de la organización y rellenar el modal
async function obtenerYMostrarOrganizacion(docId) {
    try {
        const docRef = doc(db, 'organizaciones', docId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const data = docSnap.data();

            document.getElementById('remplazarnombreOrganizacion').textContent = data.nombreOrganizacion || 'No disponible';
            document.getElementById('remplazarProvinciaOrganizacion').textContent = data.provinciaOrganizacion || 'No disponible';
            document.getElementById('remplazarLocalidadOrganizacion').textContent = data.localidadOrganizacion || 'No disponible';
            document.getElementById('remplazarDisponibildadOrganizacion').textContent = data.disponibilidadOrganizacion || 'No disponible';
            document.getElementById('remplazarContactoOrganizacion').textContent = data.contactoOrganizacion || 'No disponible';
            document.getElementById('remplazarOrientacionOrganizacion').textContent = data.orientacionOrganizacion || 'No disponible';
            document.getElementById('remplazarDescpcionOrganizacion').textContent = data.descripcionOrganizacion || 'No disponible';
            document.getElementById('remplazarfotoOrganizacion').src = data.fotoOrganizacion || '';

            const modal = document.getElementById("verOrganizacion");
            if (modal) {
                modal.showModal();
            }
        } else {
            console.log("No se encontró la organización");
        }
    } catch (error) {
        console.error("Error al obtener los datos de la organización: ", error);
    }
}

// Refrescar todas las organizaciones al cargar
async function refrescarOrganizaciones() {
    const querySnapshot = await getDocs(collection(db, 'Organizaciones'));
    querySnapshot.forEach((doc) => {
        const data = doc.data();
        crearTarjetaOrganizacion(doc.id, data.nombreOrganizacion, data.orientacionOrganizacion);
    });
}

refrescarOrganizaciones();

