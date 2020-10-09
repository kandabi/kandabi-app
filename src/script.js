$(function () {
    Particles.init({
        selector: '#canvas',
        color: "#FD1056",
        sizeVariations: 4,
        maxParticles: 140,
        minDistance: 110,
        connectParticles: true
    });

    $(".sidebar .bigspin, .text-main .bigspin").hover(function () {
        $(this).addClass("animation-bigspin");
    });

    $(".sidebar .bigspin, .text-main .bigspin").bind("webkitAnimationEnd mozAnimationEnd animationend", function () {
        $(this).removeClass("animation-bigspin")
    });

    $(".bounce").hover(function () {
        console.log('bounce')
        $(this).addClass("animation-bounce");
    });

    $(".bounce").bind("webkitAnimationEnd mozAnimationEnd animationend", function () {
        $(this).removeClass("animation-bounce")
    });

    $(".letter").hover(function () {
        $(this).addClass("animation-spin");
    });

    $(".letter").bind("webkitAnimationEnd mozAnimationEnd animationend", function () {
        $(this).removeClass("animation-spin")
    });

    var mySwiper = new Swiper('.swiper-container', {
        // Optional parameters
        direction: 'horizontal',
        centeredSlides: true,
        loop: true,
        autoplay: { delay: 3000, },
        // If we need pagination
        pagination: {
          el: '.swiper-pagination',
        },
      
        // And if we need scrollbar
        scrollbar: {
          el: '.swiper-scrollbar',
        },
      })


      var typed = new Typed('#typed', {
        stringsElement: '#typed-strings',
        loop: true,
        smartBackspace:false,
        typeSpeed: 180,
        backSpeed: 100,
        backDelay: 1200,
        startDelay: 700,
      });
});
