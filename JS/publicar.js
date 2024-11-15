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

// Función para agregar datos a Firestore y crear un botón
document.getElementById('addDataForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const nombre = document.getElementById('nombre').value;
    const Provincia = document.getElementById('Provincia').value;
    const Localidad = document.getElementById('Localidad').value;
    const DatosGenerales = document.getElementById('DatosGenerales').value;
    const Apariencia = document.getElementById('Apariencia').value;
    const Barrio = document.getElementById('Barrio').value;
    const Contacto = document.getElementById('Contacto').value;
    const fotoInputAdopcion = document.getElementById('fotoMascotaAdopcion'); // Nuevo campo de imagen
    let fotoBase64Adopcion = "";
    
    // Convertir la imagen a Base64 si se seleccionó un archivo
    if (fotoInputAdopcion.files.length > 0) {
        const file = fotoInputAdopcion.files[0];
        fotoBase64Adopcion = await convertirABase64(file); // Convierte la imagen a Base64
    }
   
    try {
        // Agregar el documento a la colección 'Mascotas'
        const docRef = await addDoc(collection(db, 'Mascotas'), { 
            nombre, 
            Provincia,
            Localidad,
            DatosGenerales,
            Apariencia,
            Barrio,
            Contacto,
            fotoAdopcion: fotoBase64Adopcion // Guardar la imagen en la base de datos
        });
        console.log(DatosGenerales);
        
        console.log("Documento añadido con ID: ", docRef.id);
        
        
        crearBotonMascota(docRef.id, nombre, DatosGenerales);

        // Cerrar el modal y resetear el formulario
        document.getElementById('addModalMascota').close();
        document.getElementById('addDataForm').reset();
    } catch (error) {

        console.error("Error al añadir documento: ", error);
        alert('error desconocido');
    }
});



function crearBotonMascota(docId, nombre,DatosGenerales) {
   
    
    const divContainer = document.createElement('div');
    divContainer.classList.add('tarjeta');
    const button = document.createElement('button');
    button.classList.add('boton-mascota-nueva');  // Agregar clase al botón
    document.getElementById('tarjetaMascota').appendChild(divContainer);
    divContainer.appendChild(button);

    const titulo = document.createElement('h2');
    titulo.textContent = nombre;
    divContainer.appendChild(titulo); 

    const subtitulo = document.createElement('p');
    subtitulo.textContent = DatosGenerales;
    divContainer.appendChild(subtitulo);

    button.onclick = async () => {
        // Mostrar el modal con los datos del documento
        await ObtenerYrellenar(docId);
    };
}

