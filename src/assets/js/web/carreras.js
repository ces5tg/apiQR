// Función para mostrar el formulario de edición
function showEditForm(id, name, descripcion, nro_ciclos) {
    // Ocultar todos los formularios de edición antes de mostrar uno nuevo
    hideAllEditForms();
    document.getElementById('editId').value = id;
    document.getElementById('editName').value = name;
    document.getElementById('editDescripcion').value = descripcion;
    document.getElementById('editCiclos').value = nro_ciclos;
    document.getElementById('editForm').style.display = 'block';
}

// Función para ocultar todos los formularios de edición
function hideAllEditForms() {
    const editForms = document.querySelectorAll('.edit-form');
    editForms.forEach(form => {
        form.style.display = 'none';
    });
}

// Función para confirmar antes de eliminar
function confirmDelete(carreraId) {
    if (confirm('¿Estás seguro de que deseas eliminar esta carrera?')) {
        // Realizar eliminación de manera asíncrona (AJAX)
        fetch(`/api/web/carrera/${carreraId}`, {
            method: 'DELETE'
        })
        .then(response => response.json())
        .then(data => {
            // Actualizar la página sin recargar
            location.reload();
        })
        .catch(error => console.error('Error al eliminar carrera:', error));
    }
}

// Función para realizar la creación de carrera y recargar la página
function createCarrera() {
    // Obtener los valores de los campos
    const carreraName = document.getElementById('carreraName').value;
    const carreraDescripcion = document.getElementById('carreraDescripcion').value;
    const carreraCiclos = document.getElementById('carreraCiclos').value;

    // Realizar la creación de manera asíncrona (AJAX)
    fetch("/api/web/carrera", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: carreraName, descripcion: carreraDescripcion, nro_ciclos: carreraCiclos }), // Enviar los datos como JSON
    })
        .then((response) => response.json())
        .then((data) => {
            // Actualizar la página sin recargar
            location.reload();
            return false; // Evitar la recarga por defecto del formulario
        })
        .catch((error) => console.error("Error al crear carrera:", error));

    return false; // Evitar el envío por defecto del formulario
}

// Función para realizar la edición de carrera y recargar la página
function editCarrera() {
    // Obtener los valores de los campos
    const carreraId = document.getElementById('editId').value;
    const newCarreraName = document.getElementById('editName').value;
    const newCarreraDescripcion = document.getElementById('editDescripcion').value;
    const newCarreraCiclos = document.getElementById('editCiclos').value;

    // Realizar la edición de manera asíncrona (AJAX)
    fetch(`/api/web/carrera/${carreraId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: newCarreraName, descripcion: newCarreraDescripcion, nro_ciclos: newCarreraCiclos }), // Enviar los nuevos datos como JSON
    })
        .then(response => response.json())
        .then(data => {
            // Ocultar el formulario de edición
            document.getElementById('editForm').style.display = 'none';
            // Actualizar la página sin recargar
            location.reload();
            return false; // Evitar la recarga por defecto del formulario
        })
        .catch(error => console.error('Error al editar carrera:', error));

    return false; // Evitar el envío por defecto del formulario
}