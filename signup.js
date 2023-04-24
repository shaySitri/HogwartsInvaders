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

    if (flag == false)
    {

        return false;
    }


    if(details[8].value != details[6].value)
    {
        document.getElementById("errMsg1").innerHTML = "Please validate your password again!";
        details[8].style.border = "1px solid red";
        details[6].style.border = "1px solid red";
        flag = false;
    }

    else if(details[6].value.length < 8)
    {
        document.getElementById("errMsg1").innerHTML = "Your password is short.";
        details[6].style.border = "1px solid red";
        flag = false;
    }
    
    else if(!(/[a-z]/i.test(details[6].value)))
    {
        document.getElementById("errMsg1").innerHTML = "Your password weak. Add letters.";
        details[6].style.border = "1px solid red";
        details[8].style.border = "1px solid red";

        flag = false;
    }

    else if(!(/[0-9]/i.test(details[6].value)))
    {
        document.getElementById("errMsg1").innerHTML = "Your password weak. Add numbers.";
        details[8].style.border = "1px solid red";
        details[6].style.border = "1px solid red";
        flag = false;
    }


    if(((/[0-9]/i.test(details[10].value))))
    {
        details[10].style.border = "1px solid red";
        flag = false;
    }
    if(((/[0-9]/i.test(details[12].value))))
        {
        details[12].style.border = "1px solid red";

        flag = false;
    }

    if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(details[14].value)))
    {
        details[14].style.border = "1px solid red";
        flag = false;
    }

    for(i = 0; i < users.length; i++)
    {
        if(details[4].value == users[i].username)
        {
            details[4].value = "User name already exist."
            details[4].style.border = "1px solid red";
            flag = false;
        }
    }
    i = i+1

    if (flag == true)
    {
        addUser(details[4].value, details[6].value)
        clearRegFields()
        $( "#game" ).hide();
        $( "#reg" ).hide();
        $( "#login" ).hide();
        $( "#welcome" ).show();
        return true
    }
    else
    {
        return false;
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
    clearRegFields();

    return;
}

