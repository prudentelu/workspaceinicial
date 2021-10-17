var boughtProducts = [];

function showBoughtProducts(array) {

    for (let i = 0; i < array.length; i++) {
        let productosComprados = array[i];

        var table = document.getElementById("boughtProducts");

        var row = table.insertRow(1);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell5 = row.insertCell(4);
        var x =

            cell1.innerHTML += `<img class="img-fluid img-thumbnail" style="width: 80px; height: 80px" src=" ` + productosComprados.src + `"> <br>`;
        cell1.innerHTML += productosComprados.name + `<br>`;

        cell2.innerHTML = `<input id= "botonCantidad" type="number" value="` + productosComprados.count + `" min="1" onChange= "calcularSubtotal()"> </input>`
        cell3.innerHTML = productosComprados.unitCost;
        cell4.innerHTML = `<p id="mostrarSubtotal"> ` + productosComprados.unitCost * productosComprados.count + `</p>`
        cell5.innerHTML = `<td><a href="">Quitar</a></td>`;

    };
};

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(CART_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            boughtProducts = resultObj.data;

            //Muestro los productos
            showBoughtProducts(boughtProducts.articles);
        };
    });
});

function calcularSubtotal() {
    var cantidad = document.getElementById("botonCantidad").value;
    var precio = boughtProducts.articles[0].unitCost;
    document.getElementById("mostrarSubtotal").innerHTML = cantidad * precio;
};

function mostrarDatosDeEnvío() {
    var formularioEnvío = document.getElementById("formularioDatosDeEnvío");
    formularioEnvío.style.display = "block";
}

function mostrarFactura() {
    var formularioFacturación = document.getElementById("formularioFacturación");
    var imputDirección = document.getElementById("direcciónUsuario").value
    var imputPaís = document.getElementById("paísUsuario").value
    var avisoError = document.getElementById("avisoError")
    if (imputDirección !== '' && imputPaís !== '') {
        formularioFacturación.style.display = "block";
        avisoError.style.display = "none";
    }
    else {
        avisoError.style.display = "block";
    };
};