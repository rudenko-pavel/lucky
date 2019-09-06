var initSwipe = function(){
    $('.carousel').carousel({
        interval: 4000,
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

var addControlButtons = function(){
  $('#wrapBtnGallery').append('<a id="btn-gallery-pause" class="btn-floating btn-success fas fa-pause"></a>');
  $('#wrapBtnGallery').append('<a id="btn-gallery-play" class="btn-floating btn-success fas fa-play"></a>');
  $("#btn-gallery-play").click(function(){
      $(".carousel").carousel('cycle');
      $(this).css("display","none");                               
      $("#btn-gallery-pause").css("display","inline-block");
  });
  $("#btn-gallery-pause").click(function(){
      $(".carousel").carousel('pause'); 
      $(this).css("display","none");                               
      $("#btn-gallery-play").css("display","inline-block");
  });
  $("#btn-zoom").click(function(){
      var imgZoom = $('.item.active');
      $(this).attr("data-target",imgZoom[0]["firstChild"]["dataset"]["target"]);
  })
}
