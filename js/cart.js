var boughtProducts = [];
let subtotal= 0;
mensajeExito = [];


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
        var cell6 = row.insertCell(5);
        

        
        cell1.innerHTML += `<img class="img-fluid img-thumbnail" style="width: 100px; height: 100px; border: 3px solid cadetblue; margin: 10px;" src=" ` + productosComprados.src + `"> <br><br>`;
        cell1.innerHTML += `<p>`+ productosComprados.name + `</p><br>`;

        cell2.innerHTML = `<input id= "botonCantidad" type="number" value="` + productosComprados.count + `" min="1" onChange= "calcularSubtotal()"> </input>`
        cell3.innerHTML = productosComprados.unitCost + productosComprados.currency;
        cell4.innerHTML = `<p id="mostrarSubtotal"> ` + (productosComprados.unitCost * productosComprados.count) + productosComprados.currency + `</p>`
        cell5.innerHTML = `<td><a href="">Quitar</a></td>`;
        cell6.innerHTML = `<p id="mostrarTotalAPagar"> `


        subtotal+= productosComprados.unitCost * productosComprados.count;


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
    let inputsDatosEnvio= document.getElementsByName('flexRadioDefault');
    console.log(inputsDatosEnvio);
});

function calcularSubtotal() {
    var cantidad = document.getElementById("botonCantidad").value;
    var precio = boughtProducts.articles[0].unitCost;
    document.getElementById("mostrarSubtotal").innerHTML = cantidad * precio;
};


function mostrarFactura() {
    
    var imputDirección = document.getElementById("direcciónUsuario").value;
    var imputPaís = document.getElementById("paísUsuario").value;
    var avisoError = document.getElementById("avisoError");
    var inputOp1 = document.getElementById("oPremium");
    var inputOp2 =  document.getElementById("oExpress");
    var inputOp3 =  document.getElementById("oStandard");
    var botonPagar = document.getElementById("botonFormaPago");

    if (imputDirección !== '' && imputPaís !== '' && (inputOp1.checked || inputOp2.checked || inputOp3.checked)) {
        botonPagar.style.display = "block";
        avisoError.style.display = "none";
    
    }
    else {
        avisoError.style.display = "block";
    };
};



function validarDeposito(){

    var deposito = document.getElementById('pagoDeposito');
    var cedula = document.getElementById('numeroCedulaDeposito');
    var avisopagar = document.getElementById('avisoPagarAbitab');
    var avisoerrorpagar = document.getElementById('avisoPagarAbitabError');
    var seccionPagoTarj = document.getElementById('seccionPagoTarj');
    var botonConfirmarDeposito = document.getElementById('botonConfirmarDeposito');
    var botonCompraFinal = document.getElementById('cierreCompra');

    if (deposito.checked == true && cedula.value !== ""){
    avisopagar.style.display = "block"; 
    botonCompraFinal.style.display = "block";
    avisoerrorpagar.style.display = "none";
    seccionPagoTarj.style.display = "none";
    botonConfirmarDeposito.style.display = "none";
}
        else {
            avisoerrorpagar.style.display = "block";
        };
    };

function validarTarjeta(){

var tarjeta = document.getElementById('tarjeta');
var nombreyapellido = document.getElementById('nombreyapellido');
var numeroTarjeta = document.getElementById('numeroTarjeta');
var vencimiento = document.getElementById('vencimiento');
var numVerificador = document.getElementById('numverificador');
var errorPagoTarjeta = document.getElementById('avisoErrorPagoTarj');
var seccionPagoDep = document.getElementById('seccionPagoDep');
var botonCompraFinal = document.getElementById('cierreCompra');
var botonConfirmarTarj = document.getElementById('botonConfirmarTarj');

if (tarjeta.checked == true || nombreyapellido.value !== "" || numeroTarjeta.value !== ""
 || vencimiento.value !== "" || numVerificador.value !== ""){
    
    botonCompraFinal.style.display = "block";
    seccionPagoDep.style.display = "none";
    botonConfirmarTarj.style.display = "none";
    errorPagoTarjeta.style.display = "none";

} else {
    errorPagoTarjeta.style.display = "block";
    
};
};



function sumarCostoTotal(){
    var envio= document.getElementsByName("flexRadioDefault");
  for(let i = 0; i < envio.length; i++){
     if (envio[i].checked){
  let valorenvio = envio[i].value;
  let sumaenvio= subtotal * valorenvio;
  document.getElementById("mostrarTotalAPagar").innerHTML= (sumaenvio * 1.22).toFixed(2); 
     };
 };
 };


 document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(CART_BUY_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            mensajeExito = resultObj.data.msg;
        }
    });
});

function showMensajeFinal(){

    alert(mensajeExito);
    console.log(mensajeExito);
};