var users = [{username: 'p', password: 'testuser'}];
i = 0
subBut = document.getElementById("subForm");

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
        }
    }

    if(details[1].value != details[2].value)
    {
        document.getElementById("errMsg1").innerHTML = "Please validate your password again!";
    }

    if(details[1].value.length < 8)
    {
        document.getElementById("errMsg1").innerHTML = "Your password is short.";
    }

    if(details[1].value.length < 7)
    {
        document.getElementById("errMsg1").innerHTML = "Your password is too short.";
    }

    if(((/[0-9]/i.test(details[3].value))))
    {
        document.getElementById("errMsg2").innerHTML = "Name field conatin only letters";
    }
    if(((/[0-9]/i.test(details[4].value))))
        {
        document.getElementById("errMsg3").innerHTML = "Name field conatin only letters";
    }
    if(!(/[a-z]/i.test(details[1].value)))
    {
        document.getElementById("errMsg1").innerHTML = "Your password weak. Add letters.";
    }

    if(!(/[0-9]/i.test(details[1].value)))
    {
        document.getElementById("errMsg1").innerHTML = "Your password weak. Add numbers.";
    }

    for(i = 0; i < users.length; i++)
    {
        if(details[0].value == users[i].username)
        {
            document.getElementById("errMsg4").innerHTML = "User already exist.";
        }
    }
    i = i+1

    addUser(details[0].value, details[1].value)
    var details = document.getElementsByClassName("signUpField");
    for (let i = 0; i < details.length; i++) {
        details[i].value == ""
    }

    $( "#game" ).hide();
    $( "#reg" ).hide();
    $( "#welcome").show();
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
