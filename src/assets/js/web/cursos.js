// Función para mostrar el formulario de edición
function showEditForm(id, name, horas_lab, horas_teo, id_carrera) {
    console.log(id, name, horas_lab, horas_teo, id_carrera);
    document.getElementById('editId').value = id;
    document.getElementById('cursoName').value = name;
    document.getElementById('cursoHorasLab').value = horas_lab;
    document.getElementById('cursoHorasTeo').value = horas_teo;
    document.getElementById('cursoCarrera').value = id_carrera;
}

// Función para confirmar antes de eliminar
function confirmDelete(cursoId) {
    if (confirm('¿Estás seguro de que deseas eliminar este curso?')) {
        // Realizar eliminación de manera asíncrona (AJAX)
        fetch(`/api/web/curso/${cursoId}`, {
            method: 'DELETE'
        })
        .then(response => response.json())
        .then(data => {
            // Actualizar la página sin recargar
            location.reload();
        })
        .catch(error => console.error('Error al eliminar curso:', error));
    }
}

// Función para realizar la creación de curso y recargar la página
function submitCursoForm() {
    const cursoId = document.getElementById('editId').value;
    // Obtener los valores de los campos
    const cursoName = document.getElementById('cursoName').value;
    const cursoHorasLab = document.getElementById('cursoHorasLab').value;
    const cursoHorasTeo = document.getElementById('cursoHorasTeo').value;
    const cursoCarrera = document.getElementById('cursoCarrera').value;

    if (cursoId) {
        fetch(`/api/web/curso/${cursoId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: cursoName, horas_lab: cursoHorasLab, horas_teo: cursoHorasTeo, id_carrera: cursoCarrera }), // Enviar los nuevos datos como JSON
        })
            .then(response => response.json())
            .then(data => {
                location.reload();
            })
            .catch(error => console.error('Error al editar curso:', error));
    } else {
        fetch("/api/web/curso", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name: cursoName, horas_lab: cursoHorasLab, horas_teo: cursoHorasTeo, id_carrera: cursoCarrera }), // Enviar los datos como JSON
        })
            .then((response) => response.json())
            .then((data) => {
                location.reload();
            })
            .catch((error) => console.error("Error al crear curso:", error));
    }

    return false; // Evitar el envío por defecto del formulario
}