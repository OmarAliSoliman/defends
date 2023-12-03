$(document).ready(function () {
  var currentDir = $("body").css("direction");
  console.log(currentDir);

  if ($(".side_nav").length) {
    var mobileNavbarTimeLine = gsap.timeline();
    mobileNavbarTimeLine
      .from(".side_nav", { width: 0, padding: "0", x: 5, ease: "ease" })
      .from(".side_nav .close_nav", { opacity: 0, y: 5, ease: "ease", stagger: .05 })
      .from(".side_nav .logo", { opacity: 0, y: 5, ease: "ease" }, ".4")
      .from(".side_nav li", { opacity: 0, y: 10, ease: "ease", stagger: .05 }, ".4")
      // .from(".side_nav .lang", { opacity: 0, x: 5, ease: "ease" }, ".4")
      // .from(".side_nav .second_logo", { opacity: 0, x: 5, ease: "ease" }, ".4")

    mobileNavbarTimeLine.reversed(true);

    $(".custom_navbar .nav_icon").on('click', function (e) {
      console.log("f")
      mobileNavbarTimeLine.reversed(false);
      $(".bg_opennav").addClass("bg_opennav_active");
    })


    $(".side_nav .close_nav").on('click', function (e) {
      mobileNavbarTimeLine.reversed(true);
      setTimeout(() => {
        $(".bg_opennav").removeClass("bg_opennav_active");
      }, 1000)

    })


    $(".side_nav a").on('click', function (e) {
      mobileNavbarTimeLine.reversed(true);
      // $(".bg_opennav").removeClass("bg_opennav_active");
      setTimeout(() => {
        $(".bg_opennav").removeClass("bg_opennav_active");
      }, 1000)
    })

    $(".bg_opennav").on('click', function (e) {
      mobileNavbarTimeLine.reversed(true);
      // $(this).removeClass("bg_opennav_active");
      setTimeout(() => {
        $(".bg_opennav").removeClass("bg_opennav_active");
      }, 1000)
    })

  }

  if($(".footer").length){
    $(".footer .back_to_top").on('click', function(e){
      e.preventDefault();
      $('html, body').animate({scrollTop:0}, '300');
    })
  }

  if($(".custom_navbar").length){
    $(window).scroll(()=>{
      if($(this).scrollTop() > 10){
        $(".custom_navbar").addClass("fixed_navbar")
      }else{
        $(".custom_navbar").removeClass("fixed_navbar")
      }
    })
  }

  AOS.init();
});

var scene = document.getElementById("scene");
var parallaxInstance = new Parallax(scene);



var overlay = document.querySelector(".splashoverlay"),
  loader = document.querySelector(".overlay-loader"),
  overlayTL = new TimelineMax(),
  loaderTL = new TimelineMax();

var animateOut = function () {
  overlayTL.to(overlay, 0.6, {
    bottom: "100%",
    ease: Power4.easeInOut,
    height: 0,
    delay: 0.25,
  });
  loaderTL.to(loader, 0.5, { y: "-40", opacity: 0 });
  gsap.to(counter, 0.5, { y: "-40", opacity: 0 });
};

// counter loading page
var Cont = { val: 0 },
  NewVal = 100;

TweenLite.to(Cont, 15, {
  val: NewVal,
  roundProps: "val",
  onUpdate: function () {
    document.getElementById("counter").innerHTML = Cont.val;
  },
});

$(window).on("load", function () {
  var currentDir = $("body").css("direction");
  setTimeout(() => {
    animateOut();
  }, 2000);
});
