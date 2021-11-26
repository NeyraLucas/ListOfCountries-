//<option class="dropdown-item" value="value1">Value 1</option>
const select = document.getElementById('selectData');

const rows = document.querySelectorAll('.data');


function init() {
    console.log(select)
    for(let i=0; i<rows.length; i++){
        const addOption = document.createElement('option');
        //addOption.innerHTML(rows[i]);
        select.appendChild(addOption);

    }
}

init();