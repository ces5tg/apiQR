// Función para mostrar el formulario de edición
function showEditForm(id, name) {
    // Ocultar todos los formularios de edición antes de mostrar uno nuevo
    hideAllEditForms();
    document.getElementById('editId').value = id;
    document.getElementById('editName').value = name;
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
function confirmDelete(aulaId) {
    if (confirm('¿Estás seguro de que deseas eliminar esta aula?')) {
        // Realizar eliminación de manera asíncrona (AJAX)
        fetch(`/api/web/aula/${aulaId}`, {
            method: 'DELETE'
        })
        .then(response => response.json())
        .then(data => {
            // Actualizar la página sin recargar
            location.reload();
        })
        .catch(error => console.error('Error al eliminar aula:', error));
    }
}

// Función para realizar la creación de aula y recargar la página
function createAula() {
    // Obtener el valor del campo de nombre
    const aulaName = document.getElementById('aulaName').value;

    // Realizar la creación de manera asíncrona (AJAX)
    fetch("/api/web/aula", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: aulaName }), // Enviar el nombre como JSON
    })
        .then((response) => response.json())
        .then((data) => {
            // Actualizar la página sin recargar
            location.reload();
            return false; // Evitar la recarga por defecto del formulario
        })
        .catch((error) => console.error("Error al crear aula:", error));

    return false; // Evitar el envío por defecto del formulario
}

// Función para realizar la edición de aula y recargar la página
function editAula() {
    // Obtener el valor del campo de nombre y el ID
    const aulaId = document.getElementById('editId').value;
    const newAulaName = document.getElementById('editName').value;

    // Realizar la edición de manera asíncrona (AJAX)
    fetch(`/api/web/aula/${aulaId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: newAulaName }), // Enviar el nuevo nombre como JSON
    })
        .then(response => response.json())
        .then(data => {
            // Ocultar el formulario de edición
            document.getElementById('editForm').style.display = 'none';
            // Actualizar la página sin recargar
            location.reload();
            return false; // Evitar la recarga por defecto del formulario
        })
        .catch(error => console.error('Error al editar aula:', error));

    return false; // Evitar el envío por defecto del formulario
}

// Función para cargar dinámicamente los detalles del aula mediante AJAX
function loadAulaDetails(aulaId) {
    // Realiza una solicitud AJAX para obtener los detalles del aula
    fetch(`/api/web/aula/${aulaId}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);

            // Inicializa renderedContent como una cadena vacía
            let renderedContent = '';

            // Actualiza el contenido solo si hay datos disponibles
            if (data) {
                // Renderiza el contenido de detalles directamente en la variable
                renderedContent = `
                    <h2>Detalles del Aula</h2>
                    <p><strong>ID:</strong> ${data._id}</p>
                    <p><strong>Nombre:</strong> ${data.name}</p>
                    <p><strong>Descripcion:</strong> ${data.descripcion}</p>
                    <img src="${data.codigo}" alt="Imagen del Aula">

                `;
            }

            // Actualiza la sección de detalles con el contenido renderizado
            document.getElementById('aulaDetails').innerHTML = renderedContent;
        })
        .catch(error => console.error('Error al cargar detalles de aula:', error));
}
