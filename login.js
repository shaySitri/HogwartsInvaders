var records = []
var logged = false;
var userLogged = ""

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
                    userLogged = uname
                    logged = true
                    records = new Array()
                    document.getElementById("span-username").innerHTML = "Hello,     " + userLogged;
                    document.getElementById("span-username-conf").innerHTML = userLogged;
                    document.getElementById("login_username").value = '';
                    document.getElementById("login_pass").value = '';
                    document.getElementById("login_errmsg").innerHTML = '';
                    document.getElementById("cb3").checked = false;
                    document.getElementById("login_pass").type = "password"
                    alert('Login Succeeded!')
                    showGame();
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
    records.reverse();
}

function resetLogin()
{
        document.getElementById("login_username").value = '';
        document.getElementById("login_pass").value = '';
        document.getElementById("login_username").style.border = "";
        document.getElementById("login_pass").style.border = "";

}

function showGame()
{
    $( "#game" ).hide();
    $( "#config" ).show();
    $( "#welcome" ).hide();
    $( "#reg" ).hide();
    $( "#login" ).hide();
    $ ('#regNav').hide();
    $ ('#logNav').hide();
    $( ".loginOnly" ).show();
    stopTimer();
    setupGame();
}