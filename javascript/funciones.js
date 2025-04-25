// creamos un evento a un botón
// document.getElementById("buttonAdd").addEventListener('click', function);

document.getElementById("buttonAdd").addEventListener('click', crearTarea);

function crearTarea(){
    // 1º leer los datos del input

    let tarea = document.getElementById("inputTarea").value; 

    // 2º comprobar que hay datos

    tarea = tarea.trim();
    if(tarea === ""){ /** Condicional: si tarea igual a tarea vacía */
        // se muestra un mensaje
        document.getElementById("error").textContent = "No has introducido ninguna tarea";
        return;
    }

    // 3º crear un li con la tarea y añadir al ul.
    //* para añadir un boton para eliminar la tarea es necesario crearlo desde javascript porque no sabemos cuantas tareas va a haber. 
    // Además si no javascript no lo reconoce como elemento porque tiene que acceder al elemento por el ID y aquí queremos que acceda a el por la classe, no el id
    /** Hasta ahora hemos modificado nodos que ya existian en html. ahora estamos creando un elemento en javascript para meterlo en el html */

    const li = document.createElement('li');
    li.innerHTML = `${tarea}
                    <button class="eliminar">🗑️</button>`;

    //* esto sirve para selecionar ID y clases tambien.
    //  Al indicarle ".eliminar", selecciona toda la clase para eliminarla, no solo un elemento por su ID, pero solo borra el elemento que se selecciona, no todos los de su clase
    li.querySelector('.eliminar').addEventListener('click', function(){ 
        li.remove();
    })

    document.getElementById("listaTareas").appendChild(li);

    
    document.getElementById("inputTarea").value = ''; /** esto para que una vez introduzcamos un valor en la lista se borre del input */
    
}

//* Vamos a crear otro archivo para este mismo ejercicio: funciones2. Porque ahora vamos a modificar el código bastante, así que para poder volver aquí cuando no funcione no lo vamos a machacar