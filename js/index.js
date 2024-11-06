
const HABITACIONES = [
    {
        nombre: "Habitación 1",
        descripcion: "Cama matrimonial",
        imagen: "./assets/pieza-1.jpg"
    },
    {
        nombre: "Habitación 2",
        descripcion: "cama matrimonial, cama de una plaza, cucheta",
        imagen: "./assets/pieza-2.jpg"
    },
    {
        nombre: "Habitación 3",
        descripcion: "cama matrimonial, cucheta",
        imagen: "./assets//pieza-3.jpg"
    }
    
];

const CARD_CONTAINER = document.getElementById('card-container');

HABITACIONES.forEach(habitacion => {
    const CARD = `
        <div class="col-md-4">
            <div class="card mb-4" style="background-color: rgb(253, 239, 214);">
                <img src="${habitacion.imagen}" class="card-img-top" alt="${habitacion.nombre}">
                <div class="card-body">
                    <h5 class="card-title"> ${habitacion.nombre}</h5>
                    <p class="card-text">${habitacion.descripcion}</p>
                    <a href="#" class="btn btn-primary">Mira más fotos</a>
                </div>
            </div>
        </div>
    `;

    CARD_CONTAINER.innerHTML += CARD;
});


const SERVICIOS = [
    {
        nombre: "Sala de estar - Cocina",
        descripcion: "Heladera, Microondas y vajilla, TV, Cable, Netflix y Wifi",
        imagen: "./assets/comedor.jpg"
    },
    {
        nombre: "Quincho",
        descripcion: "Equipado con asador",
        imagen: "./assets/asador.jpeg"
    },
    {
        nombre: "Cochera",
        descripcion: "Capacidad 2 autos",
        imagen: "./assets/cocheraAbierta.jpg"
    }
    
];

const CARD_CONTAINER2 = document.getElementById('card-container2');

SERVICIOS.forEach(servicio => {
    const CARD = `
        <div class="col-md-4">
            <div class="card mb-4">
                <img src="${servicio.imagen}" class="card-img-top" alt="${servicio.nombre}">
                <div class="card-body">
                    <h5 class="card-title"> ${servicio.nombre}</h5>
                    <p class="card-text">${servicio.descripcion}</p>
                    <a href="#" class="btn btn-primary">Mira más fotos</a>
                </div>
            </div>
        </div>
    `;

    CARD_CONTAINER2.innerHTML += CARD;
});

let nombresMes = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];

let fechaActual = new Date ();
let diaActual = fechaActual.getDate();
let mesNumero = fechaActual.getMonth();
let anioActual = fechaActual.getFullYear();

let data = document.getElementById('data');
let mes = document.getElementById('mes');
let anio = document.getElementById('anio');
let prevMesDom = document.getElementById ('prev-mes');
let nextMesDom = document.getElementById ('next-mes');



mes.textContent = nombresMes [mesNumero];
anio.textContent = anioActual.toString();

prevMesDom.addEventListener('click', ()=>lastMes());
nextMesDom.addEventListener('click', ()=>nextMes());   

calcularMes(mesNumero);


function calcularMes(mes){
    data.innerHTML = ''; 
    
     // Días del mes anterior
    for (let i = startDay(); i > 0; i--) {
        const diaPrevio = obtenerDiasTotalesMes(mesNumero - 1) - (i - 1);
        data.innerHTML += `<div class="calendarioDia calendarioUltimoDia" data-date="${anioActual}-${mesNumero}-${diaPrevio}">${diaPrevio}</div>`;
    }

    for (let i = 1; i <= obtenerDiasTotalesMes(mes); i++) {
        const claseHoy = (i === diaActual) ? "today" : "";
        data.innerHTML += `<div class="calendarioDia ${claseHoy}" data-date="${anioActual}-${mes + 1}-${i}">${i}</div>`;
    }

    seleccionarFecha();
}

let fechaInicio = null;
let fechaFinal = null;

function seleccionarFecha() {
    document.querySelectorAll('.calendarioDia').forEach(dia => {
        dia.addEventListener('click', (event) => {
            const clickedDate = new Date(event.target.dataset.date);

            if (!fechaInicio || (fechaInicio && fechaFinal)) {
                // Resetea el rango
                fechaInicio = clickedDate;
                fechaFinal = null;
                resetCalendario();
                event.target.classList.add('selected');
            } else if (clickedDate >= fechaInicio) {
                fechaFinal = clickedDate;
                marcarRango(fechaInicio, fechaFinal);
            }
        });
    });
}

