//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    obtenerUsuario()
});
//const formulario = document.getElementById('form')
var usuario = document.getElementById('username'); //Variable que toma el id de el imput donde se ingresa el correo
var contraseña = document.getElementById('password'); //Variable que toma el id del imput donde se ingresa la contraseña
var ingresodatos = document.getElementById('completardatos');

function redireccionar(){ //Función para cambiar navergar hacia el index.html si se completan los datos
    
    if(usuario.value !== '' && contraseña.value !== ''){//Condición lógica
        //localStorage.setItem("usuario",usuario.value);
        sessionStorage.setItem("usuario",usuario.value);
        location.replace("index.html");//Redirección
    }
    else {
    ingresodatos.style.display = "block"; //Se muestra el mensaje de error
    
    }
}

function obtenerUsuario(){
    var nombreUsuario = sessionStorage.getItem("usuario")
    document.getElementById('obtenerUsuario').innerHTML= nombreUsuario
}

