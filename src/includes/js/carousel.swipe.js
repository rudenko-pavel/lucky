var initSwipe = function(){
    $('.carousel').carousel({
        interval: 5000,
        touch: true,
        ride: "carousel",
        pause: "hover"
    })
    
    $(".carousel").swipe({
        swipe: function(event, direction) {
          if (direction == 'left') {$(this).carousel('next'); console.log(event);}
          if (direction == 'right') {$(this).carousel('prev');}
          if (event.type == 'touchstart') {console.log("click");$(".carousel").carousel("pause");}
        },
        allowPageScroll:"vertical"
    });
}
