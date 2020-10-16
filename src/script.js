
$(function () {

    Init();

    var scrollPos = $(document).scrollTop();
    console.log('init scrolltop: ', scrollPos)
    if(scrollPos)
        loadMap();
 });

var mapIncluded = false;
function loadMap()
{
    mapIncluded = true;
    window.onscroll = null;
    include("https://maps.googleapis.com/maps/api/js?key=AIzaSyCrH9vga3QM9PzgYfb_1goHhIGSSos_gQo&callback=initMap&libraries=&v=weekly")
}


function Init()
{
    console.log("Is Mobile: %s", device.mobile());


    particlesJS.load('particles', './src/particles.json');
    

    $(".letter").hover(function () {
        $(this).addClass("animation-spin");
    });

    $(".bounce").hover(function () {
        $(this).addClass("animation-bounce");
    });

    $(".letter, .bounce").bind("webkitAnimationEnd mozAnimationEnd animationend", function () {
        $(this).removeClass("animation-bounce animation-splat")
    });
    
    var mySwiper = new Swiper('.swiper-container', {
        direction: 'horizontal',
        centeredSlides: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
      
        scrollbar: {
          el: '.swiper-scrollbar',
          draggable: false,
          clickable: false,
        },

        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
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
            $('html, body').stop().animate({
                scrollTop: $("." + name).offset().top
            }, 1500);
             
    });

    $(".form").submit(function(e) {
        e.preventDefault();
        // $.post("/functions/send-mail", $form.serialize()).then(function() {
        //     alert("Thank you!");
        // });
        // var form = $(this);
        // $.ajax({
        //     url: ".netlify/functions/send-email", // url where to submit the request
        //     type : "POST", // type of action POST || GET
        //     dataType : 'json', // data type
        //     data : form.serialize(), // post data 
        //     success : function(result) {
        //         console.log(result);
        //     },
        //     error: function(text) {
        //         console.log(text);
        //     }
        // })
        // $.post(, $form.serialize()).then(function(data, status){
        //     console.log("response: " + data);
        // });
    });

    $('.loader').fadeOut(500 ,function(){
        $('.content, .sidebar').animate({
            opacity: 1
        }, 700);
    });

    var letters = $('.home .text-main .bounce, .home .text-main .logo');
    var time = 150;

    setTimeout(function(){
        letters.each(function(index) {
            setTimeout( function(){ 
                $(letters[index]).css('opacity',1).addClass("animation-splat");
            }, time += 130 )
        });

        var items = $('.contact_btn, .home .text-secondary');
        time += 750;
        items.each(function(index) {
            setTimeout( function(){ 
                $(items[index]).css('opacity',1).addClass("animation-splat");
            }, time += 150 )
        });
    
    }, 1500);

    window.onscroll = function() {
        console.log('window.onscroll')
        if (document.body.scrollTop > 1200 || document.documentElement.scrollTop > 1200) {
            if(!mapIncluded)
            {
                loadMap();
            }
            else{
                window.onscroll = null;
            }
         }
    };
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



