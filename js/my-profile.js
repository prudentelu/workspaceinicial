const obj = { nombre: "", edad: "", email: "", telefono: "" };
const myJSON = JSON.stringify(obj);
var editar = document.getElementById('editarPer');
var guardar = document.getElementById('guardarPer');
var avisoError = document.getElementById('avisoError')

nombre = document.getElementById('name');
edad = document.getElementById('botonedad');
email = document.getElementById('email');
telefono = document.getElementById('tel');


function guardarDatosPerfil() {

    localStorage.setItem("datos", myJSON);
    var obj = localStorage.getItem("datos");
    var objetoDatos = JSON.parse(obj);

    objetoDatos.nombre = document.getElementById('name').value;
    objetoDatos.edad = document.getElementById('botonedad').value;
    objetoDatos.email = document.getElementById('email').value;
    objetoDatos.telefono = document.getElementById('tel').value;



if (objetoDatos.nombre !== '' && objetoDatos.edad !== '' &&objetoDatos.mail !== '' 
&& objetoDatos.telefono !== ''){

    obj = JSON.stringify(objetoDatos);
    localStorage.setItem("datos", obj);


    guardar.style.display = "none";
    editar.style.display = "block";
    avisoError.style.display = "none"
    window.location.href = 'my-profile.html'
    
} else{
 avisoError.style.display = "block";};

};



function obtenerDatos() {

    var objeto = localStorage.getItem("datos")
    var dataUser = JSON.parse(objeto);

    document.getElementById('name').value = dataUser.nombre;
    document.getElementById('botonedad').value = dataUser.edad;
    document.getElementById('email').value = dataUser.email;
    document.getElementById('tel').value = dataUser.telefono;

    nombre.setAttribute("disabled",true);
    edad.setAttribute("disabled",true);
    email.setAttribute("disabled",true);
    telefono.setAttribute("disabled",true);

    guardar.style.display = "none";
    editar.style.display = "block";

};


function editarDatos(){
    
    nombre.removeAttribute("disabled",true)
    edad.removeAttribute("disabled",true);
    email.removeAttribute("disabled",true);
    telefono.removeAttribute("disabled",true);

    guardar.style.display = "block";
    editar.style.display = "none";
}


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {

    obtenerDatos();
});