$(function () {
  Init();
  var scrollPos = $(document).scrollTop();
  if (scrollPos) {
    loadMap();
    if (!device.mobile()) setHeaderSelection(scrollPos);
  }
});

function loadMap() {
  mapIncluded = true;
  include(
    "https://maps.googleapis.com/maps/api/js?key=AIzaSyAScQpWWuRroGpbJRjIYboHrpCQr9vl_Ts&callback=initMap&libraries=&v=weekly"
  );
}

function Init() {
  console.log("Is Mobile: %s", device.mobile());
  var prePath = pageLanguage == "en" ? "." : "..";
  particlesJS.load("particles", prePath + "/src/particles.json");

  const observer = lozad(); // lazy loads elements with default selector as '.lozad'
  observer.observe();

  $(".letter, .bounce").bind("webkitAnimationEnd mozAnimationEnd animationend", function () {
    $(this).removeClass("animation-splat");
  });

  swiper = new Swiper(".swiper-container", {
    direction: "horizontal",
    centeredSlides: true,

    autoplay: {
      delay: 6000,
      disableOnInteraction: true,
    },

    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },

    scrollbar: {
      el: ".swiper-scrollbar",
      draggable: false,
      clickable: false,
    },

    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

  swiper.on("slideChange", function () {
    if (theaterActive) closeTheater();
  });

  $(".project-content").click(function () {
    if (theaterActive) closeTheater();
    else openTheater($(this));
  });

  $(".about, .contact").click(function () {
    closeTheater();
  });

  $(".sidebar .item, .contact_btn, .sidebar .logo, .phone, .footer .item").click(function () {
    var value = $(this).attr("value");
    console.log("button_clicked: ", value);
    gtag("event", "click", { event_label: "button_clicked", value: value });

    if (
      value.includes("phone") ||
      value.includes("linkedin") ||
      value.includes("github") ||
      value.includes("facebook")
    )
      return;

    $("html, body")
      .stop()
      .animate({ scrollTop: $("." + value).offset().top }, 1500);

    if (menuActive) closeMenu();
  });

  $(".loader").fadeOut(500, function () {
    var popup = cookie("popup");
    if (popup != null) {
      $(".cookie_popup").remove();
    }
    $(".content, .sidebar, .cookie_popup").animate({ opacity: 1 }, 700);
  });

  var letters = $(".home .text-main h1, .home .text-main h2, .home .text-main h3");
  var time = 150;
  setTimeout(function () {
    letters.each(function (index) {
      setTimeout(function () {
        $(letters[index]).animate({ left: "0", opacity: 1 }, 450);
      }, (time += 350));
    });

    var items = $(".contact_btn, .home .text-secondary");
    time += 600;
    items.each(function (index) {
      setTimeout(function () {
        $(items[index]).animate({ opacity: 1 }, 500);
      }, (time += 350));
    });
  }, 1200);

  if (device.mobile()) {
    $(".sidebar .hamburger_icon").click(function () {
      if (menuActive) closeMenu();
      else openMenu();
    });
  }

  $(".sidebar .lang_icon").click(function () {
    if (langMenuActive) closeLangMenu();
    else openLangMenu();
  });

  var form = document.getElementById("form");
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    console.log("submit event");
    setTimeout(submitForm, 1000);

    var formSubmitted = false;
    function submitForm() {
      if (!formSubmitted) {
        console.log("form submitted");
        formSubmitted = true;
        form.submit();
      }
    }

    gtag("event", "generate_lead", { event_callback: submitForm });
  });

  window.onscroll = function () {
    var scrollTop = document.documentElement.scrollTop;
    if (!device.mobile()) setHeaderSelection(scrollTop);

    if (!mapIncluded) {
      if (scrollTop > 1200) loadMap();
    }
  };

  $(".project-bottom-text a").click(function () {
    var value = $(this).attr("value");
    console.assert(value);
    console.log("project_hyperlink_clicked", value);
    gtag("event", "click", {
      event_label: "slide_hyperlink_clicked",
      value: value,
    });
  });

  $(".cookie_btn").click(function () {
    popupCookie();
  });
}

var swiper = null;
var theaterItem = null;
var theaterActive = false;
var mapIncluded = false;
var menuActive = false;
var langMenuActive = false;
var menuAnimating = false;
var headerActive = false;
cookie = (key) =>
  (new RegExp((key || "=") + "=(.*?); ", "gm").exec(document.cookie + "; ") || ["", null])[1];

function RedirectByLanguage(pageLanguage) {
  var browserLanguage = navigator.language || navigator.browserLanguage;
  var redirected = cookie("redirected");
  console.log("redirected", redirected, " language", browserLanguage);
  if (redirected == null || (!redirected && browserLanguage != pageLanguage)) {
    document.cookie = "redirected=true; path=/";
    var path = pageLanguage == "en" ? "." : "..";
    switch (browserLanguage) {
      case "he":
        path += "/he/";
        break;
      case "es":
        path += "/es/";
        break;
    }

    location = path;
  }
}

