import * as module from '../module/module.js';

let eventStatics = document.querySelector('.eventStatics');
let tablaUpcoming = document.querySelector('#tablaUpcoming').getElementsByTagName('tbody')[0];
let tablaPast = document.querySelector('#tablaPast').getElementsByTagName('tbody')[0]
fetch('https://aulamindhub.github.io/amazing-api/events.json').then(response => response.json()).then(data => {
    
let porcentajeMax = encontrarMaximo(eventHighestAssistance(data.events));
let eventoMaxNombre = (eventoStatics(data.events, porcentajeMax));
let mensajeMax = eventoMaxNombre + ' con ' + porcentajeMax.toFixed(2) + '%';

let porcentajeMin = encontrarMinimo(eventHighestAssistance(data.events));
let eventoMinNombre = eventoStatics(data.events, porcentajeMin)
let mensajeMin = eventoMinNombre + ' with ' + porcentajeMin.toFixed(2) + '%'
let capacidadMaxima = encontrarMaximo(maxCapacidad(data.events))
let eventoMaxCapacidad = eventoStatics(data.events, capacidadMaxima)
let mensajeCapacidad = eventoMaxCapacidad + ' with ' + capacidadMaxima + ' places.'
pintarEvento(mensajeMax,mensajeMin,mensajeCapacidad, eventStatics);
let arrayCategorias = [...module.obtenerArrayCategorias(data.events)]
let arrayEventosUpcoming = (eventosUpcomingEvent(data.events, data));
let arrayEventosPast = eventosPastEvent(data.events, data);

categoriasUpcoming(arrayEventosUpcoming, arrayCategorias, tablaUpcoming);
categoriasPast(arrayEventosPast, arrayCategorias, tablaPast);

});


function pintarEvento(mensajeMax,mensajeMin, eventoMaxCapacidad, contenedor) {
    contenedor.innerHTML = `
    <td>
    ${mensajeMax}
    </td>
    <td>
    ${mensajeMin}
    </td>
    <td>
    ${eventoMaxCapacidad}
    </td>
    `
}

function eventHighestAssistance(evento){
    const arrayAssistance = [];
    for(let i = 0; i < evento.length; i++){
        let porcentaje = (((evento[i].assistance)*100))/((evento[i].capacity));
        if(Number.isNaN(porcentaje)){
            console.log('Es un valor NaN');
        }
        else{
            arrayAssistance.push(porcentaje)
        }
    }
    return arrayAssistance
}

function eventoStatics(eventos, numero) {
    for(let i = 0; i < eventos.length; i++){
        if(numero < 100){
            let porcentaje = (((eventos[i].assistance)*100))/((eventos[i].capacity));
            if (porcentaje === numero) {
                return eventos[i].name;
            }
        }
        else if(numero > 100){
            let capacidad = eventos[i].capacity;
            if (capacidad === numero) {
                return eventos[i].name    
            }
        }
    } 
}

function maxCapacidad(eventos) {
    const arrayCapacity = [];
    for(let i = 0; i < eventos.length; i++){
        let capacidad = eventos[i].capacity
        arrayCapacity.push(capacidad)
    }
    return arrayCapacity;
}

function encontrarMaximo(array) {
    let max = array[0];
    for (let i = 1; i < array.length; i++) {
      if (array[i] > max) {
        max = array[i];
      }
    }
    return max;
}

function encontrarMinimo(array) {

    let min = array[0];
    for (let i = 1; i < array.length; i++) {
      if (array[i] < min) {
        min = array[i];
      }
    }
    return min;
}

function categoriasUpcoming(arrayEventosUpcoming, arrayCategorias, contenedor) {

    for(let i = 0; i < arrayCategorias.length; i++){
        
        let categoria = upcomingEvents(arrayEventosUpcoming, arrayCategorias[i]);
        let gananciaEvento = 0;
        let ganancia = 0;
        let porcentajeEvento = 0;
        let porcentajeGlobal= 0;
        if(categoria.length > 0){
            for(let x = 0; x < categoria.length; x++){
                gananciaEvento = categoria[x].price * categoria[x].estimate;
                ganancia = ganancia + gananciaEvento;
                porcentajeEvento = (categoria[x].estimate*100)/(categoria[x].capacity);
                porcentajeGlobal = porcentajeGlobal + porcentajeEvento;
            }
            let porcentaje = porcentajeGlobal/(categoria.length)
            pintarEvents(arrayCategorias[i], ganancia, porcentaje.toFixed(2), contenedor)
        }
    }
}

function categoriasPast(arrayEventosUpcoming, arrayCategorias, contenedor) {
    for(let i = 0; i < arrayCategorias.length; i++){
        
        let categoria = upcomingEvents(arrayEventosUpcoming, arrayCategorias[i]);
        let gananciaEvento = 0;
        let ganancia = 0;
        let porcentajeEvento = 0;
        let porcentajeGlobal= 0;
        if(categoria.length > 0){
            for(let x = 0; x < categoria.length; x++){
                gananciaEvento = categoria[x].price * categoria[x].assistance;
                ganancia = ganancia + gananciaEvento;
                porcentajeEvento = (categoria[x].assistance*100)/(categoria[x].capacity);
                porcentajeGlobal = porcentajeGlobal + porcentajeEvento;
            }
            let porcentaje = porcentajeGlobal/(categoria.length)
            pintarEvents(arrayCategorias[i], ganancia, porcentaje.toFixed(2), contenedor)
        }
    }
}

function upcomingEvents(eventos, categoria){
    let arrayCategoria = []
    for(let x = 0; x < eventos.length ; x++){
        if(categoria===eventos[x].category){
            arrayCategoria.push(eventos[x])
        }
    }
    return arrayCategoria;
}

function eventosUpcomingEvent(arrayData,fecha){
    const arrayEventos = []
    if (arrayData.length >0){
      for(let i = 0; i < arrayData.length; i++){
        let currentDate = new Date(fecha.currentDate);
        let date = new Date (arrayData[i].date);
        if (currentDate.getTime()< date.getTime()) {
          arrayEventos.push(arrayData[i])
        }
      }
      return arrayEventos
    }
}

function eventosPastEvent(arrayData,fecha){
    const arrayEventos = [];
    if (arrayData.length >0){
      for(let i = 0; i < arrayData.length; i++){
        let currentDate = new Date(fecha.currentDate);
        let date = new Date (arrayData[i].date);
        if (currentDate.getTime()> date.getTime()) {
            arrayEventos.push(arrayData[i])
        }
      }
      return arrayEventos;
    }
}
function pintarEvents(categoria, ganancia, asistencia, contenedor){
    contenedor.innerHTML += `
    <tr>
        <td>
            ${categoria}
        </td>
        <td>
            ${ganancia} USD
        </td>
    
        <td>
            ${asistencia} %
        </td>
    </tr>

    `
}
