function setupGame()
{
   canvas = document.getElementById( "theCanvas" );
   context = canvas.getContext("2d");

   canvas.height = window.innerHeight * 0.7;
   canvas.width = window.innerWidth * 0.7;

   canvas.width = canvas.width; // clears the canvas (from W3C docs)

}