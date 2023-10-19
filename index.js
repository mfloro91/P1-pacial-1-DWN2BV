//ARRAYS 

let discos = [];
let duracionesDiscos = [];

//OBJETOS

/* El objeto DISCO va a tener las siguientes propiedades
    - Nombre del disco.
    - Autor o banda del disco.
    - Código numérico único del disco
    - Todas las pistas del disco, donde cada pista tiene:
        - un nombre 
        - una duracion

*/


//********** FUNCIONES **********************************************************************************************

function cargarDisco () {

    let disco = {};

    let nombre = validarString("Ingresá el nombre del disco");
    disco.nombre = nombre;
    let banda = validarString("Ingresá el nombre de la banda");
    disco.banda = banda;
    let codigo = validarCodigo("Ingresá el código del disco");
    disco.codigo = codigo;

    disco.pistas = [];

    do {
    let pista = cargarPistas (); 
    disco.pistas.push(pista);   
    } while (confirm("¿Querés cargar otra pista?"));


    // Calculo la duracion total del disco

    let totalDuracion = 0;

        for(let pista of disco.pistas) {
            totalDuracion += pista.duracion;
        }
 
        duracionesDiscos.push(totalDuracion); 


    // Hago un método para mostrar cada Disco que se guarde

    disco.mostrar = function() {
    
        const cardCD = document.getElementById("cardCD");

        let html = "";


        // Elijo el color de fondo al azar

        let colorRandom = Math.floor(Math.random() * 2);
        
        // Calculo el disco más largo

        let max = 0;

    
        for (i in duracionesDiscos) {
            if (duracionesDiscos[i] >= max) {
            max = duracionesDiscos[i];
            ganador = discos[i].nombre;
            }
        }


        // Imprimo el header de la card

        html+=

        `
        <a href="">
        <div class="card cardCd me-2 mb-2" style="width: 20rem;">
            <div class="card-body cardTitle${colorRandom}">
        `

        // Distingo el más largo

        if (this.nombre == ganador) {
        
        html +=
        `
            <div class="row">
                    <p class="card-text col-9 h3"> ${this.nombre.toUpperCase()} <img src="./imagenes/iconoLargo.png" alt="resaltador cd más largo"> </p>

        `
               
        } else {

        html += 
        
        `
        <div class="row">
                    <p class="card-text col-9 h3"> ${this.nombre.toUpperCase()}</p>

        `
        }

        html+=
        `           
                    <p class="card-text col-3 h5"># ${this.codigo}</p>
                    <p class="card-text col-12 h6"> ${this.banda.toUpperCase()} · ${this.pistas.length} pistas · ${totalDuracion} segundos </p>
                </div>
            </div>
               
            <div class="card-body">
                <div class="row">
                    <p class="card-text col-2">#</p>
                    <p class="card-text col-6">Título</p>
                    <p class="card-text col-4"> <img src="./imagenes/iconoReloj.png" alt="icono reloj"></p>

                    <hr>
        `
    
        // Imprimo las pistas

        // Busco la canción más larga

        let maxCancion = 0;
            let cancionGanadora = "";

                for (let pista of disco.pistas) {
                
                    if (pista.duracion > maxCancion) {
                        maxCancion = pista.duracion;
                        cancionGanadora = pista.titulo;
                    }
                }

        let numeroPista = 0;

        for(let pista of this.pistas) {
            numeroPista ++;

            if(pista.titulo == cancionGanadora) {
                html += 
        
                `
                    <p class="card-text col-2 red">${numeroPista}</p>
                    <p class="card-text col-6 red">${pista.titulo}</p>
                `
            } else {

                html+=
                `
                <p class="card-text col-2">${numeroPista}</p>
                <p class="card-text col-6">${pista.titulo}</p>
                `

            }
            

            if (pista.duracion > 180) {
                html +=

                `
                <p class="card-text col-4 red">${pista.duracion}</p>

                `

            } else {
                
                html +=

                `
                <p class="card-text col-4">${pista.duracion}</p>
                `

            }

        }

        // Cierro el HTML

        html +=     
        `          
                </div>
            </div>
        </div>
        </a> 
        `  

        cardCD.innerHTML += html;
        
    }
      

    // Cargo el disco al Array
    discos.push(disco); 

    // Le muestro al usuario cuántos discos guardó
    alert(`Discos cargados: ${discos.length}`);

}

function cargarPistas () {
    let pista = {};

    let titulo = validarString("Ingrese el título de la pista");
    pista.titulo = titulo;
    let duracion = validarDuracion("Ingresá la duración en segundos");
    pista.duracion = duracion;

    return pista;
}

// Si el título de la pista aparece en rojo: es la más larga del disco
// Si la duración de la pista aparece en rojo: supera los 180 segundos 
// Si el disco tiene un marcador rojo, ¡es el más largo de tu biblioteca!

function mostrarDiscos() {

    // Podría haber una función que limpie el código para optimizar

    const cardCD = document.getElementById("cardCD");
    cardCD.innerHTML = "";

    for(let i in discos) {
      discos[i].mostrar();
    }

    // Si el usuario aprieta el botón mostrar más de una vez, se borra la info del html (evita reproducir el código)

    contadorMostrar = 0;
    contadorMostrar++;

    if (contadorMostrar == 1) {
        const infoUsuario = document.getElementById("infoUsuario");
        infoUsuario.innerHTML = "";
    } 

    calcularPromedio();
    
}

