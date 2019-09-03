$(document).ready(function(){
    $.getScript("dist/includes/js/common.js",function(){
        $.getScript("dist/includes/js/vendor/jquery.dataTables.min.js",function(){
            $.getScript("dist/includes/js/vendor/dataTables.bootstrap4.min.js",function(){
                // initialisation vars
                $.eventId = "";
                $.eventPhoto = "";
                $.eventInfo={};
                $.fullInfo={};
                $.pathToImg = "dist/img/logoevents/";                      // path to avatar
                $.pathToGallery = "dist/img/events/";                       // path to gallery
                $.flagIsMember = false;
                $.elephantLanguage = localStorage.getItem('elLang');    // language (en/ua)

                // get all events data from *.JSON
                $.getJSON( "dist/includes/json/events.json", function( data ) {
                    $.fullInfo = data.data;

                    var str = window.location.search.substring(1).split(":"); // get number event's from url e.g. event:20190830
                    $.eventId = parseInt (str[1]);
                    $.each( $.fullInfo, function(key) {
                        if ($.fullInfo[key]["runId"] == $.eventId){
                            $.eventInfo = Object.assign({}, $.fullInfo[key]); // clone object with current event info
                            $.flagIsMember = true;
                            return false; 
                        };
                    });
                }).done(function(){
                    if ($.flagIsMember){    // id-event is in JSON
                        $.pathToGallery = $.pathToGallery + $.eventInfo["runId"];
                        $.galleryItems="";
                        $.galleryIndicators="";
                        var addClass="";
                        for (var i=1; i<=$.eventInfo["countImages"];i++){
                            i==1 ? addClass ="active": addClass="";
                            $.galleryItems = $.galleryItems + "<div class='item "+addClass+"'>"+
                                        "<img class='d-block w-100 card-img-top' src='"+$.pathToGallery+"/"+i+".jpg' data-toggle='modal' data-target='#photo"+i+"'></div>";
                            $.galleryIndicators = $.galleryIndicators + "<li data-target='#wrapperCarouselEvent' data-slide-to='"+(i-1)+"' class='"+addClass+"'></li>"

                            /*********** newModalCollection - div in MODAL (big img) *************/
                            var newModalCollectionGallery ='<div class="modal fade" id="photo'+i+'" tabindex="-1" role="dialog" aria-hidden="true">'+
                                '<div class="modal-dialog" role="document">'+
                                    '<div class="modal-content description-member">'+
                                        '<div class="modal-header">'+
                                            '<button type="button" class="close" data-dismiss="modal" aria-label="Close">'+
                                                '<span aria-hidden="true">&times;</span>'+
                                            '</button>'+
                                        '</div>'+
                                        '<div class="modal-body"><img src="'+$.pathToGallery+"/"+i+'.jpg" alt="" >'+
                                        '</div>'+
                                    '</div>'+
                                '</div>'+
                            '</div>';
                            $('#modalSegment').append(newModalCollectionGallery);
                        }
                        $.eventPhoto = "<img class='card-img-top' src='"+$.pathToImg+$.eventId+".png' data-toggle='modal' data-target='#photo"+$.eventId+"' />";
                        
                        var newModalCollection ='<div class="modal fade" id="photo'+$.eventId+'" tabindex="-1" role="dialog" aria-hidden="true">'+
                            '<div class="modal-dialog" role="document">'+
                                '<div class="modal-content description-member">'+
                                    '<div class="modal-header">'+
                                        '<button type="button" class="close" data-dismiss="modal" aria-label="Close">'+
                                            '<span aria-hidden="true">&times;</span>'+
                                        '</button>'+
                                    '</div>'+
                                    '<div class="modal-body"><img src="'+$.pathToImg+$.eventId+'.png" alt="" >'+
                                    '</div>'+
                                '</div>'+
                            '</div>'+
                        '</div>';

                        $.galleryControls = '<a class="carousel-control-prev" href="#wrapperCarouselEvent" role="button" data-slide="prev">'+
                                                '<span class="carousel-control-prev-icon" aria-hidden="true"></span>'+
                                                '<span class="sr-only">Previous</span>'+
                                            '</a>'+
                                            '<a class="carousel-control-next" href="#wrapperCarouselEvent" role="button" data-slide="next">'+
                                            '<span class="carousel-control-next-icon" aria-hidden="true"></span>'+
                                            '<span class="sr-only">Next</span>'+
                                            '</a>';
                        $('#modalSegment').append(newModalCollection);

                        $("#eventPhoto").prepend($.eventPhoto);

                        $('#carouselEvent').append($.galleryItems);
                        $('#carouselEvent').append($.galleryControls);
                        $('#carouselIndicators').append($.galleryIndicators);
                        $('#tooltipSegment').load('./dist/includes/tooltip.html')
                        
                        $.getScript("./dist/includes/js/translate/event_tr.js",function(){
                            infoEvent();  // draw info about event
                        });   
                    }else{
                        $.newURL = "dist/includes/404.html";
                        $("#bodyContent").load($.newURL); 
                        $("#preloader").hide();
                        console.log("4. str `404` loaded");
                    }
                });
            })
            /************** necessary scripts start**************/
            .done(function(){
                $.getScript("./dist/includes/js/vendor/tooltipster.bundle.min.js")
                .done(function(){
                    $('body').on('mouseenter', '.mytooltip:not(.tooltipstered)', function(){
                        $(this)
                            .tooltipster({                       
                                contentCloning: true,
                                animation: 'fade',
                                delay: 200,
                                theme: 'tooltipster-punk',
                                trigger: 'click',
                                functionPosition: function(instance, helper, position){
                                    position.coord.top += 10;
                                    position.coord.left += 10;
                                    return position;
                                },
                                interactive: true 
                            })
                            .tooltipster('show');
                    });
                    console.log("`tooltipster.js` is DONE");
                    $.getScript("dist/includes/js/mypreloader.js",function(){
                        console.log("`mypreloader.js` is DONE");
                    });

                })
            });
            /************** necessary scripts end**************/
        });
    });    
})
        