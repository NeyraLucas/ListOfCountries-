const btnColors = document.getElementById('styleSettings');
const inputTab = document.getElementById('inputColorTab');
const inputTxt = document.getElementById('inputColorText');
//bb4879 9F54EC
btnColors.addEventListener('click', setColorTable);

function setColorTable() {
    const tablaColor =  inputTab.value;
    const tablaTxt = inputTxt.value;
    const table = document.querySelector('table');

   table.style.color = `${tablaTxt}`;
   table.style.backgroundColor = `${tablaColor}`
   //tr.classList.add('bg-success');

    console.log(table);
}