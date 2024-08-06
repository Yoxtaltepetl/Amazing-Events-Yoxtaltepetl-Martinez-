fetch('https://aulamindhub.github.io/amazing-api/events.json').then(response => response.json()).then(datos => {
  buscarId(datos.events, eventId, datos);
  console.log(datos.events, datos);
  
})
const urlParams = new URLSearchParams(window.location.search);
const eventId = urlParams.get('id');
console.log(eventId);
const contentDetails = document.querySelector('.details-content');
console.log(contentDetails);

function buscarId(arrayEvents, idEvent, fecha){  
  for(let i = 0; i < arrayEvents.length; i++){
    if(arrayEvents[i]._id == idEvent){
      let currentDate = new Date(fecha.currentDate);
      let date = new Date (arrayEvents[i].date);
      if (currentDate.getTime()< date.getTime()) {
       
       pintarDetailsUpcoming(arrayEvents[i]);
      }
      else{
        pintarDetailsPast(arrayEvents[i])
      }
      
    }
  }
}

function pintarDetailsUpcoming(cardDetails){
  contentDetails.innerHTML = `
    <div class="col-10 d-flex flex-md-nowrap flex-wrap rounded">
                    <div class="container">
                        <img src="${cardDetails.image}" alt="details" class="imgDetails img-fluid">
                      </div>
                    <div class="container d-flex flex-column align-items-start rounded">
                        <h3 class="d-flex align-self-center mt-3">${cardDetails.name}</h3>
                          <p><strong>Date:</strong> ${cardDetails.date}</p>
                          <p><strong>Category:</strong> ${cardDetails.category}</p>
                          <p><strong>Description:</strong> ${cardDetails.description}</p>
                          <p><strong>Place:</strong> ${cardDetails.place}</p>
                          <p><strong>Capacity:</strong> ${cardDetails.capacity}</p>
                          <p><strong>Estimate:</strong> ${cardDetails.estimate}</p>
                          <p><strong>Price:</strong> $${cardDetails.price}</p>
                </div>
  `
}

function pintarDetailsPast(cardDetails){
  contentDetails.innerHTML = `
    <div class="col-10 d-flex flex-lg-nowrap flex-wrap rounded">
                    <div class="container">
                        <img src="${cardDetails.image}" alt="details" class="imgDetails img-fluid">
                      </div>
                    <div class="container d-flex flex-column align-items-start rounded">
                        <h3 class="d-flex align-self-center mt-3">${cardDetails.name}</h3>
                          <p><strong>Date:</strong> ${cardDetails.date}</p>
                          <p><strong>Category:</strong> ${cardDetails.category}</p>
                          <p><strong>Description:</strong> ${cardDetails.description}</p>
                          <p><strong>Place:</strong> ${cardDetails.place}</p>
                          <p><strong>Capacity:</strong> ${cardDetails.capacity}</p>
                          <p><strong>Assistance:</strong> ${cardDetails.assistance}</p>
                          <p><strong>Price:</strong>$${cardDetails.price}</p>
                </div>
  `
}