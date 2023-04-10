// setup welcome window after whole page loaded

window.addEventListener("load", setup, false)
function setup()
{
        canvas = document.getElementById( "theCanvas" );
        context = canvas.getContext("2d");
        context.fillStyle = "black";
        context.font = "bold 49px serif";
        context.textBaseline = "left";
        context.fillText("WELCOME TO", 5, 35);
        register = new Image();
        register.src = "sunset-1373171.jpg";
    
        login = new Image();
        login.src = "login.jpg";
    
        draw2();
}

function draw2()
{
            
    canvas = document.getElementById( "theCanvas" );
    context = canvas.getContext("2d");

    context.drawImage(register, 100, 0);
    context.drawImage(login, 0, 0, 100, 100);
}
