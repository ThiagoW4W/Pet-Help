function openModal() {
    const modal = document.getElementById("mainModal");
    if (modal) {
        document.body.classList.add('modal-open'); // Evita el desplazamiento del fondo
        
        modal.showModal(); // Para mostrar el <dialog>
    } else {
        console.error("No se encontró el elemento modal.");
    }
}

function closeModal() {
    const modal = document.getElementById("mainModal");
    if (modal) {
        document.body.classList.remove('modal-open'); // Reactiva el desplazamiento del fondo
        modal.close(); // Para cerrar el <dialog>
    } else {
        console.error("No se encontró el elemento modal.");
    }
}

document.getElementById("close-btn").addEventListener("click", closeModal);
