let librosDatos = []; 
function obtenerLibros() {
    var url = "https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=0Wuv6yJ8jbcFJsGZn2fxQ8zHOxPSYogu"
    fetch(url)
    .then(respuesta => respuesta.json())
    .then(libros => {

        librosDatos = libros.results.books  
            agregarLibrosdropList(librosDatos)


    })
}
function agregarLibrosdropList(libros) {
    const dropList = document.getElementById("dropList")
    dropList.innerHTML = '<option value="">Seleccione un libro</option>'
    
    libros.forEach((libro, index) => {
        const option = document.createElement("option")
        option.value = index
        option.textContent = libro.title
        dropList.appendChild(option)
    });
}
function mostrarDatosSeleccionado() {
    const dropList = document.getElementById("dropList")
    const IndexSeleccionado = dropList.value
    const tabla = document.getElementById("table").getElementsByTagName("tbody")[0]
    
   
    tabla.innerHTML = ""

    if (IndexSeleccionado !== "") {
        const libroSeleccionado = librosDatos[IndexSeleccionado]
      
        const fila = tabla.insertRow(-1);
        fila.insertCell(0).textContent = libroSeleccionado.publisher || "No disponible"
        fila.insertCell(1).textContent = libroSeleccionado.description || "No disponible"
        fila.insertCell(2).textContent = libroSeleccionado.price || "No disponible"
        fila.insertCell(3).textContent = libroSeleccionado.title || "No disponible"
        fila.insertCell(4).textContent = libroSeleccionado.author || "No disponible"
        fila.insertCell(5).textContent = libroSeleccionado.contributor || "No disponible"
        fila.insertCell(6).textContent = libroSeleccionado.contributor_note || "No disponible"
        fila.insertCell(7).innerHTML = `<img src="${libroSeleccionado.book_image}" alt="Imagen del libro">`
    } else {
        alert("Por favor, selecciona un libro del listado.")
    }
}
document.addEventListener('DOMContentLoaded', obtenerLibros)