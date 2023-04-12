function subLogin(uname, pass)
{
    document.getElementById("login_errmsg").innerHTML = "";

    for (let i = 0; i < users.length; i++) {
        if (users[i].username == uname)
        {
            if (users[i].password != pass)
            {
                document.getElementById("login_errmsg").innerHTML = "Wrong Password.";
                return false;
            }
            else
            {
                alert('Login Succeed!')
                $( "#game" ).show();
                $( "#welcome" ).hide();
                $( "#reg" ).hide();
                $( "#login" ).hide();
                document.getElementById("span-username").innerHTML = uname;
                document.getElementById("login_username").value = "";
                document.getElementById("login_pass").value = "";
                document.getElementById("login_errmsg").innerHTML = "";
                return true;
            }                

        }
    }
    document.getElementById("login_errmsg").innerHTML = "User doesnt exist. Please register first.";
    return false;

}

