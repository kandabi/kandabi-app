

// window.onload = function() {
//     Particles.init({
//       selector: '.canvas',
//       //color: "#FCED16",
//       color:"#FD1056",
//       sizeVariations:4,
//       maxParticles:140,
//       minDistance: 110,
//       connectParticles: true
//     });
//   };



$(function () {
    Particles.init({
        selector: '.canvas',
        //color: "#FCED16",
        color: "#FD1056",
        sizeVariations: 4,
        maxParticles: 140,
        minDistance: 110,
        connectParticles: true
    });

    $(".letter").hover(function () {
        console.log("anim")
        $(this).addClass("animation-target");
    })


    $(".letter").bind("webkitAnimationEnd mozAnimationEnd animationend", function () {
        $(this).removeClass("animation-target")
    })
});
