const url = `https://restcountries.com/v3.1/all`;
const table = document.getElementById("td_body");
const table2 = document.getElementById("table");
const search = document.getElementById("searchBox");
const btnBorder = document.getElementById("btnBorders");
let countries;
let nombre;
const paises=[];
const borderTable = document.getElementById("td_borders");//borders

//btn para ver borders
btnBorder.addEventListener("click", eventBorders);
//evento para mostrar info de la 2da tabla al dar click
borderTable.addEventListener("click", verBorders);

fetch(url)
  .then((res) => res.json())
  .then((data) => starData(data))
  .catch((err) => console.log("Error:", err));

function starData(countriesData) {
  countries = countriesData;

  //ordenar ascendente
  countries.sort((a, b) => {
    const nameA = a.name.common.toLowerCase();
    const nameB = b.name.common.toLowerCase();

    if (nameA < nameB) {
      return -1;
    }

    if (nameA > nameB) {
      return 1;
    }

    return 0;
  });

  //console.log(countries);

  //iterar datos
  for (let i = 0; i < countries.length; i++) {
    let leng = "";
    let options = "";

    //obtenemos los datos de lenguajes
    if (typeof countries[i].languages === "object") {
      for (let j in countries[i].languages) {
        const le = countries[i].languages[j];
        leng += `${le} `;
      }
    }

    options += `
        <tr id="${countries[i].name.common}">
        <td class="check">${countries[i].name.common}</td>
        <td> ${countries[i].capital} </td>
        <td> ${countries[i].region} </td>
        <td> ${leng} </td>
        <td> ${countries[i].population} </td>
        <td> <img class="img-fluid" width="100px" src=" ${countries[i].flags.svg} " > </td>
        </tr>
        `;

    table.innerHTML += options;
  }

  //console.log(countries);

  filters();
  //const borders = document.querySelectorAll(".check");
  // console.log(borders);
  //tableBorder.deleteBorder();
  //tableBorder.showBorders(borders, countries);

}
let map;
//get Data wiki
function dataWiki(name) {
  nombre = name;
  let info;
  //peticion 
  const urlWiki = `https://en.wikipedia.org/api/rest_v1/page/summary/${nombre}`;
  fetch(urlWiki)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      
      // info += maps;
      //mapa2.__gm.Ea.id = 'bootbox-body';
      //console.log(mapa2);
      //info = `${mapa2}`;
      /* let map;
      map = new google.maps.Map(document.querySelector(".bootbox-body"), {
        center: { lat: 19.4978, lng: -99.1269 },
        zoom: 13,
      }); */
     // const m = document.createElement('div');
      //m.setAttribute('class','noc');

      //info = `${data.extract_html}`;
      //info += `${m}`;
      info = `
      <p>
      ${data.extract_html}
      </p>
      <div class="mapaP">
      </div>
      `;
      //initMap();
      bootbox.alert(`${info}`, function () {
        //initMap();
      });
    })
    .catch((err) => console.log("Error:", err));
}

//event btn
function eventBorders() {
  const borders = document.querySelectorAll(".check");
  borderTable.innerHTML ='';
  for (let i = 0; i < borders.length; i++) {
    fetch(`https://restcountries.com/v3.1/name/${borders[i].outerText}`)
      .then((response) => response.json())
      .then((data) => viewBorder(data))
      .catch((err) => console.log("Error:", err));
  }
  //console.log(borders[0]);
}

function viewBorder(data) {
  const bor = data;
  let option = "";
  const testPais = data.map(function (count) {
    return count.borders;
  });
  //console.log('borders: ' + testPais);
  for (let i = 0; i < bor.length; i++) {
    
    if (bor.length === undefined) {
      i++;
    } else {
      for (let j = 0; j < data[i].borders.length; j++) {
        //peticion para acceder al nombre
        fetch(`https://restcountries.com/v3.1/alpha/${testPais[i][j]}`)
        .then(resp => resp.json())
        .then(datos =>{
         
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
}

//filtro y paginación
function filters() {
  let options = {
    numberPerPage: 5,
    constNumberPerPage: 5,
    numberOfPages: 0,
    goBar: false,
    pageCounter: true,
    hasPagination: true,
  };

  let filterOptions = {
    el: "#searchBox",
  };

  paginate.init(".table_countries", options, filterOptions);
}

//evento onclick para la table
$('#table').on("click", "tr", function (e) {
  let pais = $(this).find("td:eq(0)").text();
  dataWiki(pais);
  initMap();
}); 


//evento para mostrar tabla 2
function verBorders(e) {
    let paises = e.path[1].id;
    dataWiki(paises);
}

//let map;
//let mapa2;
//let maps= document.createElement('div');
//maps.setAttribute('id','map');
function initMap() {
map = new google.maps.Map(document. querySelector('.mapaP'), {
    center: { lat: 19.4978, lng: -99.1269 },
    zoom: 13,
});
}

/* $(document).on('noc', function () {
    initMap();
}) */