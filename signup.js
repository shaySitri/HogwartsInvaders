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

    flag = true;
    for (let i = 0; i < details.length; i++) {
        if (details[i].value == "")
        {
            details[i].style.border = "1px solid red";
            flag = false;
        }
        else if (details[i].value != "")
        {
            details[i].style.border = "";
        }
    
    }


    if(details[3].value != details[5].value)
    {
        document.getElementById("errMsg1").innerHTML = "Please validate your password again!";
        details[3].style.border = "1px solid red";
        details[5].style.border = "1px solid red";
        flag = false;
    }

    if(details[3].value.length < 8)
    {
        document.getElementById("errMsg1").innerHTML = "Your password is short.";
        details[3].style.border = "1px solid red";
        flag = false;
    }

    // if(details[1].value.length < 7)
    // {
    //     document.getElementById("errMsg1").innerHTML = "Your password is too short.";
    //     return false;
    // }

    if(((/[0-9]/i.test(details[7].value))))
    {
        document.getElementById("errMsg2").innerHTML = "Name field conatin only letters";
        details[7].style.border = "1px solid red";
        flag = false;
    }
    if(((/[0-9]/i.test(details[9].value))))
        {
        document.getElementById("errMsg3").innerHTML = "Name field conatin only letters";
        details[9].style.border = "1px solid red";

        flag = false;
    }
    if(!(/[a-z]/i.test(details[3].value)))
    {
        document.getElementById("errMsg1").innerHTML = "Your password weak. Add letters.";
        details[3].style.border = "1px solid red";
        details[5].style.border = "1px solid red";

        flag = false;
    }

    if(!(/[0-9]/i.test(details[3].value)))
    {
        document.getElementById("errMsg1").innerHTML = "Your password weak. Add numbers.";
        details[3].style.border = "1px solid red";
        details[5].style.border = "1px solid red";
        flag = false;
    }
    if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(details[11].value)))
    {
        details[11].style.border = "1px solid red";
        flag = false;
    }

    for(i = 0; i < users.length; i++)
    {
        if(details[1].value == users[i].username)
        {
            document.getElementById("errMsg4").innerHTML = "User already exist.";
            details[1].style.border = "1px solid red";
            flag = false;
        }
    }
    i = i+1

    if (flag == true)
    {
        addUser(details[1].value, details[3].value)
        clearRegFields()
        $( "#game" ).hide();
        $( "#reg" ).hide();
        $( "#login" ).hide();
        $( "#welcome" ).show();
    }

    
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

function resetRegisterForm()
{
    var details = document.getElementsByClassName("signUpField");

    for (let i = 0; i < details.length; i++) {
        {
            if (details[i].tagName.toLowerCase() === 'input')
            {
                details[i].value = "";
                details[i].style.border = "";
            }
        }
    }

    return;
}

