// colores
const colorUrgente ='#128997';
const colorObligatorio = "#128998";
const colorOpcional = "#129001";


document.getElementById("buttonAdd").addEventListener('click', crearTarea);

function crearTarea(){
    // 1º leer los datos del input

    let textoTarea = document.getElementById("inputTarea").value; 
    let tipoTarea = document.getElementById("tipoTarea").value; 

    // 2º comprobar que hay datos

    textoTarea = textoTarea.trim();
    if(textoTarea === ""){ /** Condicional: si tarea igual a tarea vacía */
        // se muestra un mensaje
        document.getElementById("error").textContent = "No has introducido ninguna tarea";
        return;
        
    }

    document.querySelector('#error').textContent = '';
    
    // 3º crear un li con la tarea y añadir al ul.
    //* para añadir un boton para eliminar la tarea es necesario crearlo desde javascript porque no sabemos cuantas tareas va a haber. 
    // Además si no javascript no lo reconoce como elemento porque tiene que acceder al elemento por el ID y aquí queremos que acceda a el por la classe, no el id
    /** Hasta ahora hemos modificado nodos que ya existian en html. ahora estamos creando un elemento en javascript para meterlo en el html */

    // Vamos a crear un Objeto Tarea
    const tarea = {
        texto: textoTarea,
        tipo: tipoTarea,
        realizada: false,
    }

    let iconoTipo = "&#129001;";
        if(tarea.tipo === 'obligatoria'){
            iconoTipo = "&#128998;";
        }else if(tarea.tipo === 'urgente'){
            iconoTipo = "&#128997;";
        }

    // crear un li con la tarea y añadirla al ul, vamos a crear los elementos de la lista, su icono y su checkbos desde javascript y lo vamos a meter en el html
    const li = document.createElement('li');
    li.innerHTML = `
                    <div>
                    <input type="checkbox" class = "tareaRealizada">
                    ${iconoTipo} 
                    ${tarea.texto} 
                    </div>
                    <button class="eliminar">🗑️</button>`;

    //* esto sirve para selecionar ID y clases tambien.
    //  Al indicarle ".eliminar", selecciona toda la clase para eliminarla, no solo un elemento por su ID, pero solo borra el elemento que se selecciona, no todos los de su clase
    li.querySelector('.eliminar').addEventListener('click', function(){ 
        li.remove();
    })

    // ahora vamos a crear otro evento para cuando se selecciona el checkbox de tarea realizada, para que la tache o cambie de alguna forma su apariencia para que
    // diferenciemos cuando una tarea ha sido ya realizada.

    li.querySelector('.tareaRealizada').addEventListener('click', function(){ 
    
    // pero primero debemos comprobar si está seleccionada o des-selecionada porque el evento es hacer click pero puede ser para ambas acciones, 
    // por lo que vamos a introducir un condicional, que si está seleccionada la opacidad sea del 40% y si no está seleccionada no cambie la opacidad

    if(li.querySelector('.tareaRealizada').checked){
        li.style.opacity = '0.4';
        tarea.realizada = false;
    }else{
        li.style.opacity = '1';
        tarea.realizada = true;
    }
    })
    

    document.getElementById("listaTareas").appendChild(li);

    
    document.getElementById("inputTarea").value = ''; /** esto para que una vez introduzcamos un valor en la lista se borre del input */
}

/**Ahora queremos clasificar las tareas en base a su relevancia y diferenciarlas por colores: urgente: rojo / obligatorias: azul / opcionales: amarillo */
//*Primero vamos a crear un elemento select en el html en el que incluyamos las 3 opciones de prioridad:
// Primero vamos a crear un objeto tarea que incluya el texto de la tarea y el tipo de tarear que es:
