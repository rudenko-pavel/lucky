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
                $.coords=[];

                // get all events data from *.JSON
                $.getJSON( "dist/includes/json/events.json", function( data ) {
                    $.fullInfo = data.data;
                    $.googleData = data.googlePlases;
                    $.googlePlace="";

                    var str = window.location.search.substring(1).split(":"); // get number event's from url e.g. event:20190830
                    $.eventId = parseInt (str[1]);
                    $.each( $.fullInfo, function(key) {
                        if ($.fullInfo[key]["runId"] == $.eventId){
                            $.eventInfo = Object.assign({}, $.fullInfo[key]); // clone object with current event info
                            $.flagIsMember = true;
                            $.coords = $.fullInfo[key]["coords"][0];

                            $.each( $.googleData, function(key2) {
                                if ($.googleData[key2]["number"] == $.coords){
                                    $.googlePlace = $.googleData[key2]["name"];
                                    return false; 
                                };
                            });

                            $.coords = $.fullInfo[key]["coords"][0];
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
                        $.eventPhoto = "<img class='card-img-top d3-effect' src='"+$.pathToImg+$.eventId+".png' data-toggle='modal' data-target='#photo"+$.eventId+"' />";
                        
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

                        $.getScript("./dist/includes/js/carousel.swipe.js",function(){
                            initSwipe();        // init Swipe
                            addControlButtons();    // add Control Buttons
                        });

                        $.getScript("./dist/includes/js/translate/event_tr.js",function(){
                            infoEvent();            // draw info about event
                        });   
                    }else{
                        $.newURL = "dist/includes/404.html";
                        $("#bodyContent").load($.newURL); 
                        $("#preloader").hide();
                        console.log("4. str `404` loaded");
                    }

                    var googleMap = function(){
                        $(".googleMap").html('<iframe src="https://maps.google.com/maps?q='+$.googlePlace+'&t=&z=5&ie=UTF8&iwloc=&output=embed" frameborder="0" style="border:0" allowfullscreen></iframe>');
                        
                    }
                    googleMap();
                });
            })
            /************** necessary scripts start**************/
            .done(function(){
                var initMagicScroll = function(){
                    // init controller
                    var controller = new ScrollMagic.Controller({globalSceneOptions: {triggerHook: "onEnter", duration: "150%"}});

                    // build scenes - advanced/parallax_sections
                    new ScrollMagic.Scene({triggerElement: ".parallaxParent"})
                        .setTween(".parallaxParent > div", {y: "80%", ease: Linear.easeNone})
                        .addTo(controller);

                        var str = window.location.search.substring(1).split(":"); // get number event's from url e.g. event:20190830
                        $.eventId = parseInt (str[1]);
                        $(".magicBg").css("background-image","url("+$.pathToGallery+$.eventId+"/parallax.jpg)");
                }
                initMagicScroll();

                $.getScript("./dist/includes/js/redline.js",function(){
                    $( window ).scroll(function() {
                        getOffset();
                    });
                });
                $.getScript("./dist/includes/js/vendor/tooltipster.bundle.min.js")
                .done(function(){
                    $.getScript("dist/includes/js/mytooltip.js",function(){
                        console.log("`mytooltip.js` is DONE");
                    });
                    $.getScript("dist/includes/js/mypreloader.js",function(){
                        console.log("`mypreloader.js` is DONE");
                    });

                })
            });
            /************** necessary scripts end**************/
        });
    });    
})
        