function buscarDisco(inputCodigo) {
    
    inputCodigo = parseInt(prompt("Ingrese el código de búsqueda"));
    let discoExistente;

    
    for(let disco of discos) {
        if (inputCodigo === disco.codigo) {
            const cardCD = document.getElementById("cardCD");
            cardCD.innerHTML = "";
            disco.mostrar();
            discoExistente = true;
        } 
    } 

    
    if (!discoExistente) {
        alert("No se encontraron discos con ese código");
    } 


    if (isNaN(inputCodigo)) {
        alert("Si quiere buscar un disco, ingrese solo el código numérico");
    } else if (discos.length == 0) {
        alert("No hay discos cargados");
    }
}

function calcularPromedio () {
 
        // Calculo el promedio total

        let suma = 0;
        let htmlUsuario = "";
        
        for (duracion of duracionesDiscos) {
        suma += duracion;
        }
        
        let promedio = suma / duracionesDiscos.length;
  

        // Imprimo en html
        
        const infoUsuario = document.getElementById("infoUsuario");

        if (discos.length < 1) {
            htmlUsuario +=
            `
            <p class="alert"> No tiene discos cargados </p>
            
            `  
        } else {
        
        htmlUsuario +=
        `
        <p class="alert">El promedio de duración de tus discos es de ${promedio} segundos </p>
        
        `
        }

        infoUsuario.innerHTML += htmlUsuario;
   
}




//********** FUNCIONES VALIDADORAS **********************************************************************************************

//VALIDADOR DE TEXTOS

function validarString (mensaje) {

    let string;

    do {
    string = prompt(mensaje);

        if (!isNaN(string)){
            condicion = true;
            alert("Debe ingresar texto");
        } else if (string === null) {
            condicion = true;
            alert("Debe ingresar un valor, no puede dejar el campo vacío");
        } else {
            condicion = false;
        }
    } while(condicion);
    
    return string;
}

//VALIDADOR DE DURACION: contiene un alert para cada tipo de error

function validarDuracion (mensaje) {
    let duracion;

    do {
    duracion = parseInt(prompt(mensaje));

        if (isNaN(duracion)) {
            condicion = true;
            alert("Debe ingresar un valor numérico");
        } else if (duracion === null) {
            condicion = true;
            alert("Debe ingresar un valor, no puede dejar el campo vacío");
        } else if (duracion > 7200 || duracion < 0) {
            condicion = true;
            alert("La duración ingresada debe estar entre 0 y 7200 segundos");
        } else {
            condicion = false;
        }

    } while (condicion);

    return duracion;
}


// VALIDAR CODIGO: Usa 2 funciones -> validar numero del codigo + validar codigo nuevo

function validarCodigo (mensaje) {
    let codigo;

    do {
    codigo = parseInt(prompt(mensaje));

        if (validarNumeroCodigo(codigo)) {
            condicion = true;
        } else if (validarCodigoNuevo(codigo)) {
            condicion = true;
        } else {
            condicion = false;
        }

    } while (condicion);

    return codigo;
}

// VALIDAR NUMERO DEL CODIGO: Se fija que el codigo sea un numero y que esté entre 1 y 999

function validarNumeroCodigo (codigo) {

        if (isNaN(codigo)) {
            alert("Debe ingresar un valor numérico");
            return true;
        } else if (codigo === null) {
            alert("Debe ingresar un valor, no puede dejar el campo vacío");
            return true;
        } else if (codigo > 999 || codigo < 1) {
            alert("El código debe ser mayor a 0 y menor a 1.000");
            return true;
        } 

    return false;
};

// VALIDAR CODIGO NUEVO: recorre el array y se fija que el código no exista aún 

function validarCodigoNuevo (codigo) {
    

        for (let disco of discos) {

            if (codigo === disco.codigo) {
                alert("Error: el código no pueden repetirse");
                return true;             
            }
        }

    return false;
}


/******** CODIGO HTML PARA LAS CARDS

<div class="card cardCd me-2 mb-2" style="width: 20rem;">
    <div class="card-body cardTitlePop">
        <div class="row">
            <p class="card-text col-9 h3">Cd II <span class="badge bg-largest">Largest</span></p>
            <p class="card-text col-3 h5">#01</p>
            <p class="card-text col-12 h6">Banda · 2012 · 10 canciones · 41 min. </p>
        </div>
    </div>
               
    <div class="card-body">
        <div class="row">
            <p class="card-text col-2">#</p>
            <p class="card-text col-6">Título</p>
            <p class="card-text col-4"> <img src="./imagenes/iconoReloj.png" alt="icono reloj"></p>

            <hr>
                  
            <p class="card-text col-2">1</p>
            <p class="card-text col-6">Agua marfil</p>
            <p class="card-text col-4"> 2 min.</p>
                 
            <p class="card-text col-2">2</p>
            <p class="card-text col-6">La luna patas para arriba</p>
            <p class="card-text col-4"> 4 min.</p>
                  
            <p class="card-text col-2">3</p>
            <p class="card-text col-6">Halo</p>
            <p class="card-text col-4"> 1 min.</p>
            
            <p class="card-text col-2">4</p>
            <p class="card-text col-6">No sé cómo llamar</p>
            <p class="card-text col-4"> 6 min.</p>
        </div>
    </div>
</div>
  
 
 */




