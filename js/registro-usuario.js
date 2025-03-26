const inputCorreo = document.getElementById("txtCorreo");
const inputCedula = document.getElementById("txtCedula");
const inputNombre = document.querySelector("#txtNombre");
const inputContrasena = document.querySelector("#txtContrasena");
const btnGuardar = document.querySelector("#btnGuardar");

const inputsRequeridos = document.querySelectorAll('input[required]');

function validar() {
    let error = false;
    for (let i = 0; i < inputsRequeridos.length; i++){
        if (inputsRequeridos[i].value == ""){
            inputsRequeridos[i].classList.add('error');
            error = true;
        } else {
            inputsRequeridos[i].classList.remove('error');
        }
    }

    if(error == false){
        registrarUsuario();
    } 
}

function registrarUsuario(){
    const datosUsuario = {
        correo: inputCorreo.value,
        cedula: inputCedula.value,
        nombre: inputNombre.value,
        contrasena: inputContrasena.value
    };
    fetch("http://localhost:3000/usuarios", {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(datosUsuario)
    }).then(response => {
        if (response.ok) {
            Swal.fire({
                icon: "success",
                title: "Usuario registrado",
                text: "El usuario ha sido registrado con éxito"
            });
        } else {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "No se pudo registrar el usuario"
            });
        }
    })
    .catch(error => {
        console.log(error);
    });
    
}



btnGuardar.addEventListener('click', validar);