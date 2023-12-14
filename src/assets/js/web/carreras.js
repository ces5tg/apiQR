// Función para mostrar el formulario de edición
function showEditForm(id, name, descripcion, nro_ciclos) {
    document.getElementById('editId').value = id;
    document.getElementById('carreraName').value = name;
    document.getElementById('carreraDescripcion').value = descripcion;
    document.getElementById('carreraCiclos').value = nro_ciclos;

    document.getElementById('submitBtn').innerText = 'Guardar Cambios';
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
function submitCarreraForm() {
    // Obtener los valores de los campos
    const carreraId = document.getElementById('editId').value;
    const carreraName = document.getElementById('carreraName').value;
    const carreraDescripcion = document.getElementById('carreraDescripcion').value;
    const carreraCiclos = document.getElementById('carreraCiclos').value;

    if (carreraId) {
        fetch(`/api/web/carrera/${carreraId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: carreraName, descripcion: carreraDescripcion, nro_ciclos: carreraCiclos }), // Enviar los nuevos datos como JSON
        })
            .then(response => response.json())
            .then(data => {
                location.reload();
            })
            .catch(error => console.error('Error al editar carrera:', error));
        
    } else {
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
            })
            .catch((error) => console.error("Error al crear carrera:", error));
    }
    return false; // Evitar el envío por defecto del formulario
}