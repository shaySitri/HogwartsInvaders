var records = []

function subLogin(uname, pass)
{
        if (uname == "" || pass == "")
        {
            document.getElementById("login_errmsg").innerHTML = "Please Fill in all Fields";
            return
        }

        document.getElementById("login_errmsg").innerHTML = '';

        for (let i = 0; i < users.length; i++) {
            if (users[i].username == uname)
            {
                if (users[i].password != pass)
                {
                    document.getElementById("login_errmsg").innerHTML = "Wrong Password.";
                    document.getElementById("login_pass").style.border = "1px solid red";

                    return;
                }
                else
                {
                    logged = true
                    records = new Array()
                    document.getElementById("span-username").innerHTML = "Hello,     " + uname;
                    document.getElementById("span-username-conf").innerHTML = uname;
                    document.getElementById("login_username").value = '';
                    document.getElementById("login_pass").value = '';
                    document.getElementById("login_errmsg").innerHTML = '';
                    document.getElementById("cb3").checked = false;
                    document.getElementById("login_pass").type = "password"
                    alert('Login Succeed!')
                    $( "#game" ).hide();
                    $( "#config" ).show();
                    $( "#welcome" ).hide();
                    $( "#reg" ).hide();
                    $( "#login" ).hide();

                    return;
                }                

            }
        }
        document.getElementById("login_errmsg").innerHTML = "User doesnt exist. Please register first.";
        document.getElementById("login_username").style.border = "1px solid red";

    }       

function updateRecords(pts)
{
    records.push(pts);
    records.sort();
}

function resetLogin()
{
        document.getElementById("login_username").value = '';
        document.getElementById("login_pass").value = '';

}
