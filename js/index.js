
const CARD_CONTAINER = document.getElementById('card-container');

    async function miJson () {

        try {
            const response = await fetch('./datos.json');
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
            const response = await fetch('./datos.json');
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
            console.error('Ocurrió un problema. Intente de nuevo más tarde.')
        }
        }
        function mostrarMasFotos(index) {
            console.log('Index recibido:', index);
        
            fetch('./datos.json')
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Error en la respuesta de la red');
                    }
                    return response.json();
                })
                .then(data => {
                    console.log('Datos JSON:', data);
                    const servicios = data.SERVICIOS[index];
                    console.log('Servicio seleccionado:', servicios);

                    if (!servicios.fotosAdicionales || !servicios.fotosAdicionales2) {
                        console.error('No hay fotos adicionales para este servicio');
                        return;
                    }
                    
                    const modalBody = document.getElementById('modalBody');
                    modalBody.innerHTML = '';
        
                    // Agregar las fotos adicionales
                    servicios.fotosAdicionales.forEach(foto => {
                        modalBody.innerHTML += `<img src="${foto}" class="img-fluid mb-2" alt="Foto adicional">`;
                    });
                    servicios.fotosAdicionales2.forEach(foto => {
                        modalBody.innerHTML += `<img src="${foto}" class="img-fluid mb-2" alt="Foto adicional">`;
                    });
        
                    // Mostrar el modal
                    const photoModal = new bootstrap.Modal(document.getElementById('photoModal'));
                    photoModal.show();
                })
                .catch(error => console.error('Error al cargar más fotos:', error));
            }
        

        miJson2();


        
    // Función para redireccionar a WhatsApp con el mensaje pre-armado:contentReference[oaicite:3]{index=3}
    document.addEventListener('DOMContentLoaded', function () {
        const llegadaInput = document.getElementById('llegada');
        const salidaInput = document.getElementById('salida');
        const huespedesInput = document.getElementById('huespedes');
        const btnCotizar = document.getElementById('btnCotizar');
        const btnReiniciar = document.getElementById('btnReiniciar');
        const costoTotalContainer = document.getElementById('costoTotal');
      
        function updateReservationInfo() {
          const llegadaVal = llegadaInput.value;
          const salidaVal = salidaInput.value;
          const personas = parseInt(huespedesInput.value, 10) || 0;
      
          if (llegadaVal && salidaVal) {
            const llegadaDate = new Date(llegadaVal);
            const salidaDate = new Date(salidaVal);
      
            let diffTime = salidaDate - llegadaDate;
            let dias = Math.round(diffTime / (1000 * 60 * 60 * 24));
            if (isNaN(dias) || dias < 0) dias = 0;
      
            const diasCobrados = dias < 3 ? 3 : dias;
            const precioPorDia = 30000;
            let total = precioPorDia * diasCobrados;
            if (personas > 3) {
              total *= personas;
            }
      
            // Mostrar el contenedor y contenido
            costoTotalContainer.style.display = 'block';
            costoTotalContainer.innerHTML = `
              <p><strong>Días reservados:</strong> ${dias}</p>
              <p><strong>Huéspedes:</strong> ${personas}</p>
              <p><strong>Costo total:</strong> $${total.toLocaleString('es-AR')}</p>
              <button id="btnReservar" class="btn btn-primary mt-2">Reservar por WhatsApp</button>
            `;
    
            // Guardar en localStorage
            localStorage.setItem('llegada', llegadaVal);
            localStorage.setItem('salida', salidaVal);
            localStorage.setItem('dias', dias.toString());
            localStorage.setItem('personas', personas.toString());
            localStorage.setItem('total', total.toString());
    
            // Asociar evento a botón "Reservar" dinámicamente
            const btnReservar = document.getElementById('btnReservar');
            btnReservar.addEventListener('click', redirectToWhatsApp);
            }
        }
    
        function redirectToWhatsApp() {
            const llegadaVal = localStorage.getItem('llegada') || '';
            const salidaVal = localStorage.getItem('salida') || '';
            const dias = localStorage.getItem('dias') || '0';
            const personas = localStorage.getItem('personas') || '0';
            const total = localStorage.getItem('total') || '0';
    
            if (llegadaVal && salidaVal && parseInt(dias) > 0) {
            const mensaje = `Hola, me interesa realizar una reserva. Aquí están los detalles:
    
        Llegada: ${llegadaVal}
        Salida: ${salidaVal}
        Días: ${dias}
        Huéspedes: ${personas}
        Total: $${parseInt(total).toLocaleString('es-AR')}`;
    
            const MENSAJEURI = encodeURIComponent(mensaje);
            const NUMEROWHATSAPP = "5493543583577";
            const url = `https://api.whatsapp.com/send?phone=${NUMEROWHATSAPP}&text=${MENSAJEURI}`;
            window.open(url, '_blank');
            } else {
            alert("Por favor, selecciona un rango de fechas válido.");
            }
        }
    
        function reiniciarFormulario() {
            llegadaInput.value = '';
            salidaInput.value = '';
            huespedesInput.value = '';
            costoTotalContainer.innerHTML = '';
            costoTotalContainer.style.display = 'none';
            localStorage.clear();
        }
    
        // Asociar eventos
        btnCotizar.addEventListener('click', updateReservationInfo);
        btnReiniciar.addEventListener('click', reiniciarFormulario);
        });
