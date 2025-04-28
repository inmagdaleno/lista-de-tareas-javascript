// Esto selecciona el boton de añadir tarea y le crea un evento
// para que cuando se haga click en el botón se ejecute la función de crear tarea
document.getElementById("buttonAdd").addEventListener('click', crearTarea);

// Ahora vamos a crear la función crear tarea

function crearTarea(){

    // 1º hay que leer los datos del input

    let textoTarea = document.getElementById("inputTarea").value; 
    let tipoTarea = document.getElementById("tipoTarea").value; 

    // 2º hay que comprobar que hay datos y no que está vacío

    textoTarea = textoTarea.trim(); /**el trim es para eliminar los espacios innecesarios que se hayan añadido al escribir, al principio o al final */

    /** Entonces añadimos un condicional si la tarea es igual a un string vacío, para verificar que han introducido algún dato */

    if(textoTarea === ""){ 
        // Si la tarea está vacía, se muestra el siguiente mensaje
        document.getElementById("error").textContent = "No has introducido ninguna tarea";
        // Aqui finaliza la ejecución de esta función
        return;
    }
    // Si llegamos hasta aquí es porque textoTarea contiene un string con datos

    // Si hay datos, borramos el mensaje de error de la siguiente tarea
    document.getElementById("error").textContent = "";
    
    // 3º crear un li con la tarea y añadir el ul.
    //* para añadir un boton para eliminar la tarea es necesario crearlo desde javascript porque no sabemos cuantas tareas va a haber. 
    // Además si no javascript no lo reconoce como elemento porque tiene que acceder al elemento por el ID y aquí queremos que acceda a el por la classe, no el id
    /** Hasta ahora hemos modificado nodos que ya existian en html. ahora estamos creando un elemento en javascript para meterlo en el html */

    // Entonces, primero creamos un Objeto llamado Tarea
    const tarea = {
        texto: textoTarea,
        tipo: tipoTarea,
        realizada: false,
    }

    //Después añadimos el condicional para que se muestre un cuadradito de un color u otro, dependiendo de la prioridad de la tarea, a cada prioridad le asignamos un color Ahora queremos clasificar las tareas en base a su relevancia y diferenciarlas por colores: urgente: rojo / obligatorias: azul / opcionales: amarillo */
    //*Primero vamos a crear un elemento select en el html en el que incluyamos las 3 opciones de prioridad:

    let iconoTipo = "&#129001;";
        if(tarea.tipo === 'obligatoria'){
            iconoTipo = "&#128998;";
        }else if(tarea.tipo === 'urgente'){
            iconoTipo = "&#128997;";
        }

    // Para crear un li con la tarea y añadirla al ul, vamos a crear los elementos de la lista, su icono y su checkbox desde javascript y lo vamos a meter en el html
    // para ello creamos un <div> aqui con todos los elementos y luego le decimos que lo introduzca en HTML con la orden li.innerHTML
    // esto añade contenido al nodo li creado en el HTML
    // al texto vamos a crearle una clase con este <span> para luego poder decirle que sea solo el texto el que queremos tachar cuando se realice la tarea, 
    // si no tacha todos los elementos del div
    
    const li = document.createElement('li');
    li.innerHTML = `<div>
                    <input type="checkbox" class = "tareaRealizada">
                    ${iconoTipo} 
                    <span class ="texto-tarea">${tarea.texto}</span> 
                    </div>
                    <button class="eliminar">🗑️</button>`;

    // Ahora queremos que se borren los elementos de la lista que deseemos eliminar
    //* El querySelector sirve para selecionar ID y clases creadas en el html, si se selecciona una clase se pone ".clase", si se selecciona el ID se pone"#id".
    //  Al indicarle ".eliminar", selecciona toda la clase para eliminarla, no solo un elemento por su ID, pero solo borra el elemento que se selecciona, no todos los de su clase
    // y creamos una función que borre el elemento de la lista que queremos al hacer click en el botón eliminar
    li.querySelector('.eliminar').addEventListener('click', function(){ 
        li.remove();
    })

    // Esto añade el elemento li como hijo del elemento ul que hay en el HTML
    document.getElementById("listaTareas").appendChild(li);

    // ahora vamos a crear otro evento para cuando se selecciona el checkbox de tarea realizada, para que la tache o cambie de alguna forma su apariencia para que
    // diferenciemos cuando una tarea ha sido ya realizada. 
    // al checkbox le hemos creado una clase llamada tarea.Realizada para poder llamarlo desde el javascript

    li.querySelector('.tareaRealizada').addEventListener('click', function(){ 
    
    // pero primero debemos comprobar si está seleccionada o des-selecionada porque el evento es hacer click pero puede ser para ambas acciones, 
    // por lo que vamos a introducir un condicional, que si está seleccionada la opacidad sea del 40% y si no está seleccionada no cambie la opacidad
    // También le hemos añadido un style.textDecoration al texto de la tarea, con el span que hemos creado anteriormente, 
    // para que solo tache el texto del div y no todos los elementos del div

    if(li.querySelector('.tareaRealizada').checked){
        li.style.opacity = '0.4';
        li.querySelector('.texto-tarea').style.textDecoration = "line-through";
        tarea.realizada = true;
    }else{
        // Si no esta seleccionado el checkbox
        li.style.opacity = '1';
        li.querySelector('.texto-tarea').style.textDecoration = "none";
        tarea.realizada = false;
    }
    })
    
    document.getElementById("inputTarea").value = ''; /** esto es para que una vez introduzcamos un valor válido en la lista, se borre del input */
}

