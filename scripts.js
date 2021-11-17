const url = `https://restcountries.com/v3.1/all`;
const div = document.getElementById('response');
const p = document.createElement('p');
const table = document.getElementById('td_body');
const table2 = document.getElementById('table');
let countries;
let nombre;



//crear elementos
function createNode(element) {
    return document.createElement(element);
}

//add hijos
function append(parent, el) {
    return parent.appendChild(el);
}

fetch(url)
.then(res =>res.json())
.then(data => (starData(data))
)
.catch(err => console.log("Error:", err));

function starData(countriesData){
    countries = countriesData;

    //ordenar ascendente
    countries.sort((a,b) => {
        const nameA = a.name.common.toLowerCase(); 
        const nameB = b.name.common.toLowerCase(); 

        if(nameA < nameB){
            return -1;
        }

        if(nameA > nameB){
            return 1;
        }

        return 0;
        

    });
    

    //iterar datos
    for(let i =0; i<countries.length; i++){

        /* if(countries[i].languages.spa){
            lenguajes = countries[i].languages.spa;
        }else{
            lenguajes = "nothing";
        } */

        let tr = createNode('tr');
        let tdName = createNode('td');
        let tdCap = createNode('td');
        let tdRegion = createNode('td');
        let tdNLang = createNode('td');
        let tdPop = createNode('td');
        let tdImage = createNode('td');
        let images = createNode('img');

       /*  options += `
        <tr>
        <td> ${countries[i].name.common} </td>
        <td> ${countries[i].capital} </td>
        <td> ${countries[i].region} </td>
        <td> ${countries[i].languages} </td>
        <td> ${countries[i].population} </td>
        <td> <img class="img-fluid" width="100px" src=" ${countries[i].flags.svg} " > </td>
        </tr>
        ` */

        tdName.innerHTML = `${countries[i].name.common}`;
        tdCap.innerHTML = `${countries[i].capital}`;
        tdRegion.innerHTML = `${countries[i].region}`;
        tdNLang.innerHTML = `${countries[i].languages}`;
        tdPop.innerHTML = `${countries[i].population}`;
        images.setAttribute("src", countries[i].flags.svg);
        images.className = "img-fluid";

        //agregamos class al tr para aplicar el evento click
        tr.className = `${countries[i].name.common}`;
        tr.setAttribute("id", countries[i].name.common);

        append(tdImage, images);
        append(tr, tdName);
        append(tr, tdCap);
        append(tr, tdRegion);
        append(tr, tdNLang);
        append(tr, tdPop);
        append(tr, tdImage);
        
        append(table, tr);
        
    }

    //table.innerHTML = tr;

    //console.log(countries);

}


function showWiki(name){
    nombre = name;
    let info;
    const urlWiki = `https://en.wikipedia.org/api/rest_v1/page/summary/${nombre}`;
    fetch(urlWiki)
    .then(res => res.json())
    .then(data => {
        info = `<h4 class="text-center">Countrie</h4>`;
        info += `
        
        <div class="container">
          <div class="card">
            <img src=" ${data.thumbnail.source} " class="card-img-top">
            <div class="card-body">
              <h5 class="card-title">${data.title}</h5>
              <h6 class="card-subtitle mb-2 text-muted">${data.extract}</h6>
              <p class="card-text"> ${data.description}</p>
            </div>
          </div>
        </div>  
        
        `
        //console.log(data);
        
        document.getElementById('response').innerHTML= info;
        
    })
    .catch(err => console.log("Error:", err));

    

}

//agregamos un evento a table
table.addEventListener('click', ShowInfo)

function ShowInfo(e){

    console.log("Soy: "+e.target.parentElement.id);
    const pais = e.target.parentElement.id;
    console.log(pais);

    showWiki(pais);

}
//showWiki("mexico");
//console.log(document.querySelector('tr'));

