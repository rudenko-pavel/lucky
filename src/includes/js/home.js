$.runItems="";
$.runnings="";
$.storageImg = "dist/img/timeline/";
$.modalImg = "";

$.getJSON( "dist/includes/json/events.json", function( data ) {
    $.runnings = data.data;
})
.done(function(){
    if ($.runItems.length==0){
        $.each( $.runnings, function(key) {

        var newItem ='<div data-time="'+$.runnings[key]["runDate"]+'" class="timeline-item">'+
            '<div class="timeline-visual" data-toggle="modal" data-target="#carousel'+$.runnings[key]["runId"]+'">'+
                '<img src="'+$.storageImg+$.runnings[key]["runId"]+'.jpg" alt="" data-target="#carousel'+$.runnings[key]["runId"]+'" data-slide-to="0">'+
            '</div>'+
            '<div class="timeline-detail">'+
                '<h6>'+$.runnings[key]["name"]+'</h6>'+
                '<div class="niceDate">'+$.runnings[key]["runDate"]+'</div>'+
                '<div>'+$.runnings[key]["descriptions"]+'</div>'+
            '</div>'+
            '</div>';
            $.runItems = $.runItems + newItem;

        var newModalCollection = "";
        var newModalCollectionStart ='<div class="modal fade" id="carousel'+$.runnings[key]["runId"]+'" tabindex="-1" role="dialog" aria-hidden="true">'+
            '<div class="modal-dialog" role="document">'+
                '<div class="modal-content">'+
                    '<div class="modal-body">'+        
                        '<div id="images_'+$.runnings[key]["runId"]+'" class="carousel slide" data-ride="carousel">'+
                            '<div class="carousel-inner">';

        var newModalCollectionMiddle = "";
        for (i=1;i<=$.runnings[key]["countImages"]; i++){
            var addClass = "";
            if (i==1) addClass=" active"; else addClass = ""
            newModalCollectionMiddle += '<div class="carousel-item'+addClass+'">'+
                                    '<img class="d-block w-100" src="'+$.storageImg+$.runnings[key]["runId"]+'/'+i+'.jpg">'+
                                '</div>';
        }
                                
        
        var newModalCollectionEnd ='</div>'+ 
                            '<a class="carousel-control-prev" href="#images_'+$.runnings[key]["runId"]+'" role="button" data-slide="prev">'+
                                '<span class="carousel-control-prev-icon" aria-hidden="true"></span>'+
                                '<span class="sr-only">Previous</span>'+
                            '</a>'+
                            '<a class="carousel-control-next" href="#images_'+$.runnings[key]["runId"]+'" role="button" data-slide="next">'+
                                '<span class="carousel-control-next-icon" aria-hidden="true"></span>'+
                                '<span class="sr-only">Next</span>'+
                            '</a>'+       
                        '</div>'+
                    '</div>'+
                '</div>'+
            '</div>'+
            '</div>';
            
        newModalCollection = newModalCollectionStart + newModalCollectionMiddle + newModalCollectionEnd;
            
        $.modalImg = $.modalImg +newModalCollection;


        });
        $("#actionsContent").prepend($.runItems);
        $('#modalSegment').append($.modalImg);

        $.getScript("./dist/includes/js/timeline.min.js",function(){
            
            $('.js-timeline').Timeline(
                {
                    itemClass: 'box-item',
                    dotsPosition: 'bottom',
                    startItem: 'first',
                    autoplay: true,
                    autoplaySpeed: 10000,
                }
            );
        });
    }
})
.always(function(){

});

/****************** TOOLTIP **************/
$.getScript("./dist/includes/js/tooltipster.bundle.min.js",function(){
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
$.getScript("./dist/includes/js/jquery.textwave.js",function(){
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
 });

