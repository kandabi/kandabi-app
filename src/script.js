
$(function () {

    Init();

    var scrollPos = $(document).scrollTop();
    console.log('init scrolltop: ', scrollPos)
    if(scrollPos)
        loadMap();
 });

function loadMap()
{
    mapIncluded = true;
    window.onscroll = null;
    include("https://maps.googleapis.com/maps/api/js?key=AIzaSyAScQpWWuRroGpbJRjIYboHrpCQr9vl_Ts&callback=initMap&libraries=&v=weekly")
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
    
    swiper = new Swiper('.swiper-container', {
        direction: 'horizontal',
        centeredSlides: true,

        autoplay: {
            delay: 6000,
            disableOnInteraction: true
        },

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
      });

    var typed = new Typed('#typed', {
        stringsElement: '#typed-strings',
        loop: true,
        smartBackspace:false,
        typeSpeed: 180,
        backSpeed: 100,
        backDelay: 1200,
        startDelay: 700,
    });

    swiper.on('slideChange', function () {
        if(theaterActive)
            closeTheater()

        if(player.getPlayerState() != -1)
            player.stopVideo();
    });

    $('.project-content').click(function(){
        if(theaterActive)
            closeTheater()
        else
            openTheater($(this))
    });

    $('.about, .contact').click(function(){
        closeTheater()
    });


    $('.sidebar .item, .contact_btn, .sidebar .logo').click(function(){
        var name = $(this).attr('value');
        if(!name) return;

            console.log('name:', name)
        $('html, body').stop().animate({
            scrollTop: $("." + name).offset().top
        }, 1500);

        if(menuActive)
            toggleMenu();
    });

    $(".form").submit(function(e) {
        // e.preventDefault();
        // var form = $(this);
        // $.ajax({
        //     url: ".netlify/functions/send-mail", // url where to submit the request
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

    if(device.mobile()) {
        $('.sidebar .hamburger_menu').click(function(){
            toggleMenu();
        })
    }

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

var swiper = null;
var theaterItem = null;
var theaterActive = false;
var mapIncluded = false;
var menuActive = false;
var player = null;


function onYouTubeIframeAPIReady() {
    player = new YT.Player('telloVideo');
}

function toggleMenu() {


    if(menuActive) {
        $('.sidebar .menu').animate({
            top: '-100%',
            opacity:'0',
        }, 350)

        console.log('toggleMenu: ', true)
    }
    else {
        $('.sidebar .menu').animate({
            top: '56px',
            opacity: '1',
        }, 350)

        console.log('toggleMenu: ', false)
    }

    menuActive = !menuActive;


}

function openTheater(item) {
    $('.overlay').css('display', 'block');

           
    $(item).prev().addClass('blur');   
    $('.swiper-pagination, .swiper-scrollbar, .swiper-button-next, .swiper-button-prev').addClass('blur'); 
    $(item).addClass("theater-mode");
    $('.portfolio').addClass('height'); 

    theaterItem = item;
    theaterActive = true;

    swiper.autoplay.stop();
}

function closeTheater() {
    $('.overlay').css('display', 'none');
      
    $(theaterItem).prev().removeClass('blur');   
    $(theaterItem).removeClass("theater-mode");
    $('.swiper-pagination, .swiper-scrollbar, .swiper-button-next, .swiper-button-prev').removeClass('blur'); 
    $('.portfolio').removeClass('height');   

    theaterItem = null;
    theaterActive = false;
    swiper.autoplay.start();
}

function include(filename) {
    var head = document.getElementsByTagName('head')[0];
 
    var script = document.createElement('script');
    script.src = filename;
    script.type = 'text/javascript';
    script.add
 
    head.appendChild(script)
 }   