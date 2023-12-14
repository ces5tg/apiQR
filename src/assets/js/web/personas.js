
// Resto del código permanece igual

// Función para mostrar el formulario de edición
function showEditForm(id, name, dni, rol, email, password) {

    console.log(id, name, dni, rol, email, password);
    document.getElementById('editId').value = id;
    document.getElementById('personaName').value = name;
    document.getElementById('personaDNI').value = dni;
    document.getElementById('personaRol').value = rol;
    document.getElementById('personaEmail').value = email;
    document.getElementById('personaPassword').value = password;
}

// Función para ocultar todos los formularios de edición
function hideAllEditForms() {
    const editForms = document.querySelectorAll('.edit-form');
    editForms.forEach(form => {
        form.style.display = 'none';
    });
}

// Función para confirmar antes de eliminar
function confirmDelete(personaId) {
    if (confirm('¿Estás seguro de que deseas eliminar a esta persona?')) {
        // Realizar eliminación de manera asíncrona (AJAX)
        fetch(`/api/web/persona/${personaId}`, {
            method: 'DELETE'
        })
            .then(response => response.json())
            .then(data => {
                // Actualizar la página sin recargar
                location.reload();
            })
            .catch(error => console.error('Error al eliminar persona:', error));
    }
}

// Función para realizar la creación de persona y recargar la página
function submitPersonaForm() {
    // Obtener los valores del formulario
    
    const personaId = document.getElementById('editId').value;
    const personaName = document.getElementById('personaName').value;
    const personaDNI = document.getElementById('personaDNI').value;
    const personaRol = document.getElementById('personaRol').value;
    const personaEmail = document.getElementById('personaEmail').value;
    const personaPassword = document.getElementById('personaPassword').value;

    if (personaId) {
        // Realizar la edición de manera asíncrona (AJAX)
        fetch(`/api/web/persona/${personaId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: personaName,
                dni: personaDNI,
                rol: personaRol,
                user: {
                    email: personaEmail,
                    password: personaPassword,
                }
            }),
        })
            .then(response => response.json())
            .then(data => {
                // Ocultar el formulario de edición
                document.getElementById('editForm').style.display = 'none';
                // Actualizar la página sin recargar
                location.reload();
                return false; // Evitar la recarga por defecto del formulario
            })
            .catch(error => console.error('Error al editar persona:', error));
    } else {
        // Realizar la creación de manera asíncrona (AJAX)
        fetch("/api/web/persona/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: personaName,
                dni: personaDNI,
                rol: personaRol,
                user: {
                    email: personaEmail,
                    password: personaPassword,
                }
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                // Actualizar la página sin recargar
                location.reload();
                return false;
            })
            .catch((error) => console.error("Error al crear persona:", error));
    
        return false;

    } // Evitar el envío por defecto del formulario
}
