
const btnBuscar = document.getElementById("btnBuscar");
const contenedor = document.getElementById("contenedor");

function busqueda(){
    inputBuscar = document.getElementById("inputBuscar").value.trim();
    url = "https://images-api.nasa.gov/search?q=" + (inputBuscar.toLowerCase()) ;

    //Loading
    contenedor.innerHTML = `<img src="img/icons_loading.png" id="loading" class="rotate-circle" alt="Cargando">`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            //desestructurar data
            const { items } = data.collection;
            if (items.length <= 0){
                contenedor.innerHTML = `<p id="notfound">No se encontró nada que coincida con tu búsqueda.</p>`;
            } else {
                //limpiar contenedor
                contenedor.innerHTML = ``;

                //crear tarjetas
                items.forEach(element => {
                    console.log(element);
                    const { data: dataItem, links, href } = element;
                    if (!links) {
                        imgUrl = "img/icons_backgrounds.png";
                    } else {
                        imgUrl = links[0].href;
                    }
                    contenedor.innerHTML += `<div class="card">
                        <img src="${ imgUrl }" class="card-img-top" alt="${ dataItem[0].title }">
                        <div class="card-body">
                            <h5 class="card-title">${ dataItem[0].title }</h5>
                            <p class="card-text">${ dataItem[0].description }</p>
                            <p class="text-muted">${ dataItem[0].date_created }</p>
                        </div>
                        </div>`;
                });
                }
        })
        .catch(error => {
            console.error("Error al buscar imagenes", error);
        })

}

btnBuscar.addEventListener("click", busqueda);

inputBuscar.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        btnBuscar.click();
    }
});
