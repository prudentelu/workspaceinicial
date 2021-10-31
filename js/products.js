//var productsArray = [];

const ORDER_ASC_BY_COST = "Menosamás";
const ORDER_DESC_BY_COST = "Masamenos";
const ORDER_BY_PROD_COST = "Cant.";
const ORDER_BY_SOLD_COUNT = "Relevancia"; //Variable para explorar el atributo soldCount del Json de products
const ORDER_BY_STRING = "Valor"; // variable creada para ordenar por búsqueda

var currentProductsArray = [];
var currentSortCriteria = undefined;
var minCost = undefined;
var maxCost = undefined;

function sortProducts(criteria, array){
    let result = [];
    if (criteria === ORDER_ASC_BY_COST) //CAMBIO NAME POR COST EN LINEAS 15 18 Y 19
    {
        result = array.sort(function(a, b) {
            if ( a.cost < b.cost ){ return -1; }
            if ( a.cost > b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_DESC_BY_COST){ //CAMBIO NAME POR COST LINEAS 22 24 Y 25
        result = array.sort(function(a, b) {
            if ( a.cost> b.cost ){ return -1; }
            if ( a.cost < b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_BY_SOLD_COUNT){
        result = array.sort(function(a, b) {
            let asoldCount = parseInt(a.soldCount);
            let bsoldCount = parseInt(b.soldCount);

            if ( asoldCount > bsoldCount ){ return -1; }
            if ( asoldCount < bsoldCount ){ return 1; }
            return 0;
        });
    }

    return result;
}

function showProductList(){

    let htmlContentToAppend = "";
    for(let i = 0; i < currentProductsArray.length; i++){
        let producto = currentProductsArray[i];

        if (((minCost == undefined) || (minCost != undefined && parseInt(producto.cost) >= minCost)) &&
        ((maxCost == undefined) || (maxCost != undefined && parseInt(producto.cost) <= maxCost))){


        htmlContentToAppend += `
          
            <div class="col-md-4">
              <a href="categories.html" class="card mb-4 shadow-sm custom-card">
                <img class="bd-placeholder-img card-img-top"  src="` + producto.imgSrc + `" alt="">
                <h3 class="m-3">`+ producto.name +`</h3>
                
                <div class="card-body">
                <small class="text-muted">` + producto.cost + ` USD</small>
                  <p class="card-text">` + producto.description + `</p>
                  <small class="text-muted">` + producto.soldCount + ` Vendidos</small> 
                </div>
              </a>
            </div>
           
        `
    }

    document.getElementById("cat-list-container").innerHTML = htmlContentToAppend;
}
};

function sortAndShowProducts(sortCriteria, productsArray){
    currentSortCriteria = sortCriteria;

    if(productsArray != undefined){
        currentProductsArray = productsArray;
    }

    currentProductsArray = sortProducts(currentSortCriteria, currentProductsArray);

    //Muestro los productos ordenadas
    showProductList();
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            sortAndShowProducts(ORDER_ASC_BY_COST, resultObj.data); //CAMBIO NAME POR COST
        }
    });

    document.getElementById("sortAsc").addEventListener("click", function(){
        sortAndShowProducts(ORDER_ASC_BY_COST); //CAMBIO NAME POR COST
    });

    document.getElementById("sortDesc").addEventListener("click", function(){
        sortAndShowProducts(ORDER_DESC_BY_COST); //CAMBIO NAME POR COST
    });

    document.getElementById("sortBySoldCount").addEventListener("click", function(){
        sortAndShowProducts(ORDER_BY_SOLD_COUNT);
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function(){
        document.getElementById("rangeFilterCostMin").value = "";
        document.getElementById("rangeFilterCostMax").value = "";

        minCost = undefined;
        maxCost = undefined;

        showProductList();
    });

    document.getElementById("rangeFilterCost").addEventListener("click", function(){
        //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
        //de productos por categoría.
        minCost = document.getElementById("rangeFilterCostMin").value; //cambie count por cost
        maxCost = document.getElementById("rangeFilterCostMax").value;//cambie count por cost

        if ((minCost != undefined) && (minCost != "") && (parseInt(minCost)) >= 0){
            minCost = parseInt(minCost);
        }
        else{
            minCost = undefined;
        }

        if ((maxCost != undefined) && (maxCost != "") && (parseInt(maxCost)) >= 0){
            maxCost = parseInt(maxCost);
        }
        else{
            maxCost = undefined;
        }

        showProductList();
    });
});

