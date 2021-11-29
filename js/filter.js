function init() {
    let cols = [];
    $('#table').find('thead tr th').each((i, col) =>{
        //console.log(`Indice: ${i}, valor: ${$(col).text()}`);3
        //push elemts columns
        cols.push({ idx: i, columna: $(col).text()});
    });
    $('#selectData').append(new Option('Seleccione', ''));
    cols.forEach( val => $('#selectData').append(new Option(val['columna'], val['idx'])));
    
}

$('#searchFilter').on('keyup', function (e) {
    if($(this).val().length >= 3 ){
        filter($(this).val(), $('#selectData').val());
    }else{
        $('#table').find('tbody tr').show();
    }
});

function filter(txt, col) {
    $('#table').find('tbody tr').each((i, v) =>{

        /* if(col != '' && !isNaN(parseInt(col))){
            //let patron = $(v).find(`td:eq(${col})`).text().toLowerCase();
            $(v).css('display', 'none');
        } */
        
        let patron = $(v).find(`td:eq(${col})`).text().toLowerCase();
        if(patron.indexOf(txt.toLowerCase()) === -1){
            $(v).css('display', 'none');
            console.log('txt: ' + txt + ' col: ' + col);
        }

        
    });
}

init();