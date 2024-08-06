import * as module from '../module/module.js';
let contenerdorCards = document.querySelector('.content-cards');
let contenedorCheckbox = document.querySelector('.filtro-check');
let texto = document.getElementById('buscar');
fetch('https://aulamindhub.github.io/amazing-api/events.json').then(response => response.json()).then(arrayData => {
    pintarCards(arrayData.events, contenerdorCards, arrayData)
    console.log(module.obtenerArrayCategorias(arrayData.events));
    module.pintarCheckbox(arrayData.events, contenedorCheckbox);

    document.querySelector('.filtro-check'),addEventListener('change', () => {
      let filterCheck = module.filtroCheckBox(arrayData.events);
      let filterText = module.filtrarTexto(filterCheck, texto.value.toLowerCase());
      pintarCards(filterText, contenerdorCards, arrayData);
    });

    document.getElementById('buscar').addEventListener('keyup', () => {
      let cardFiltradaTexto = module.filtrarTexto(arrayData.events, texto.value.toLowerCase());
      let cardFiltradaCheck = module.filtroCheckBox(cardFiltradaTexto)
      pintarCards(cardFiltradaCheck, contenerdorCards, arrayData)
    });
})


function pintarCards(arrayData, contenedor, fecha){
    let cardsHTML = "";
    if (arrayData.length >0){
      for(let i = 0; i < arrayData.length; i++){
        let currentDate = new Date(fecha.currentDate);
        let date = new Date (arrayData[i].date);
        if (currentDate.getTime()< date.getTime()) {
          let card = arrayData[i];
          cardsHTML += module.crearCard(card);
        }
      }
      contenedor.innerHTML = cardsHTML; 
    }
    else{
      contenedor.innerHTML = `
      <div>
        <h3>No hay eventos que mostrar</h3>
      </div>
      `
    }
}