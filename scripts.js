const btnBorder = document.getElementById("btnBorders");
const borderTable = document.getElementById("td_borders"); //borders
init();
let l=[];
function init() {
  //btn para ver borders
  btnBorder.addEventListener("click", eventBorders);
  //evento para mostrar info de la 2da tabla al dar click
  borderTable.addEventListener("click", verBorders);

  const url = `https://restcountries.com/v3.1/all`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => starData(data))
    .catch((err) => console.log("Error:", err));

}
//show table start
function starData(countriesData) {
  let countries;
  countries = countriesData;
  const table = document.getElementById("td_body");
  //ordenar ascendente
  countries.sort((a, b) => {
    const nameA = a.name.common.toLowerCase();
    const nameB = b.name.common.toLowerCase();
    return nameA < nameB ? -1 : 1;
  });
  //iterar datos
  for (let i = 0; i < countries.length; i++) {
    let leng = "";
    let options = "";
    //obtenemos los datos de lenguajes
    if (typeof countries[i].languages === "object") {
      //countries[i].languages.sort()
      for (let j in countries[i].languages) {
        const le = countries[i].languages[j];
        leng += `<li>${le}</li>`;
      }
    }

    options += `
        <tr id="${countries[i].name.common}">
        <td class="check">${countries[i].name.common}</td>
        <td> ${countries[i].capital} </td>
        <td> ${countries[i].region} </td>
        <td class="lan2">
        <button onclick="showLenguage('${leng}')" class="btn btn-info lan">Language</button>
        </td>
        <td> ${countries[i].population} </td>
        <td> <img class="img-fluid" width="100px" src=" ${countries[i].flags.svg} " > </td>
        </tr>
        `;

    table.innerHTML += options;
  }
  //filters();
}
//get Data wiki
function dataWiki(name) {
  let nombre;
  nombre = name;
  let lat = "";
  let lon = "";
  //peticion
  const urlWiki = `https://en.wikipedia.org/api/rest_v1/page/summary/${nombre}`;
  fetch(urlWiki)
    .then((res) => res.json())
    .then((data) => {
      let info = document.createElement("div");
      lat = data.coordinates.lat;
      lon = data.coordinates.lon;

      info = `<div id="modalMap">${data.extract_html}</div> <h5>Mapa: </h5> <div class="mapaP container"></div>`;

      bootbox.alert({
        message: info,
        backdrop: true,
      });
      //mostrar mapa
      initMap(lat, lon);
    })
    .catch((err) => console.log("Error:", err));
}
//event btn
function eventBorders() {
  const borders = document.querySelectorAll(".check");
  borderTable.innerHTML = "";
  for (let i = 0; i < borders.length; i++) {
    fetch(`https://restcountries.com/v3.1/name/${borders[i].outerText}`)
      .then((response) => response.json())
      .then((data) => viewBorder(data))
      .catch((err) => console.log("Error:", err));
  }
}
//show borders
function viewBorder(data) {
  const bor = data;
  let option = "";
  const testPais = data.map(function (count) {
    return count.borders;
  });
  
  for (let i = 0; i < bor.length; i++) {
    
    for (let j = 0; j < data[i].borders.length; j++) {
      
      //peticion para acceder al nombre
      fetch(`https://restcountries.com/v3.1/alpha/${testPais[i][j]}`)
        .then((resp) => resp.json())
        .then((datos) => {
          option = `
          <tr id='${datos[i].name.common}'>
          <th>${bor[i].name.common}</th>
          <th>${data[i].borders[j]}</th>
          <th>${datos[0].translations.spa.official}</th>
          </tr>
          
          `;
          borderTable.innerHTML += option;
        });
    } //end for
  }
}

//evento onclick para la table
$("#td_body").on("click", "tr", function (e) {

  let pais = $(this).find("td:eq(0)").text();
  let p = e.target.innerHTML;
  if(p != 'Language'){
    console.log("pais " + p);
    dataWiki(pais);
  }

});
 

//evento para mostrar tabla 2
function verBorders(e) {
  let paises = e.path[1].id;
  dataWiki(paises);
}
//renderizar mapa
let map;
function initMap(lat, lon) {
  map = new google.maps.Map(document.querySelector(".mapaP"), {
    center: { lat: lat, lng: lon },
    zoom: 13,
  });
}

//show lenguajes modal
function showLenguage(name) { 
  bootbox.alert(`Lenguages:
  <div>
  <ul>
  ${name}
  </ul>
  </div>
  `);
  //console.log(arr);
}
