$.runItems="";  // list all events  (from CAROUSEL)
$.runnings="";  // data  events from JSON
$.storageImg = "dist/img/events/";
$.modalImg = "";
$.newIndicator = "";
$.accordionItems="";    // list tabs from accordion 

$.getJSON( "dist/includes/json/events.json", function( data ) {
    $.runnings = data.data;
    $.getJSON( "dist/includes/json/accordion.json", function( data ) {
        $.home01 = data.home01;
    })
    .done(function(){
        // add data to `#accordion`
        if ($.accordionItems.length==0){
            var newItemAccordion = "";
            $.each( $.home01, function(key) {
                newItemAccordion=
                '<div class="card">'+
                    '<div class="card-header eventtype alert alert-info" style="background-image:url(/dist/img/logo/'+$.home01[key]["bgImg"]+'.png)" role="tab"  id="heading'+$.home01[key]["id"]+'">'+
                        '<h5 class="mb-0">'+
                            '<a class="btn btn-info btn-block my-4" data-toggle="collapse" href="#'+$.home01[key]["id"]+'" aria-expanded="true" aria-controls="collapseOne">'+$.home01[key]["name"]+'</a>'+
                        '</h5>'+
                    '</div>'+
                    '<div id="'+$.home01[key]["id"]+'" class="collapse"  role="tabpanel" aria-labelledby="heading'+$.home01[key]["id"]+'" data-parent="#accordion">'+
                        '<div class="card-body">'+$.home01[key]["description"]+'</div>'+
                    '</div>'+
                '</div>'
                $.accordionItems = $.accordionItems + newItemAccordion;
            })
        };

        $("#accordion").prepend($.accordionItems);

        // add data to `#listbox-events`
        if ($.runItems.length==0){
            var newItem = "";
            var newIndicator ="";
            $.each( $.runnings, function(key) {
                var addClass="";
                if (key==0) addClass=" active";
                /*********** newItem - div in CAROUSEL (img+description+button) *************/
                newItem=
                    "<div data-currid='"+key+"' class='timeline-item item"+addClass+"'>"+
                        "<div class='timeline-visual col-12 col-sm-12 col-md-6' data-toggle='modal' data-target='#photo"+key+"'>"+
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
        
                /*********** newModalCollection - div in MODAL (big img) *************/
                var newModalCollection ='<div class="modal fade" id="photo'+key+'" tabindex="-1" role="dialog" aria-hidden="true">'+
                    '<div class="modal-dialog" role="document">'+
                        '<div class="modal-content description-member">'+
                            '<div class="modal-header">'+
                                '<button type="button" class="close" data-dismiss="modal" aria-label="Close">'+
                                    '<span aria-hidden="true">&times;</span>'+
                                '</button>'+
                            '</div>'+
                            '<div class="modal-body"><img src="'+$.storageImg+$.runnings[key]["runId"]+'.jpg" alt="" >'+
                            '</div>'+
                        '</div>'+
                    '</div>'+
                '</div>';
                $('#modalSegment').append(newModalCollection);
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
})


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
    $("#carouselEvents").on('slid.bs.carousel', function (){
        var flagCurrIndicator = $( ".item.active" ).data("currid");
        console.log("flagCurrIndicator",flagCurrIndicator);
        $( ".btn.ind" ).removeClass(function() {
            $( this ).data("slide-to") == flagCurrIndicator ? $( this ).addClass( "active" ) : $( this ).removeClass( "active" );

          });


        $.positionLeft = $.maxWidth/2 + 50 - ($( ".item.active" ).data("currid")+1)*106;   
        var newValue = $.positionLeft+"px";
        
        var left = $('#carousel-indicators').left;
        $("#carousel-indicators").css({left:left}).animate({"left":newValue}, "slow");
        $( "#carousel-indicators" ).css("left",$.positionLeft);
     });


});

