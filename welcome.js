
// // setup welcome window after whole page loaded

// const register = new Image();
// register.src = "reg.jpg"
// const login = new Image();
// login.src = "login.jpg";  

// window.addEventListener("load", setup, false)



// function setup()
// {
//     canvas = document.getElementById( "theCanvas" );
//     context = canvas.getContext("2d");
//     context.fillStyle = "black";
//     context.font = "bold 49px serif";
//     context.textBaseline = "left";
//     context.fillText("WELCOME TO", 5, 35);
//     draw2();
//     canvas.addEventListener('click', regClick, false)

// }


// function draw2()
// {
            
//     canvas = document.getElementById( "theCanvas" );
//     context = canvas.getContext("2d");

//     context.drawImage(register, 100, 30, 100, 100);
//     context.drawImage(login, 0, 30, 100, 100);
// }

// function regClick(event)
// {
//         i = 0
//         // Get the x and y coordinates of the click 
//         var x = event.pageX - canvas.offsetLeft; 
//         var y = event.pageY - canvas.offsetTop; 
//         // Check if the click was on the image 
//         if (x >= 100 && x < 100 + register.width && y >= 30 && y < 30 + register.height)
//         { 
//             // Print "YAY" to the console 
//             if (i == 0)
//             {
//                 i++;
//                 context.clearRect(0, 0, canvas.width, canvas.height);

//             }
//             else
//             {
//                 registerPage()
//             }

//         }
// }

// function registerPage()
// {

//     canvas = document.getElementById( "theCanvas" );
//     context = canvas.getContext("2d");
//     context.fillStyle = "black";
//     context.font = "bold 49px serif";
//     context.textBaseline = "left";
//     context.fillText("REGISTERRRRR", 400, 35);
// }

// $(window).load(setup());
// // $(register).click(registerPage);