async function ObtenerYrellenar(docId) {
    try {
        const docRef = doc(db, 'Mascotas', docId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const data = docSnap.data();

            document.getElementById('remplazarNombre').textContent = data.nombre || 'No disponible';
            document.getElementById('remplazarProvincia').textContent = data.Provincia || 'No disponible';
            document.getElementById('remplazarLocalidad').textContent = data.Localidad || 'No disponible';
            document.getElementById('remplazarBarrio').textContent = data.Barrio || 'No disponible';
            document.getElementById('remplazarDatosGenerales').textContent = data.DatosGenerales || 'No disponible';
            document.getElementById('remplazarApariencia').textContent = data.Apariencia || 'No disponible';
            document.getElementById('remplazarContacto').textContent = data.Contacto || 'No disponible';

            // Mostrar la imagen si existe
            document.getElementById('imagenMascotaAdopcion').src = data.fotoAdopcion || ''; // Agregar la imagen al elemento `imagenMascotaAdopcion`
            
            const modal = document.getElementById("mainModal");
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

async function loadData() {
    const querySnapshot = await getDocs(collection(db, 'Mascotas'));
    querySnapshot.forEach((doc) => {
        const data = doc.data();
        crearBotonMascota(doc.id, data.nombre,data.DatosGenerales, data.Provincia, data.Localidad, data.Barrio,  data.Apariencia);
    });
}








// MASCOTA PERDIDA 

document.getElementById('addDataFormPerdido').addEventListener('submit', async (e) => {
    e.preventDefault();
    console.log("Detecto el evento");
    
    const nombrePerdido = document.getElementById('nombrePerdido').value;
    const ProvinciaPerdido = document.getElementById('ProvinciaPerdido').value;
    const LocalidadPerdido = document.getElementById('LocalidadPerdido').value;
    const DatosGeneralesPerdido = document.getElementById('DatosGeneralesPerdido').value;
    const AparienciaPerdido = document.getElementById('AparienciaPerdido').value;
    const BarrioPerdido = document.getElementById('BarrioPerdido').value;
    const ContactoPerdido = document.getElementById('ContactoPerdido').value;
    const FechaPerdido = document.getElementById('FechaPerdido').value;
    const fotoInputPerdido = document.getElementById('fotoMascotaPerdido');
    let fotoBase64Perdido = "";
    if (fotoInputPerdido.files.length > 0) {
        const file = fotoInputPerdido.files[0];
        fotoBase64Perdido = await convertirABase64(file); // Convierte la imagen a Base64
    }
    try {
        // Agregar el documento a la colección 'Mascotas'
        const docRef = await addDoc(collection(db, 'MascotasPerdidas'), { 
            nombrePerdido,
            ProvinciaPerdido,
            LocalidadPerdido,
            DatosGeneralesPerdido,
            AparienciaPerdido,
            BarrioPerdido,
            ContactoPerdido,
            FechaPerdido,
            fotoPerdido: fotoBase64Perdido,
            
        });
        console.log("Documento añadido con ID: ", docRef.id);
        alert('Se subió la mascota perdida');


        // Cerrar el modal y resetear el formulario
        document.getElementById('addModalMascotaPerdida').close();
        document.getElementById('addDataForm').reset();

        crearBotonMascotaPerdido(docRef.id, nombrePerdido,DatosGeneralesPerdido);
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

function crearBotonMascotaPerdido(docId, nombrePerdido,DatosGeneralesPerdido) {
    const divContainer = document.createElement('div'); //Crea un div
    divContainer.classList.add('tarjeta'); //Le pone le clase tarjeta
    const button = document.createElement('button'); //Crea un botom
    button.classList.add('boton-mascota-nueva');  // Agregar clase al botón
    document.getElementById('tarjetaMascotaPerdida').appendChild(divContainer); // Agregar el div a la seccion de perdidos
    divContainer.appendChild(button);// Agregar botón dentro del div
    
    const titulo = document.createElement('h2');
    titulo.textContent = nombrePerdido;
    divContainer.appendChild(titulo); 

    const subtitulo = document.createElement('p');
    subtitulo.textContent = DatosGeneralesPerdido;
    divContainer.appendChild(subtitulo);

    button.onclick = async () => {
        // Mostrar el modal con los datos del documento
        await ObtenerYrellenarPerdido(docId);
    };

    
} 

async function ObtenerYrellenarPerdido(docId) {
    try {
        const docRef = doc(db, 'MascotasPerdidas', docId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const data = docSnap.data(); // Guarda los datos en la constante `data` una vez y reutilízala

            // Rellena los elementos HTML con los datos del documento
            document.getElementById('remplazarNombrePerdido').textContent = data.nombrePerdido || 'No disponible';
            document.getElementById('remplazarProvinciaPerdido').textContent = data.ProvinciaPerdido || 'No disponible';
            document.getElementById('remplazarLocalidadPerdido').textContent = data.LocalidadPerdido || 'No disponible';
            document.getElementById('remplazarBarrioPerdido').textContent = data.BarrioPerdido || 'No disponible';
            document.getElementById('remplazarDatosGeneralesPerdido').textContent = data.DatosGeneralesPerdido || 'No disponible';
            document.getElementById('remplazarAparienciaPerdido').textContent = data.AparienciaPerdido || 'No disponible';
            document.getElementById('remplazarContactoPerdido').textContent = data.ContactoPerdido || 'No disponible';
            document.getElementById('remplazarFechaPerdido').textContent = data.FechaPerdido || 'No disponible';

            // Rellena la imagen de la mascota si `data.foto` está disponible

            
            console.log(data.fotoPerdido);
            document.getElementById('imagenMascotaPerdida').src = data.fotoPerdido
            console.log(imagenMascotaPerdida);

            // Abre el modal si está disponible
            const modal = document.getElementById("VerMascotaPerdido");
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


async function refrescarMascotasPerdidas() {
    const querySnapshot = await getDocs(collection(db, 'MascotasPerdidas'));
    querySnapshot.forEach((doc) => {
        const data = doc.data();
        crearBotonMascotaPerdido(doc.id, data.nombrePerdido,data.DatosGeneralesPerdido, data.ProvinciaPerdido, data.LocalidadPerdido, data.BarrioPerdido, data.AparienciaPerdido, data.FechaPerdido);
    });
}
refrescarMascotasPerdidas();
loadData();