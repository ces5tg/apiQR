
// Función para mostrar el formulario de edición
function showEditForm(id, id_horario, id_grupo, id_curso, id_persona, asistencia, estado, contrasena) {
    // Ocultar todos los formularios de edición antes de mostrar uno nuevo
    hideAllEditForms();
    console.log(id, id_horario, id_grupo, id_curso, id_persona, asistencia, estado, contrasena);
    // Asignar valores a los campos del formulario de edición
    document.getElementById('editId').value = id;

    // Seleccionar el valor correcto en los elementos 'select'
    setSelectedValue('editHorario', id_horario);
    setSelectedValue('editGrupo', id_grupo);
    setSelectedValue('editCurso', id_curso);
    setSelectedValue('editPersona', id_persona);

    document.getElementById('editAsistencia').checked = asistencia;
    document.getElementById('editEstado').checked = estado;
    document.getElementById('editContrasena').value = contrasena;

    // Mostrar el formulario de edición
    document.getElementById('editForm').style.display = 'block';
}

// Función para seleccionar el valor correcto en un 'select'
function setSelectedValue(selectId, value) {
    let select = document.getElementById(selectId);
    select.value = value;
}

// Función para ocultar todos los formularios de edición
function hideAllEditForms() {
    const editForms = document.querySelectorAll('.edit-form');
    editForms.forEach(form => {
        form.style.display = 'none';
    });
}

// Función para confirmar antes de eliminar
function confirmDelete(horarioPersonaId) {
    if (confirm('¿Estás seguro de que deseas eliminar este horario persona?')) {
        // Realizar eliminación de manera asíncrona (AJAX)
        fetch(`/api/web/horarioPersona/${horarioPersonaId}`, {
            method: 'DELETE'
        })
            .then(response => response.json())
            .then(data => {
                // Actualizar la página sin recargar
                location.reload();
            })
            .catch(error => console.error('Error al eliminar horario persona:', error));
    }
}

// Función para realizar la creación de horario persona y recargar la página
function createHorarioPersona() {
    // Obtener los valores de los campos
    const idHorario = document.getElementById('id_horario').value;
    const idGrupo = document.getElementById('id_grupo').value;
    const idCurso = document.getElementById('id_curso').value;
    const idPersona = document.getElementById('id_persona').value;
    const asistencia = document.getElementById('asistencia').checked;
    const estado = document.getElementById('estado').checked;
    const contrasena = document.getElementById('contrasena').value;

    // Realizar la creación de manera asíncrona (AJAX)
    fetch("/api/web/horarioPersona", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ id_horario: idHorario, id_grupo: idGrupo, id_curso: idCurso, id_persona: idPersona, asistencia, estado, contrasena }), // Enviar los datos como JSON
    })
        .then((response) => response.json())
        .then((data) => {
            // Actualizar la página sin recargar
            location.reload();
            return false; // Evitar la recarga por defecto del formulario
        })
        .catch((error) => console.error("Error al crear horario persona:", error));

    return false; // Evitar el envío por defecto del formulario
}

// Función para realizar la edición de horario persona y recargar la página
function editHorarioPersona() {
    // Obtener los valores de los campos
    const horarioPersonaId = document.getElementById('editId').value;
    const newIdHorario = document.getElementById('editHorario').value;
    const newIdGrupo = document.getElementById('editGrupo').value;
    const newIdCurso = document.getElementById('editCurso').value;
    const newIdPersona = document.getElementById('editPersona').value;
    const newAsistencia = document.getElementById('editAsistencia').checked;

    // Convertir el valor del campo estado de "on" a booleano
    const newEstado = document.getElementById('editEstado').checked;

    const newContrasena = document.getElementById('editContrasena').value;

    // Realizar la edición de manera asíncrona (AJAX)
    fetch(`/api/web/horarioPersona/${horarioPersonaId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id_horario: newIdHorario, id_grupo: newIdGrupo, id_curso: newIdCurso, id_persona: newIdPersona, asistencia: newAsistencia, estado: newEstado, contrasena: newContrasena }), // Enviar los nuevos datos como JSON
    })
        .then(response => response.json())
        .then(data => {
            // Ocultar el formulario de edición
            document.getElementById('editForm').style.display = 'none';
            // Actualizar la página sin recargar
            location.reload();
            return false; // Evitar la recarga por defecto del formulario
        })
        .catch(error => console.error('Error al editar horario persona:', error));

    return false; // Evitar el envío por defecto del formulario
}

// Función para formatear la fecha
function formatFecha(fecha) {
    const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short' };
    const formattedFecha = new Date(fecha).toLocaleDateString('en-US', options);
    return formattedFecha;
}
