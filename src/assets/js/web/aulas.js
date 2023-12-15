// Función para mostrar el formulario de edición
function showEditForm(id, name) {
    document.getElementById('editId').value = id;
    document.getElementById('aulaName').value = name;
    document.getElementById('submitBtn').innerText = 'Guardar Cambios';
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

// Función para realizar la creación o edición de aula y recargar la página
function submitAulaForm() {
    const aulaId = document.getElementById('editId').value;
    const aulaName = document.getElementById('aulaName').value;
    console.log(aulaId);
    console.log(aulaName);
    if (aulaId) {
        // Edición de aula
        fetch(`/api/web/aula/${aulaId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: aulaName
                }),
            })
            .then(response => response.json())
            .then(data => {
                // Actualizar la página sin recargar
                location.reload();
            })
            .catch(error => console.error('Error al editar aula:', error));
    } else {
        // Creación de aula
        fetch("/api/web/aula/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: aulaName
                }),
            })
            .then((response) => response.json())
            .then((data) => {
                // Actualizar la página sin recargar
                location.reload();
            })
            .catch((error) => console.error("Error al crear aula:", error));
    }

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
                    <br>
                    <figure class="bg-slate-100 rounded-xl p-8 light:bg-slate-800 w-full">
                        <figcaption class="font-medium">
                            <div class="text-sky-500 dark:text-sky-400">
                                ${data.name}
                            </div>
                        </figcaption>
                        <div class="w-40 h-40 rounded-lg mx-auto w-full h-50 overflow-hidden">
                            <img class="object-cover object-center w-full h-full" src="${data.codigo}" alt="QR de Aula">
                        </div>
                    </figure>

                `;
            }

            // Actualiza la sección de detalles con el contenido renderizado
            document.getElementById('aulaDetails').innerHTML = renderedContent;
        })
        .catch(error => console.error('Error al cargar detalles de aula:', error));
}
