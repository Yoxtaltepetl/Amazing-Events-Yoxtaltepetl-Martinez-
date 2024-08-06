export function crearCard(arrayCard) {
    let cardHTML = `
    <div class="col-10 col-sm-6 col-lg-4 mb-4">
      <div class="card border-primary text-bg-dark">
        <img class="card-img-top img-card img-fluid" src="${arrayCard.image}" alt="">
        <div class="card-body d-flex flex-column justify-content-between">
            <h4 class="card-title" id="titulo"> ${arrayCard.name}</h4>
            <p class="card-text"> ${arrayCard.description}</p>
            <div class="container d-flex flex-row justify-content-around">
                <p>$${arrayCard.price} </p>
                <a id= "detalles" href="./details.html?id=${arrayCard._id}" class="btn btn-outline-primary">Details</a>
            </div>
        </div>
      </div>
    </div>
    `
    return cardHTML;
}

export function obtenerArrayCategorias(arrayCategory){
    const categorias = []
    for(let i = 0; i<arrayCategory.length;i++){
      categorias.push(arrayCategory[i].category);
    }
    const arrayCategorias = new Set(categorias);
    return arrayCategorias;
}

export function pintarCheckbox(events, contenedorCheck){
  const categorias = [...obtenerArrayCategorias(events)]
  let idCheck = 0;
  for(let x =0; x<categorias.length;x++){
    idCheck = idCheck +1;
    crearCheckbox(categorias[x], idCheck, contenedorCheck);
  }
}
  

export function crearCheckbox(categoria, id, contenedorCheck){
    contenedorCheck.innerHTML +=
        `<div class="form-check form-check-inline">
            <input class="form-check-input" type="checkbox" id="check${id}" value="${categoria}">
            <label class="form-check-label"> ${categoria} </label>
        </div>
        `
}

export function filtroCheckBox(arrayEvents){
  let checkboxCheck = [...document.querySelectorAll('input[type=checkbox]:checked')];
  checkboxCheck = checkboxCheck.map(e => e.value);
  console.log(checkboxCheck.length);
  let arrayEventsFilter = []
  if(checkboxCheck.length === 0){
    console.log('vacio');
    arrayEventsFilter = arrayEvents;
  }
  else if(crearCheckbox.length > 0 ){
    arrayEventsFilter = arrayEvents.filter(evento => checkboxCheck.includes(evento.category))
  }
  
  console.log(checkboxCheck);
  
  return arrayEventsFilter
}

export function filtrarTexto(arrayEvents, texto){
  let textoFiltrado = arrayEvents.filter(card => card.name.toLowerCase().includes(texto) || card.description.toLowerCase().includes(texto));
  return textoFiltrado;
}