function reservar (costoPorDia, cantidadDias, cantidadPersonas, continuar){
    /*let costoPorDia = 10000;
    let cantidadDias = 6;
    let cantidadPersonas = 5;
    let continuar = "si";*/


    console.log("Comienza tu reserva")

while (true) {
    costoTotal = (costoPorDia*cantidadPersonas)*cantidadDias
        console.log (costoTotal)
        

    if (continuar === "si" )
        console.log ("calcula otra estadía")
        
    
    else {
        console.log ("Un placer ayudarte")
    }
    break
    
}
}
reservar(`10000`, `6`, `5`, "si");
reservar(`10000`, `3`, `2`, "no");