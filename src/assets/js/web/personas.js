
// Resto del código permanece igual

// Función para mostrar el formulario de edición
function showEditForm(id, name, firstName, lastName, dni, estado, rol, username, email, password, profileImage) {
    // Ocultar todos los formularios de edición antes de mostrar uno nuevo
    hideAllEditForms();
    console.log(id, name, firstName, lastName, dni, estado, rol, username, email, password, profileImage);
    document.getElementById('editId').value = id;
    document.getElementById('editName').value = name;
    document.getElementById('editFirstName').value = firstName;
    document.getElementById('editLastName').value = lastName;
    document.getElementById('editDNI').value = dni;
    document.getElementById('editEstado').value = estado;
    document.getElementById('editRol').value = rol;
    document.getElementById('editUsername').value = username;
    document.getElementById('editEmail').value = email;
    document.getElementById('editPassword').value = password;
    document.getElementById('editProfileImage').value = profileImage;
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
function createPersona() {
    // Obtener los valores del formulario
    const personaName = document.getElementById('personaName').value;
    const personaFirstName = document.getElementById('personaFirstName').value;
    const personaLastName = document.getElementById('personaLastName').value;
    const personaDNI = document.getElementById('personaDNI').value;
    const personaEstado = document.getElementById('personaEstado').value;
    const personaRol = document.getElementById('personaRol').value;
    const personaUsername = document.getElementById('personaUsername').value;
    const personaEmail = document.getElementById('personaEmail').value;
    const personaPassword = document.getElementById('personaPassword').value;
    const personaProfileImage = document.getElementById('personaProfileImage').value;

    console.log(personaName, personaFirstName.personaLastName, personaDNI, personaEstado, personaRol, personaUsername, personaEmail, personaPassword, personaProfileImage);

    // Realizar la creación de manera asíncrona (AJAX)
    fetch("/api/web/persona", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: personaName,
            firstName: personaFirstName,
            lastName: personaLastName,
            dni: personaDNI,
            estado: personaEstado,
            rol: personaRol,
            user: {
                username: personaUsername,
                email: personaEmail,
                password: personaPassword,
                profileImage: personaProfileImage,
            }
        }),
    })
        .then((response) => response.json())
        .then((data) => {
            // Actualizar la página sin recargar
            location.reload();
            return false; // Evitar la recarga por defecto del formulario
        })
        .catch((error) => console.error("Error al crear persona:", error));

    return false; // Evitar el envío por defecto del formulario
}

// Función para realizar la edición de persona y recargar la página
function editPersona() {
    // Obtener los valores del formulario
    const personaId = document.getElementById('editId').value;
    const newPersonaName = document.getElementById('editName').value;
    const newPersonaFirstName = document.getElementById('editFirstName').value;
    const newPersonaLastName = document.getElementById('editLastName').value;
    const newPersonaDNI = document.getElementById('editDNI').value;
    const newPersonaEstado = document.getElementById('editEstado').value;
    const newPersonaRol = document.getElementById('editRol').value;
    const newPersonaUsername = document.getElementById('editUsername').value;
    const newPersonaEmail = document.getElementById('editEmail').value;
    const newPersonaPassword = document.getElementById('editPassword').value;
    const newPersonaProfileImage = document.getElementById('editProfileImage').value;

    // Realizar la edición de manera asíncrona (AJAX)
    fetch(`/api/web/persona/${personaId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: newPersonaName,
            firstName: newPersonaFirstName,
            lastName: newPersonaLastName,
            dni: newPersonaDNI,
            estado: newPersonaEstado,
            rol: newPersonaRol,
            user: {
                username: newPersonaUsername,
                email: newPersonaEmail,
                password: newPersonaPassword,
                profileImage: newPersonaProfileImage,
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

    return false; // Evitar el envío por defecto del formulario
}

// Resto del código permanece igual