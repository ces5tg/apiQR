// Función para mostrar el formulario de edición
function showEditForm(id, name, horas_lab, horas_teo, id_carrera) {
    hideAllEditForms();
    document.getElementById('editId').value = id;
    document.getElementById('editName').value = name;
    document.getElementById('editHorasLab').value = horas_lab;
    document.getElementById('editHorasTeo').value = horas_teo;
    document.getElementById('editCarrera').value = id_carrera;
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
function createCurso() {
    // Obtener los valores de los campos
    const cursoName = document.getElementById('cursoName').value;
    const cursoHorasLab = document.getElementById('cursoHorasLab').value;
    const cursoHorasTeo = document.getElementById('cursoHorasTeo').value;
    const cursoCarrera = document.getElementById('cursoCarrera').value;

    // Realizar la creación de manera asíncrona (AJAX)
    fetch("/api/web/curso", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: cursoName, horas_lab: cursoHorasLab, horas_teo: cursoHorasTeo, id_carrera: cursoCarrera }), // Enviar los datos como JSON
    })
        .then((response) => response.json())
        .then((data) => {
            // Actualizar la página sin recargar
            location.reload();
            return false; // Evitar la recarga por defecto del formulario
        })
        .catch((error) => console.error("Error al crear curso:", error));

    return false; // Evitar el envío por defecto del formulario
}

// Función para realizar la edición de curso y recargar la página
function editCurso() {
    // Obtener los valores de los campos
    const cursoId = document.getElementById('editId').value;
    const newCursoName = document.getElementById('editName').value;
    const newCursoHorasLab = document.getElementById('editHorasLab').value;
    const newCursoHorasTeo = document.getElementById('editHorasTeo').value;
    const newCursoCarrera = document.getElementById('editCarrera').value;

    // Realizar la edición de manera asíncrona (AJAX)
    fetch(`/api/web/curso/${cursoId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: newCursoName, horas_lab: newCursoHorasLab, horas_teo: newCursoHorasTeo, id_carrera: newCursoCarrera }), // Enviar los nuevos datos como JSON
    })
        .then(response => response.json())
        .then(data => {
            // Ocultar el formulario de edición
            document.getElementById('editForm').style.display = 'none';
            // Actualizar la página sin recargar
            location.reload();
            return false; // Evitar la recarga por defecto del formulario
        })
        .catch(error => console.error('Error al editar curso:', error));

    return false; // Evitar el envío por defecto del formulario
}