const url = `https://restcountries.com/v3.1/all`;
const table = document.getElementById("td_body");
const table2 = document.getElementById("table");
const search = document.getElementById("searchBox");
const btnBorder = document.getElementById("btnBorders");
let countries;
let nombre;
const paises=[];
const borderTable = document.getElementById("td_borders");//borders

btnBorder.addEventListener("click", eventBorders);

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
  //console.log(data);
  const testPais = data.map(function (count) {
    return count.borders;
  });
  console.log('borders: ' + testPais);
  for (let i = 0; i < bor.length; i++) {
    
    if (bor.length === undefined) {
      i++;
    } else {
      //console.log(bor[i].name.common);
      for (let j = 0; j < data[i].borders.length; j++) {
          //lenguajes(data[i].borders[j]);
          //let lenguages = lenguajes(data[i].borders[j]);
          //console.log(lenguages);
          //data[i].translations.spa.official
          //paises.push(`https://restcountries.com/v3.1/alpha/${data[i].borders[j]}`);
          
         //paises = data[i].borders[j]; 
          //paises.push(p);
         // console.log(paises);
        //////////////////
        
        fetch(`https://restcountries.com/v3.1/alpha/${testPais[i][j]}`)
        .then(resp => resp.json())
        .then(datos =>{
         
          option = `
          <tr>
          <th>${bor[i].name.common}</th>
          <th>${data[i].borders[j]}</th>
          <th>${datos[0].translations.spa.official}</th>
          </tr>
          
          `;
          borderTable.innerHTML += option;
        });
         /////////////
         /*  option = `
          <tr>
          <th>${bor[i].name.common}</th>
          <th>${data[i].borders[j]}</th>
          
          </tr>
          
          `; */
          //<th>${data[i].translations.spa.official}</th>
          
      } //end for
    }
  }

  /* const testMap = companies.map(function(company){
    return `${company.name} [${company.start} - ${company.end}]`;
}) */
///////////////////////////
/*   const testPais = data.map(function (count) {
    return count.borders;
  });
  //let account = '';
  console.log(testPais);
  for(let i=0; i<testPais.length; i++){
    console.log('pais: ' + testPais[i]);
    for(let j=0; j<testPais[i].length; j++){
      console.log('pais2: ' + testPais[i][j]);
      let account = document.createElement('th');
      //account.push(`https://restcountries.com/v3.1/alpha/${testPais[i][j]}`);
      fetch(`https://restcountries.com/v3.1/alpha/${testPais[i][j]}`)
      .then(resp => resp.json())
      .then(data =>{
        console.log(data[0].translations.spa.official);
        account.innerHTML =`

        <th>${data[0].translations.spa.official}</th>

        `
        borderTable.appendChild(account);
      });

    }
  } */
  ///////////////////////////
  //console.log(account);
  

  //fetching(testPais);
  //const paisesCopy = paises;
  //console.log(paises[16]);

}

//leng
//https://restcountries.com/v3.1/alpha/{code}
/* function lenguajes(len) {
  fetch(`https://restcountries.com/v3.1/alpha/${len}`)
    .then((res) => res.json())
    .then((data) => () => {
      console.log(data);
    })
    .catch((err) => console.log("Error:", err));
} */
const getDiv = document.getElementById("prueba");
// función que implementa un wait con promesas
const wait = (ms) => new Promise((r, j) => setTimeout(r, ms));

// función que emula un proceso asíncrono
const fetchUrl = async (url) => {
  await wait(0);
  //let options= "";
  return fetch(url)
    .then((resp) => resp.json())
    .then((data) => {
        console.log(data[0].translations.spa.official);
       // options =`<p>${data[0].translations.spa.official}</p>`
        //getDiv.innerHTML += options;
    });
    
    
};

const fetching = async (arr) => {
  for (const url of arr) {
    const data = await fetchUrl(url);
    //console.log(data);
  }
};


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
        console.log()
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
  deleteBorder: () => {
    const tableB = document.getElementById("td_borders");
    tableB.innerHTML = "";
  },
};

//search code
const searchCode = {
  code: (code) => {
    console.log("Es el codigo: " + code);
  },
};

