$.runItems="";
$.runnings="";
$.storageImg = "dist/img/events/";
$.modalImg = "";
$.newIndicator = "";

$.getJSON( "dist/includes/json/events.json", function( data ) {
    $.runnings = data.data;
})
.done(function(){
    if ($.runItems.length==0){
        var newItem = "";
        var newIndicator ="";
        $.each( $.runnings, function(key) {
            var addClass="";
            if (key==0) addClass=" active";
            newItem=
                "<div data-currid='"+key+"' class='timeline-item carousel-item"+addClass+"'>"+
                    "<div class='timeline-visual col-12 col-sm-12 col-md-6'>"+
                        "<img class='card-img-top' src='"+$.storageImg+$.runnings[key]["runId"]+".jpg' alt='"+$.runnings[key]["name"]+"'>"+
                    "</div>"+
                    "<div class='card-body timeline-detail col-12 col-sm-12 col-md-6'>"+
                        "<h5>"+$.runnings[key]["name"]+"</h5>"+
                        "<div class='niceDate'>"+$.runnings[key]["runDate"]+"</div>"+
                        "<div>"+$.runnings[key]["descriptions"]+"</div>"+
                        "<a class='btn btn-info btn-block my-4'>Подробнее</a>"+
                    "</div>"+
                "</div>";
            newIndicator ="<li data-target='#carouselEvents' data-slide-to='"+key+"' class='btn ind"+addClass+"'><div class='inTimeline'>"+$.runnings[key]["runDate"]+"</div></li>";
                $.runItems = $.runItems + newItem;
                $.newIndicator = $.newIndicator + newIndicator;
        });
        $("#listbox-events").prepend($.runItems);
        $("#carousel-indicators").prepend($.newIndicator);


    }
})
.done(function(){
    $.getScript("dist/includes/js/mypreloader.js",function(){
        console.log("`mypreloader.js` is DONE");
        
      }); 
})
.always(function(){

});

/****************** TOOLTIP **************/
$.getScript("./dist/includes/js/vendor/tooltipster.bundle.min.js",function(){
    $(document).ready(function() {
        $('.mytooltip').tooltipster({
            contentCloning: true,
            functionPosition: function(instance, helper, position){
                position.coord.top += 10;
                position.coord.left += 10;
                return position;
            },
            interactive: true
        });
        
    });
});


/****************** TEXTWAVE **************/
$.getScript("./dist/includes/js/vendor/jquery.textwave.js",function(){
console.log("load textwave");
});

 // run the currently selected effect
$.repeatCount = 0;
 function runEffect() {
   // Run the effect
   $.repeatCount<8 ? $( "#logoImg" ).effect( "bounce", 1000 ): "";
   $('#content2').textWave({
        ratio: 2,
        repeat: 2,
        framerate: 60
    })
    $.repeatCount++;
 };
 $(document).ready(function(){
    setInterval(runEffect,10000);

    $('.carousel').carousel({
        interval: 0,
        touch: true,
        ride: true
    })
    
    $.maxWidth = $( "#carouselEvents" ).width();
    $.positionLeft = $.maxWidth/2;   
    $( "#carousel-indicators" ).css("left",$.positionLeft+"px");

    /***** action after change current slide *****/
    $("#carouselEvents").bind("slid.bs.carousel",function(){
        var flagCurrIndicator = $( ".carousel-item.active" ).data("currid");
        console.log("flagCurrIndicator",flagCurrIndicator);
        $( ".btn.ind" ).removeClass(function() {
            $( this ).data("slide-to") == flagCurrIndicator ? $( this ).addClass( "active" ) : $( this ).removeClass( "active" );

          });


        $.positionLeft = $.maxWidth/2 + 50 - ($( ".carousel-item.active" ).data("currid")+1)*106;   
        var newValue = $.positionLeft+"px";
        
        var left = $('#carousel-indicators').left;
        $("#carousel-indicators").css({left:left}).animate({"left":newValue}, "slow");
        $( "#carousel-indicators" ).css("left",$.positionLeft);
     });


});

