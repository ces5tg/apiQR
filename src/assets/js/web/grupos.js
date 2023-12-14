// Función para mostrar el formulario de edición
function showEditForm(id, name, nro_inscritos, id_carrera) {
    document.getElementById('editId').value = id;
    document.getElementById('grupoName').value = name;
    document.getElementById('grupoInscritos').value = nro_inscritos;
    document.getElementById('grupoCarrera').value = id_carrera;
}

// Función para confirmar antes de eliminar
function confirmDelete(grupoId) {
    if (confirm('¿Estás seguro de que deseas eliminar este grupo?')) {
        // Realizar eliminación de manera asíncrona (AJAX)
        fetch(`/api/web/grupo/${grupoId}`, {
            method: 'DELETE'
        })
            .then(response => response.json())
            .then(data => {
                // Actualizar la página sin recargar
                location.reload();
            })
            .catch(error => console.error('Error al eliminar grupo:', error));
    }
}

// Función para realizar la creación de grupo y recargar la página
function submitGrupoForm() {
    const grupoId = document.getElementById('editId').value;
    // Obtener los valores de los campos
    const grupoName = document.getElementById('grupoName').value;
    const grupoInscritos = document.getElementById('grupoInscritos').value;
    const grupoCarrera = document.getElementById('grupoCarrera').value;

    if (grupoId) {
        fetch(`/api/web/grupo/${grupoId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: grupoName, nro_inscritos: grupoInscritos, id_carrera: grupoCarrera }), // Enviar los nuevos datos como JSON
        })
            .then(response => response.json())
            .then(data => {
                location.reload();
            })
            .catch(error => console.error('Error al editar grupo:', error));
    } else {
        fetch("/api/web/grupo", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name: grupoName, nro_inscritos: grupoInscritos, id_carrera: grupoCarrera }), // Enviar los datos como JSON
        })
            .then((response) => response.json())
            .then((data) => {
                location.reload();
            })
            .catch((error) => console.error("Error al crear grupo:", error));
    }

    return false; // Evitar el envío por defecto del formulario
}


function showGrupoDetails(grupoId) {
    // Realizar solicitud AJAX para obtener detalles del grupo
    fetch(`/api/web/grupo/${grupoId}`)
        .then(response => response.json())
        .then(data => {
            // Mostrar los detalles en el div correspondiente
            const grupoDetailsDiv = document.getElementById('grupoDetails');
            grupoDetailsDiv.innerHTML = `
                    <h2>Detalles del Grupo</h2>
                    <p><strong>Nombre:</strong> ${data.name}</p>
                    <p><strong>Número de Inscritos:</strong> ${data.nro_inscritos}</p>
                    <p><strong>Carrera:</strong> ${data.id_carrera.name}</p>
                    <!-- Puedes agregar más detalles según tu modelo de datos -->
                `;
        })
        .catch(error => console.error('Error al obtener detalles del grupo:', error));
}