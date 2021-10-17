var product = {};
var coment = {};
var relatedProducts = [];

function showImagesGallery(array) {

    let htmlContentToAppend = "";

    for (let i = 0; i < array.length; i++) {
        let imageSrc = array[i];

        htmlContentToAppend += `
        <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">
                <img class="img-fluid img-thumbnail" src="` + imageSrc + `" alt="">
            </div>
        </div>
        `

        document.getElementById("productImagesGallery").innerHTML = htmlContentToAppend;
    };
};


function showcoments(array) {

    let htmlContentToAppend = "";

    for (let i = 0; i < array.length; i++) {
        let coment = array[i];

        let star = `<span class="fa fa-star checked"></span>`
        let starBlack = `<span class="fa fa-star"></span>`
        let score = star.repeat(coment.score);
        let scoreBlack = starBlack.repeat(5 - coment.score);

        htmlContentToAppend += `
        <a href="product-info.html" class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                    <h4 class="mb-1">`+ coment.user + `</h4>
                    <small class="text-muted">` + score + scoreBlack + `</small>
                </div>
                <p class="mb-1">` + coment.description + `</p>
                <small class="text-muted">` + coment.dateTime + `</small>
            </div>
        </div>
    </a>
    `
        document.getElementById("mostrarComentarios").innerHTML = htmlContentToAppend;
    }
}






//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCT_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            product = resultObj.data;

            let productNameHTML = document.getElementById("categoryName");
            let productDescriptionHTML = document.getElementById("categoryDescription");
            let productCountHTML = document.getElementById("productCount");
            let productCostHTML = document.getElementById("productCriteria");


            productNameHTML.innerHTML = product.name;
            productDescriptionHTML.innerHTML = product.description;
            productCountHTML.innerHTML = product.soldCount;
            productCostHTML.innerHTML = product.cost + ' ' + "USD";

            //Muestro las imagenes en forma de galería
            showImagesGallery(product.images);
        }
    });
});

document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            coment = resultObj.data;

            //Muestro lo comentarios
            showcoments(coment);
        }
    });
});

function sendComent() {
    let htmlContentToAppend = "";
    let comentarioHTML = document.getElementById("comentDescription").value;
    let scoreHTML = document.getElementById("comentScore").value;
    let userHTML = sessionStorage.getItem('usuario');
    let star = `<span class="fa fa-star checked"></span>`
    let starBlack = `<span class="fa fa-star"></span>`
    let score = star.repeat(scoreHTML);
    let scoreBlack = starBlack.repeat(5 - scoreHTML);
    var hoy = new Date();
    var dateTime = hoy.getFullYear() + '-' + "0" + hoy.getMonth() + '-' + hoy.getDay() + '  ' + hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
    var ingresodatos = document.getElementById('completardatos')

    if (comentarioHTML !== "" && scoreHTML !== 0) {
        htmlContentToAppend += `
        <a href="product-info.html" class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                    <h4 class="mb-1">`+ userHTML + `</h4>
                    <small class="text-muted">` + score + scoreBlack + `</small>
                </div>
                <p class="mb-1">` + comentarioHTML + `</p>
                <small class="text-muted">` + dateTime + `</small>
            </div>
        </div>
    </a>
    `
    }
    else {

        ingresodatos.style.display = "block"; //Se muestra el mensaje de error

    }

    document.getElementById("mostrarComentarios").innerHTML += htmlContentToAppend;
}

// Función para mostrar los productos relacionados 

function showRelatedProducts(array) {

    let htmlContentToAppend = "";


    for (let i = 0; i < array.length; i++) {
        let productosRelacionados = array[i];
        if (i == 1 || i == 3) {

            htmlContentToAppend += `
            <a href="product-info.html" class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="` + productosRelacionados.imgSrc + `" alt="` + productosRelacionados.description + `" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1">`+ productosRelacionados.name +`</h4>
                        <small class="text-muted">` + productosRelacionados.cost + ` USD</small> 
                    </div>
                    <p class="mb-1">` + productosRelacionados.description + `</p>
                </div>
            </div>
        </a>
        `
        };

        document.getElementById("relatedProducts").innerHTML = htmlContentToAppend;

    };
};

document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") 
        {
            relatedProducts = resultObj.data;

            //Muestro los productos
            showRelatedProducts(relatedProducts);
        };
    });
});