
function choseKey (event){
    var shotKey =  document.getElementById("KeyToShot");
    var prev = shotKey.value
    if((event.which >= 65 && event.which <= 90) || event.which === 32 ){
        shotKey.value = event.key
        var keyCode = event.which;
        if(event.which === 32){
            shotKey.value = "Space"
        }
        // alert(`Key pressed ${keyCode} \r\n Key code value: ${shotKey.value}`);
    }

    else{
        shotKey.value = prev
    }
    
    
}
