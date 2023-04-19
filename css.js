const signs = document.querySelectorAll('x-sign')
const randomIn = (min, max) => (
  Math.floor(Math.random() * (max - min + 1) + min)
)

const mixupInterval = el => {
  const ms = randomIn(2000, 4000)
  el.style.setProperty('--interval', `${ms}ms`)
}

signs.forEach(el => {
  mixupInterval(el)
  el.addEventListener('webkitAnimationIteration', () => {
    mixupInterval(el)
  })
})


// (window).addEventListener("load", showForm)
// function showForm()
// {
//     var regImg = document.getElementById("regImg");
//     regImg.addEventListener("load", alert("load"), false)
// }

// // $( '#regImg' ).on( "load", function() {  
// //     $('#regForm').show();
// // });
// // // 

