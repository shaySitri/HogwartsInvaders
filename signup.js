var users = [{username: 'p', password: 'testuser'}];
i = 0
// subBut = document.getElementById("subForm");
function isValid() {
    var errMsgs = document.getElementsByClassName("err");
    for(i=0; i<errMsgs.length; i++)
    {         
        errMsgs[i].innerHTML = ""
    }

    var details = document.querySelectorAll(".signUpField.fill");

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


    if(details[1].value != details[2].value)
    {
        document.getElementById("errMsg1").innerHTML = "Please validate your password again!";
        details[1].style.border = "1px solid red";
        details[2].style.border = "1px solid red";
        flag = false;
    }

    else if(details[1].value.length < 8)
    {
        document.getElementById("errMsg1").innerHTML = "Your password is short.";
        details[2].style.border = "1px solid red";
        details[1].style.border = "1px solid red";
        flag = false;
    }
    
    else if(!(/[a-z]/i.test(details[2].value)))
    {
        document.getElementById("errMsg1").innerHTML = "Your password weak. Add letters.";
        details[2].style.border = "1px solid red";
        details[1].style.border = "1px solid red";

        flag = false;
    }

    else if(!(/[0-9]/i.test(details[2].value)))
    {
        document.getElementById("errMsg1").innerHTML = "Your password weak. Add numbers.";
        details[1].style.border = "1px solid red";
        details[2].style.border = "1px solid red";
        flag = false;
    }


    if(((/[0-9]/i.test(details[3].value))))
    {
        details[3].style.border = "1px solid red";
        flag = false;
    }
    if(((/[0-9]/i.test(details[4].value))))
        {
        details[4].style.border = "1px solid red";

        flag = false;
    }

    if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(details[5].value)))
    {
        details[5].style.border = "1px solid red";
        flag = false;
    }

    for(i = 0; i < users.length; i++)
    {
        if(details[0].value == users[i].username)
        {
            details[0].value = "";
            details[0].placeholder = "User name already exist.";
            details[0].style.border = "1px solid red";
            flag = false;
        }
    }
    i = i+1

    if (flag == true)
    {
        addUser(details[0].value, details[1].value)
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
        details[i].style.border = "";
    }
    document.getElementById("cb1").checked = false;
    document.getElementById("cb2").checked = false;
    document.getElementById("pass1").type = "password";
    document.getElementById("pass2").type = "password";
    document.getElementById("fname").placeholder = "Enter alphabetic characters only.";
    document.getElementById("lname").placeholder = "Enter alphabetic characters only.";

}

function resetRegisterForm()
{
    clearRegFields();

    return;
}