function popupCookie() {
  $(".cookie_popup").fadeOut(function () {
    this.remove();
  });
  var popup = cookie("popup");
  if (popup == null) {
    document.cookie = "popup=true; path=/";
    console.log("cookie is null");
  } else {
    console.log("cookie is NOT null");
  }
}

function openMenu() {
  if (menuAnimating) {
    return;
  } else if (langMenuActive) {
    closeLangMenu();
    setTimeout(openMenu, 450);
    return;
  }

  menuAnimating = true;
  $(".sidebar").animate({ height: "100%" }, 150, function () {
    $(".sidebar .menu").animate({ opacity: "1" }, 220);
    menuAnimating = false;
  });

  console.log("openMenu");
  gtag("event", "click", { event_label: "open_menu" });
  menuActive = true;
}

function closeMenu() {
  if (menuAnimating) {
    return;
  }

  menuAnimating = true;
  $(".sidebar").animate({ height: "56px" }, 200, function () {
    menuAnimating = false;
  });
  $(".sidebar .menu").animate({ opacity: "0" }, 200);

  console.log("closeMenu");
  menuActive = false;
}

function openLangMenu() {
  if (menuAnimating) {
    return;
  } else if (menuActive) {
    closeMenu();
    setTimeout(openLangMenu, 450);
    return;
  }

  menuAnimating = true;
  $(".sidebar").animate({ height: "110px" }, 100, function () {
    $(".sidebar .language_dropdown").animate({ opacity: "1" }, 100, function () {
      menuAnimating = false;
    });
  });

  console.log("openLangMenu");
  gtag("event", "click", { event_label: "open_lang_menu" });

  langMenuActive = true;
}

function closeLangMenu() {
  if (menuAnimating) {
    return;
  }

  menuAnimating = true;
  $(".sidebar").animate({ height: "56px" }, 350);

  $(".sidebar .language_dropdown").animate({ opacity: "0" }, 350, function () {
    menuAnimating = false;
  });

  console.log("closeLangMenu");
  langMenuActive = false;
}

function setHeaderSelection(scrollTop) {
  var selector = null;

  if (!headerActive) {
    $(".sidebar").addClass("active_sidebar");
    headerActive = true;
  }

  if (document.documentElement.scrollHeight * 0.02 > scrollTop) {
    selector = "home";

    if (headerActive) {
      $(".sidebar").removeClass("active_sidebar");
      headerActive = false;
    }
  } else if (
    document.documentElement.scrollHeight * 0.2 < scrollTop &&
    document.documentElement.scrollHeight * 0.3 > scrollTop
  ) {
    selector = "about";
  } else if (
    document.documentElement.scrollHeight * 0.45 < scrollTop &&
    document.documentElement.scrollHeight * 0.5 > scrollTop
  ) {
    selector = "portfolio";
  } else if (
    document.documentElement.scrollHeight * 0.66 < scrollTop &&
    document.documentElement.scrollHeight * 0.8 > scrollTop
  ) {
    selector = "contact";
  }

  if (selector != null) {
    $(".sidebar .menu .item .button").removeClass("selected");
    $(".sidebar .menu .item[value='" + selector + "'] .button").addClass("selected");
  }
}

function openTheater(item) {
  $(".overlay").css("display", "block");

  $(item).prev().addClass("blur");
  $(".swiper-pagination, .swiper-scrollbar, .swiper-button-next, .swiper-button-prev").addClass("blur");
  $(item).addClass("theater-mode");
  $(".portfolio").addClass("height");

  theaterItem = item;
  theaterActive = true;

  swiper.autoplay.stop();
  var value = $(item).attr("value");

  console.log("theater_clicked", value);
  gtag("event", "click", { event_label: "theater_mode", value: value });
}

function closeTheater() {
  $(".overlay").css("display", "none");

  $(theaterItem).prev().removeClass("blur");
  $(theaterItem).removeClass("theater-mode");
  $(".swiper-pagination, .swiper-scrollbar, .swiper-button-next, .swiper-button-prev").removeClass(
    "blur"
  );
  $(".portfolio").removeClass("height");

  theaterItem = null;
  theaterActive = false;
  swiper.autoplay.start();
}

function include(filename) {
  var head = document.getElementsByTagName("head")[0];

  var script = document.createElement("script");
  script.src = filename;
  script.type = "text/javascript";
  script.defer = true;
  script.add;

  head.appendChild(script);
}

function createFunctionWithTimeout(callback, opt_timeout) {
  var called = false;
  function fn() {
    if (!called) {
      called = true;
      callback();
    }
  }
  setTimeout(fn, opt_timeout || 1000);
  return fn;
}
