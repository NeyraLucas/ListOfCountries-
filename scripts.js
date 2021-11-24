const url = `https://restcountries.com/v3.1/all`;
const table = document.getElementById("td_body");
const table2 = document.getElementById("table");
const search = document.getElementById("searchBox");
let countries;
let nombre;

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
  const borders = document.querySelectorAll(".check");
  // console.log(borders);
  //tableBorder.deleteBorder();
  tableBorder.showBorders(borders, countries);
}

//get Data wiki
function dataWiki(name) {
  nombre = name;
  let info;
  const urlWiki = `https://en.wikipedia.org/api/rest_v1/page/summary/${nombre}`;
  fetch(urlWiki)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);

      info += `${data.extract_html}`;

      bootbox.alert(data.extract, function () {
        console.log("Alert Callback");
      });
    })
    .catch((err) => console.log("Error:", err));
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

  paginate.init(".table", options, filterOptions);
}

//evento onclick para la table

$(document).on("click", "tr", function (e) {
  let pais = $(this).find("td:eq(0)").text();
  dataWiki(pais);
});

//get table
const tableBorder = {
  showBorders: (arr, countries) => {
    const tableB = document.getElementById("td_borders");
    const bord = [];
    let otp = "";
    //let filt = {border: ''};
    let filt = [];
    arr.forEach((a) => {
      bord.push(a.innerHTML);
    });

    //filtrar
    for (let i = 0; i < bord.length; i++) {
      for (let j = 0; j < countries.length; j++) {
        if (bord[i] == countries[j].name.common) {
          filt.push(countries[j].borders);
          //filt.border=countries[j].borders;
          //console.log(filt);
        }
      }
    }

    //code
    /* for(let i=0; i<filt.length; i++){
      for(let j=0; j<filt[i].length; j++){
        searchCode.code(filt[i][j]);
      }
    } */

    //console.log('soy: filt ' + filt.length +filt[0].length);

    //printBorders.print(bord);
    //console.log(bord);
    for (let i = 0; i < bord.length; i++) {
      otp = `
        <tr>
        <td> ${bord[i]} </td>
        <td> ${filt[i]} </td>
        </tr>
        `;
      tableB.innerHTML += otp;
    }
    //console.log(filt);
  },
  deleteBorder:() =>{
    const tableB = document.getElementById("td_borders");
    tableB.innerHTML = '';
  }
};

//search code
const searchCode = {
  code: (code) => {
    console.log("Es el codigo: " + code);
  },
};

