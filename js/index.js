
const CARD_CONTAINER = document.getElementById('card-container');

    async function miJson () {

        try {
            const response = await fetch('../datos.json');
            const dataJson = await response.json();
            const HABITACIONES = dataJson.HABITACIONES;

            HABITACIONES.forEach(habitacion => {
                const CARD = `
                    <div class="col-md-4">
                        <div class="card mb-4" style="background-color: rgb(253, 239, 214);">
                            <img src="${habitacion.imagen}" class="card-img-top" alt="${habitacion.nombre}">
                            <div class="card-body">
                                <h5 class="card-title"> ${habitacion.nombre}</h5>
                                <p class="card-text">${habitacion.descripcion}</p>
                            </div>
                        </div>
                    </div>
                `;

                CARD_CONTAINER.innerHTML += CARD;
            })
        }
        catch (error) {
            console.error('hay un error');
        }
    }

    
    miJson();

const CARD_CONTAINER2 = document.getElementById('card-container2');

    async function miJson2 () {

        try {
            const response = await fetch('../datos.json');
            const dataJson2 = await response.json();
            const SERVICIOS = dataJson2.SERVICIOS;

        SERVICIOS.forEach((servicio, index) => {
            const CARD = `
                <div class="col-md-4">
                    <div class="card mb-4">
                        <img src="${servicio.imagen}" class="card-img-top" alt="${servicio.nombre}">
                        <div class="card-body">
                            <h5 class="card-title"> ${servicio.nombre}</h5>
                            <p class="card-text">${servicio.descripcion}</p>
                            <button class="btn btn-primary" data-index="${index}" onclick="mostrarMasFotos(${index})">Mira más fotos</button>
                        </div>
                    </div>
                </div>
            `;

            CARD_CONTAINER2.innerHTML += CARD;
        });

        }
        catch (error) {
            console.error('hay un error');
        }
        }
        function mostrarMasFotos(index) {
            console.log('Index recibido:', index);
        
            fetch('../datos.json')
                .then(response => {
                    console.log('Respuesta del fetch:', response);
                    return response.json();
                })
                .then(data => {
                    console.log('Datos JSON:', data);
                    const servicios = data.SERVICIOS[index];
                    console.log('Servicio seleccionado:', servicios);

                    if (!servicios.fotosAdicionales) {
                        console.error('No hay fotos adicionales para este servicio');
                        return;
                    }
                    
                    const modalBody = document.getElementById('modalBody');
                    // Limpiar contenido anterior
                    modalBody.innerHTML = '';
        
                    // Agregar las fotos adicionales
                    servicios.fotosAdicionales.forEach(foto => {
                        modalBody.innerHTML += `<img src="${servicios.fotosAdicionales}" class="img-fluid mb-2" alt="Foto adicional">`;
                        modalBody.innerHTML += `<img src="${servicios.fotosAdicionales2}" class="img-fluid mb-2" alt="Foto adicional">`;
                    });
        
                    // Mostrar el modal
                    const photoModal = new bootstrap.Modal(document.getElementById('photoModal'));
                    photoModal.show();
                })
                .catch(error => console.error('Error al cargar más fotos:', error));
        }
        

        miJson2();


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

let cotizarBtn = document.getElementById('cotizarBtn');

cotizarBtn.addEventListener('click', () => {
    if (fechaInicio && fechaFinal) {
        cotizar(); 
    } else {
        alert("Por favor, selecciona un rango de fechas válido.");
    }
});


function cotizar() {
     // Calcular el número de días basado en las fechas seleccionadas
    let cantidadDias = fechaDeReserva(fechaInicio, fechaFinal); // Usa esta función para calcular días
        document.getElementById("cantidadDias").textContent = `Cantidad de días: ${cantidadDias}`;
    
    if (cantidadDias <= 0) {
        alert("Selecciona un rango válido de fechas.");
        return null; // Salir de la función si no es un rango válido
    }

    let costoPorDia = 10000;
    let costoMinimo = costoPorDia * 3;
    let costoTotal;

    if (cantidadDePersonas <= 3) {
         costoTotal = costoMinimo * cantidadDias;
    } else {
         costoTotal = (costoPorDia * cantidadDePersonas) * cantidadDias;
    }
    document.getElementById("costoTotal").textContent = `El costo total de la estadía es: $${costoTotal}`;
    

const COTIZACION = {
    dias: cantidadDias,
    personas: cantidadDePersonas,
    total: costoTotal
};

localStorage.setItem("COTIZACION", JSON.stringify(COTIZACION));

return costoTotal;

}


let reservarBtn = document.getElementById('reservarBtn');

reservarBtn.addEventListener('click', () => {
    if (fechaInicio && fechaFinal) {

        const costoTotal = cotizar();

        // Validar si se calculó correctamente
        if (costoTotal === null) {
            return; // Salir si las fechas no son válidas
        }

        const FECHADEINICIOFORMATEADA = new Date(fechaInicio).toLocaleDateString('es-AR', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        });

        const FECHADEFINALFORMATEADA = new Date(fechaFinal).toLocaleDateString('es-AR', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        });
    
        
        const MENSAJE = `Hola, me interesa realizar una reserva. Aquí están los detalles:
        - Fecha de inicio: ${FECHADEINICIOFORMATEADA}
        - Fecha de fin: ${FECHADEFINALFORMATEADA}
        - Cantidad de personas: ${cantidadDePersonas}
        - Costo total: $${costoTotal}`;
        
        const MENSAJEURI = encodeURIComponent(MENSAJE);
        
        // Número de WhatsApp
        const NUMEROWHATSAPP  = "5493543583577";
        
        // Redirigir al enlace de WhatsApp
        const url = `https://api.whatsapp.com/send?phone=${NUMEROWHATSAPP}&text=${MENSAJEURI}`;
        window.open(url, '_blank');
    } else {
        alert("Por favor, selecciona un rango de fechas válido.");
    }
});


