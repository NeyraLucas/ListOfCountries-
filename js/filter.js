function init() {
    let cols = [];
    $('#table').find('thead tr th').each((i, col) =>{
        //push elemts columns
        cols.push({ idx: i, columna: $(col).text()});
    });
    $('#selectData').append(new Option('Seleccione', ''));
    cols.forEach( val => $('#selectData').append(new Option(val['columna'], val['idx'])));
    
    pagination();
}

$('#searchFilter').on('keyup', function (e) {
    if($(this).val().length >= 3 ){
        filter($(this).val(), $('#selectData').val());
    }else{
        $('#table').find('tbody tr').show();
    }
});
//filtro
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

//paginacion
function pagination() {
    $('#paginationRow').on('change', function () {
        $('.pagination').html('');
        let num = 0;
        const maxRows = parseInt($(this).val());
        const rows = $('#table tbody tr').length;
        $('#table tr:gt(0)').each(function(){
            num++;
            if(num > maxRows){
                $(this).hide();
            }
            if(num <= maxRows){
                $(this).show();
            }
        })
        if(rows > maxRows){
            let pag = Math.ceil(rows / maxRows);
            for(let i=1; i<=pag;){
                $('.pagination').append(`<li class="page-item" data-page='${i}'>
                
                <span class="page-link">
                ${i++}
                </span>
                
                </li>`).show();
            }
        }
        
        $('.pagination li:first-child').addClass('active');
        $('.pagination li').on('click', function() {
            const pageNum = $(this).attr('data-page');
            let index = 0;
            $('.pagination li').removeClass('active');
            $(this).addClass('active');
            $('#table tr:gt(0)').each(function() {
                index++;
                if(index > (maxRows*pageNum) || index <= ((maxRows*pageNum)-maxRows)){
                    $(this).hide();
                }else{
                    $(this).show();
                }
            })
        })
    })
}

init();