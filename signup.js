var users = [{username: 'p', password: 'testuser'}];
i = 0
// subBut = document.getElementById("subForm");

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

    for(i = 0; i < users.length; i++)
    {
        if(details[0].value == users[i].username)
        {
            document.getElementById("errMsg4").innerHTML = "User already exist.";
            return false;
        }
    }
    i = i+1

    addUser(details[0].value, details[1].value)

    clearRegFields()
    $( "#game" ).hide();
    $( "#reg" ).hide();
    $( "#login" ).hide();
    $( "#welcome" ).show();

    return true;
}

function addUser(name, pass)
{
    users[users.length] = 
    {
        username: name,
        password: pass
    }

    alert("User Created!");

}

function clearRegFields()
{
    var details = document.getElementsByClassName("signUpField");
    for (let i = 0; i < details.length; i++) {
        details[i].value = '';
    }
    document.getElementById("cb1").checked = false;
    document.getElementById("cb2").checked = false;
    document.getElementById("pass1").type = "password";
    document.getElementById("pass2").type = "password";
}
