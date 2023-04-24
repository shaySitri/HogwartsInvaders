// Get the modal

function displayModal(id)
{   
    var modal = document.getElementById(id)
    $( modal ).css("display", "block")
    $( ".overlay" ).css("pointer-events", "none")
}

function hideModal(id)
{
    var modal = document.getElementById(id)
    $( modal ).css("display", "none")
    $( ".overlay" ).css("pointer-events", "all")

}

function drawTable(tableid, records)
{
    var myTableDiv = document.getElementById(tableid);

    var table = document.createElement('TABLE');
    table.border = '0';

    var tr = document.createElement('tr');
    var td1 = document.createElement('td');
    var td2 = document.createElement('td');
    var text1 = document.createTextNode("Place");
    var text2 = document.createTextNode("Points");
    td1.appendChild(text1);
    td2.appendChild(text2);
    tr.appendChild(td1);
    tr.appendChild(td2);
    table.appendChild(tr);

  
    for (let i = 0; i < records.length; i++)
    {
            var tr = document.createElement('tr');   
        
            var td1 = document.createElement('td');
            var td2 = document.createElement('td');
        
            var text1 = document.createTextNode((i+1) + " - ");
            var text2 = document.createTextNode(records[i]);
        
            td1.appendChild(text1);
            td2.appendChild(text2);
            tr.appendChild(td1);
            tr.appendChild(td2);
        
            table.appendChild(tr);
    }

    myTableDiv.appendChild(table);     
}

function clearDiv(id)
{
    var div = document.getElementById(id);
    while(div.firstChild){
        div.removeChild(div.firstChild);
    }
}