function obtenerDiasTotalesMes(mes){
    if (mes === -1) mes = 11;
    if ([0, 2, 4, 6, 7, 9, 11].includes(mes)) return 31;
    if ([3, 5, 8, 10].includes(mes)) return 30;
    return isleap() ? 29 : 28;
}

function isleap(){
    return ((anioActual % 100 !==0) && (anioActual % 4 ===0) || (anioActual % 400 === 0));
}

function startDay(){
    let start = new Date(anioActual, mesNumero, 1);
    return (start.getDay() === 0) ? 6 : start.getDay();
}

function lastMes(){
    mesNumero = mesNumero === 0 ? 11 : mesNumero - 1;
    anioActual-= mesNumero === 11 ? 1 : 0;
    calcularNuevaFecha();
}

function nextMes(){
    mesNumero = mesNumero === 11 ? 0 : mesNumero + 1;
    anioActual += mesNumero === 0 ? 1 : 0;
    calcularNuevaFecha();
}

function calcularNuevaFecha(){
    fechaActual.setFullYear( anioActual, mesNumero, diaActual);
    mes.textContent = nombresMes[mesNumero];
    anio.textContent = anioActual.toString();
    data.textContent = ''; //controlar//
    calcularMes(mesNumero);
}

function marcarRango(fechaInicio, fechaFinal) {
    resetCalendario()
    document.querySelectorAll('.calendarioDia').forEach(dia => {
        const dayDate = new Date(dia.dataset.date);
        if (dayDate >= fechaInicio && dayDate <= fechaFinal) {
            dia.classList.add('selected-range');
        }
    });
}

function resetCalendario() {
    document.querySelectorAll('.calendarioDia').forEach(dia => {
        dia.classList.remove('selected', 'selected-range');
    });
}


let cantidadDePersonas = 0; // Inicializa la variable para almacenar la cantidad seleccionada

// Selecciona todos los elementos del dropdown y agrega un evento a cada uno
document.querySelectorAll('.dropdown-item').forEach(item => {
    item.addEventListener('click', (event) => {
        cantidadDePersonas = parseInt(event.target.textContent); // Actualiza cantidadDePersonas con el valor seleccionado
        document.getElementById("resultado").textContent = "Cantidad de personas seleccionadas: " + cantidadDePersonas;
    });
});

function fechaDeReserva (fechaInicio, fechaFinal){

    const unDiaDeEstadiaEnMil = 24 * 60 * 60 * 1000;
    const diferenciaDeEstadiaMil = fechaFinal - fechaInicio;

    return Math.round (diferenciaDeEstadiaMil / unDiaDeEstadiaEnMil);
}

let reservarBtn = document.getElementById('reservarBtn');

reservarBtn.addEventListener('click', () => {
    if (fechaInicio && fechaFinal) {
        reservar(); // Llama a la función de reservar si las fechas están seleccionadas
    } else {
        alert("Por favor, selecciona un rango de fechas válido.");
    }
});


function reservar() {
     // Calcular el número de días basado en las fechas seleccionadas
     let cantidadDias = fechaDeReserva(fechaInicio, fechaFinal); // Usa esta función para calcular días
        document.getElementById("cantidadDias").textContent = "Cantidad de días: " + cantidadDias;
    
    if (cantidadDias <= 0) {
        alert("Selecciona un rango válido de fechas.");
        return; // Salir de la función si no es un rango válido
    }

    let costoPorDia = 10000;
    let costoMinimo = costoPorDia * 3;
    let costoTotal;

    if (cantidadDePersonas <= 3) {
         costoTotal = costoMinimo * cantidadDias;
    } else {
         costoTotal = (costoPorDia * cantidadDePersonas) * cantidadDias;
    }
    document.getElementById("costoTotal").textContent = "El costo total de la estadía es: $" + costoTotal;
    

const RESERVA = {
    dias: cantidadDias,
    personas: cantidadDePersonas,
    total: costoTotal
};

localStorage.setItem("RESERVA", JSON.stringify(RESERVA));

}