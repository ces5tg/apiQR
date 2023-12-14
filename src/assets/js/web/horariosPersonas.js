
// Función para mostrar el formulario de edición
function showEditForm(id, id_horario, id_grupo, id_curso, id_persona) {
    document.getElementById('editId').value = id;

    setSelectedValue('id_horario', id_horario);
    setSelectedValue('id_grupo', id_grupo);
    setSelectedValue('id_curso', id_curso);
    setSelectedValue('id_persona', id_persona);
    document.getElementById('submitBtn').innerText = 'Guardar Cambios';
}

// Función para seleccionar el valor correcto en un 'select'
function setSelectedValue(selectId, value) {
    let select = document.getElementById(selectId);
    select.value = value;
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
function submitHorarioPersonaForm() {
    const idHorarioPersona = document.getElementById('editId').value;
    // Obtener los valores de los campos
    const idHorario = document.getElementById('id_horario').value;
    const idGrupo = document.getElementById('id_grupo').value;
    const idCurso = document.getElementById('id_curso').value;
    const idPersona = document.getElementById('id_persona').value;

    if (idHorarioPersona) {
        fetch(`/api/web/horarioPersona/${idHorarioPersona}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id_horario: idHorario, id_grupo: idGrupo, id_curso: idCurso, id_persona: idPersona }),
        })
            .then(response => response.json())
            .then(data => {
                location.reload();
            })
            .catch(error => console.error('Error al editar horario persona:', error));
    } else {
        fetch("/api/web/horarioPersona", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id_horario: idHorario, id_grupo: idGrupo, id_curso: idCurso, id_persona: idPersona }), // Enviar los datos como JSON
        })
            .then((response) => response.json())
            .then((data) => {
                // Actualizar la página sin recargar
                location.reload();
                return false; // Evitar la recarga por defecto del formulario
            })
            .catch((error) => console.error("Error al crear horario persona:", error));
    }

    return false; // Evitar el envío por defecto del formulario
}

// Función para formatear la fecha
function formatFecha(fecha) {
    const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short' };
    const formattedFecha = new Date(fecha).toLocaleDateString('en-US', options);
    return formattedFecha;
}
