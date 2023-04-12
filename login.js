function login(uname, pass)
{
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
            }                

        }
    }
    document.getElementById("login_errmsg").innerHTML = "User doesnt exist. Please register first.";
    return false;

}
