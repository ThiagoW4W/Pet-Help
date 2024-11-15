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

document.getElementById('addDataFormPerdido').addEventListener('submit', async (e) => {
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
        document.getElementById('addDataFormPerdido').reset();

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

function crearBotonPaseador(docId, nombrePaseador, DescpcionPaseador) {
    const divContainer = document.createElement('div'); //Crea un div
    divContainer.classList.add('tarjeta'); //Le pone la clase tarjeta
    const button = document.createElement('button'); //Crea un botón
    button.classList.add('boton-paseador-nuevo');  // Agregar clase al botón
    document.getElementById('tarjeta').appendChild(divContainer); // Agregar el div a la sección de paseadores
    divContainer.appendChild(button); // Agregar botón dentro del div

    const titulo = document.createElement('h2');
    titulo.textContent = nombrePaseador;
    divContainer.appendChild(titulo);

    const subtitulo = document.createElement('p');
    subtitulo.textContent = DescpcionPaseador;
    divContainer.appendChild(subtitulo);

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

