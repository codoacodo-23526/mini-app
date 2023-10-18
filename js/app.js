let formulario = document.getElementById("formulario");
let submit = document.getElementById("submit");

let fetchProvincia = (provincia) => {

    // hacemos la peticion a la api
    return fetch('https://apis.datos.gob.ar/georef/api/provincias?nombre=' + provincia)
        .then(response => response.json()) // convertimos la respuesta a json
        .catch(error => console.log(error)) // si hay yb 

}

formulario.addEventListener('submit', async function (e) {
    //SCOPE DE MI FUNCION 
    e.preventDefault(); //EVITA QUE SE RECARGUE LA PAGINA

    let provincia = document.getElementById("provincia").value;
    let resultado = document.getElementById("resultado");


    submit.setAttribute('disabled', '');
    submit.setAttribute('aria-busy', 'true');

    const infoProvincia = await fetchProvincia(provincia);

    if (!provincia) {
        resultado.innerHTML = "Debe ingresar una provincia";
        return;
    } else {

        if (infoProvincia) {

            let arrayProvincias = infoProvincia.provincias;

            if (arrayProvincias.length !== 0) {
                let nombreProvincia = infoProvincia.provincias[0].nombre; // obtengo el nombre de la provincia

                let cadenas = '';
                let lat = '';
                let lon = '';

                for (let i = 0; i <= arrayProvincias.length - 1; i++) {
                    lat = " lat: " + arrayProvincias[i].centroide.lat;
                    lon = " lon: " + arrayProvincias[i].centroide.lon;

                    cadenas = cadenas + "<br> primer provincia: " + arrayProvincias[i].nombre + lat + lon;
                }
                resultado.innerHTML = nombreProvincia + "<br>" + cadenas;
            }
            else {

                resultado.innerHTML = "NO HAY DATOS PARA ESA PROVINCIA";
            }

        }

        submit.removeAttribute('disabled');
        submit.removeAttribute('aria-busy');
    }

})