import * as module from '../module/module.js';
let contenerdorCards = document.querySelector('.content-cards');
let contenedorCheckbox = document.querySelector('.filtro-check');
let texto = document.getElementById('buscar');
fetch('https://aulamindhub.github.io/amazing-api/events.json').then(response => response.json()).then(data => {
    pintarCards(data.events, contenerdorCards);
    module.pintarCheckbox(data.events, contenedorCheckbox)

    document.querySelector('.filtro-check'),addEventListener('change', () => {
      let filterCheck = module.filtroCheckBox(data.events);
      let filterText = module.filtrarTexto(filterCheck, texto.value.toLowerCase());
      pintarCards(filterText, contenerdorCards);
      
    });

    document.getElementById('buscar').addEventListener('keyup', () => {
      
      let cardFiltradaTexto = module.filtrarTexto(data.events, texto.value.toLowerCase());
      let cardFiltradaCheck = module.filtroCheckBox(cardFiltradaTexto)

      
      pintarCards(cardFiltradaCheck, contenerdorCards)
    })

});

function pintarCards(arrayData, contenedor){
    let cardsHTML = "";
    if (arrayData.length >0){
      for(let i = 0; i < arrayData.length; i++){
        let card = arrayData[i];
        cardsHTML += module.crearCard(card);
      }
      contenedor.innerHTML = cardsHTML; 
    }
    else{
      contenedor.innerHTML = `
      <div class="">
        <h3>No hay eventos que mostrar</h3>
      </div>
      `
    }
  }

