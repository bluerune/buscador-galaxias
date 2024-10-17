
const btnBuscar = document.getElementById("btnBuscar");
const contenedor = document.getElementById("contenedor");

function busqueda(){
    inputBuscar = document.getElementById("inputBuscar").value.trim();
    url = "https://images-api.nasa.gov/search?q=" + (inputBuscar.toLowerCase()) ;

    //Loading
    contenedor.innerHTML = `<p>Loading</p>`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            
            console.log(data);
            //desestructurar data
           
            const { items } = data.collection;

            console.log(items);
            //const { data: dataItems, links } = items;
            
           
            //const { date_created, description, title} = dataItems;
            

            //limpiar contenedor
            contenedor.innerHTML = ``;

            //crear tarjetas
            items.forEach(element => {

                console.log(element);
                const { data: dataItem, links } = element;
                
                contenedor.innerHTML += `<div class="card" style="width: 18rem;">
                    <img src="${ links[0].href }" class="card-img-top" alt="${ dataItem[0].title }">
                    <div class="card-body">
                        <h5 class="card-title">${ dataItem[0].title }</h5>
                        <p class="card-text">${ dataItem[0].description }</p>
                        <p class="text-muted">${ dataItem[0].date_created }</p>
                    </div>
                    </div>`;

            });

        })
        .catch(error => {
            
            console.error(error);
        })

}


btnBuscar.addEventListener("click", busqueda);
