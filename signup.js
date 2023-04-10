
function isValid() {
    var errMsgs = document.getElementsByClassName("err");
    for(i=0; i<errMsgs.length; i++)
    {         
    errMsgs[i].innerHTML = ""
    }

    var details = document.getElementsByClassName("signUpField");

    for (let i = 0; i < details.length; i++) {
    if (details[i].value == "")
    {
        document.getElementById("errMsg").innerHTML = "Please fill in all fields!";
        return false;
    }
    }

    if(details[1].value != details[2].value)
    {
        document.getElementById("errMsg1").innerHTML = "Please validate your password again!";
        return false;
    }

    if(details[1].value.length < 8)
    {
        document.getElementById("errMsg1").innerHTML = "Your password is short.";
        return false;
    }

    if(details[1].value.length < 7)
    {
        document.getElementById("errMsg1").innerHTML = "Your password is too short.";
        return false;
    }

    if(((/[0-9]/i.test(details[3].value))))
    {
        document.getElementById("errMsg2").innerHTML = "Name field conatin only letters";
        return false;
    }
    if(((/[0-9]/i.test(details[4].value))))
        {
        document.getElementById("errMsg3").innerHTML = "Name field conatin only letters";
        return false;
    }
    if(!(/[a-z]/i.test(details[1].value)))
    {
        document.getElementById("errMsg1").innerHTML = "Your password weak. Add letters.";
        return false;
    }

    if(!(/[0-9]/i.test(details[1].value)))
    {
        document.getElementById("errMsg1").innerHTML = "Your password weak. Add numbers.";
        return false;
    }

    return true
}
