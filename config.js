var keyCode = 32
var numMin = 2
var numSec = 0
var sec = 120
var newsec = 120


function choseKey (event){
    var shotKey =  document.getElementById("KeyToShot");
    var prev = shotKey.value
    if((event.which >= 65 && event.which <= 90) || event.which === 32 ){
        shotKey.value = event.key
        keyCode = event.which;
        if(event.which === 32){
            shotKey.value = "Space"
        }
        // alert(`Key pressed ${keyCode} \r\n Key code value: ${shotKey.value}`);
    }

    else{
        shotKey.value = prev
    }
    
    
}

function changeSec(){
    numSec =  document.getElementById("numSec").value;
    if(numSec > 59){
        numSec = 59
    }
    if(numSec< 0){
        numSec = 0
    }

    sec = numSec*1 + numMin * 60
    
}

function changeMin(){
    numMin =  document.getElementById("numMin").value;
    if(numMin < 2){
        numMin = 2
    }

    sec = numSec*1 + numMin * 60
    
}

function saveConfig(){

    newsec = sec
    alert(newsec);
    
    
    document.getElementById("numMin").value = 2
    document.getElementById("numSec").value = 0
    document.getElementById("KeyToShot").value = "Space"
    sec = 120


    $( "#config" ).hide();
    $( "#welcome" ).hide();
    $( "#reg" ).hide();
    $( "#login" ).hide();
    $( "#game" ).show();
}


