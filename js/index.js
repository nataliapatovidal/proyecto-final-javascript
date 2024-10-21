
function fechaDeReserva (fechaInicio, fechaFinal){

    const unDiaDeEstadiaEnMil = 24 * 60 * 60 * 1000;
    const diferenciaDeEstadiaMil = fechaFinal - fechaInicio;

    return Math.round (diferenciaDeEstadiaMil / unDiaDeEstadiaEnMil);
}
function reservar (){
    
    while (true) {
        let fechaInicioInput = prompt("Por favor, ingresa la fecha de inicio de la estadía (formato: AAAA-MM-DD): ");
        let fechaFinalInput = prompt("Por favor, ingresa la fecha de finalización de la estadía (formato: AAAA-MM-DD): ");

        let fechaInicio = new Date(fechaInicioInput);
        let fechaFinal = new Date(fechaFinalInput);

        let cantidadDias = fechaDeReserva(fechaInicio, fechaFinal);
        console.log ("La cantidad de dias de estadia son: " + cantidadDias)

        let cantidadPersonas = parseInt(prompt ("Por favor ingresa la cantidad de personas que se van a hospedar: "));
        console.log("La cantidad de personas que se van a hospedar son: " + cantidadPersonas )

        let costoPorDia = 10000;
        let costoMinimo = costoPorDia*3;
        let costoTotal;

        if (cantidadPersonas <= 3) {
            costoTotal = costoMinimo * cantidadDias;
        } else {
            costoTotal = (costoPorDia * cantidadPersonas) * cantidadDias;
        }
        console.log ("El costo total de la estadía es: $" + costoTotal)

        let continuar = prompt ("¿Quieres calcular otra estadía? (si o no): ");

        if (continuar.toLowerCase() !== "si") {
        console.log("Un placer ayudarte. ¡Hasta luego!");
        break;
        }
    }
}
reservar();


const habitaciones = [
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

const cardContainer = document.getElementById('card-container');

habitaciones.forEach(habitacion => {
    const card = `
        <div class="col-md-4">
            <div class="card mb-4">
                <img src="${habitacion.imagen}" class="card-img-top" alt="${habitacion.nombre}">
                <div class="card-body">
                    <h5 class="card-title"> ${habitacion.nombre}</h5>
                    <p class="card-text">${habitacion.descripcion}</p>
                    <a href="#" class="btn btn-primary">Mira más fotos</a>
                </div>
            </div>
        </div>
    `;

    cardContainer.innerHTML += card;
});