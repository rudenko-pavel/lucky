$.runItems="";
$.runnings="";
$.storageImg = "dist/img/timeline/";
$.modalImg = "";

$.getJSON( "dist/includes/json/runnings.json", function( data ) {
    $.runnings = data.actions;
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
                    autoplay: false,
                }
            );
        });
    }
})
.always(function(){
    console.log("always ;)");
});