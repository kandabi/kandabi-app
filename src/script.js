
$(function () {
    Init();
    if(enableMap)
        include("https://maps.googleapis.com/maps/api/js?key=AIzaSyCrH9vga3QM9PzgYfb_1goHhIGSSos_gQo&callback=initMap&libraries=&v=weekly")
 });


function Init()
{
    console.log("Is Mobile: %s", device.mobile());

    particlesJS.load('particles', './src/particles.json');

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

    $(".letter").hover(function () {
        $(this).addClass("animation-spin");
    });
    
    var mySwiper = new Swiper('.swiper-container', {
        // Optional parameters
        direction: 'horizontal',
        centeredSlides: true,
        // loop: true,
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


    $('.sidebar .item, .contact_btn').click(function(){
            var name = $(this).attr('value');
            $('html, body').animate({
                scrollTop: $("." + name).offset().top
            }, 1500);
             
    });

    $(".form").submit(function(e) {
        e.preventDefault();
      
        var $form = $(this);
        $.post($form.attr("action"), $form.serialize()).then(function() {
            alert("Thank you!");
        });
    });

    $.get("/.netlify/functions/hello", function(data, status){
        alert("Data: " + data + "\nStatus: " + status);
    });
}






 function include(filename)
 {
    var head = document.getElementsByTagName('head')[0];
 
    var script = document.createElement('script');
    script.src = filename;
    script.type = 'text/javascript';
    script.add
 
    head.appendChild(script)
 }   



