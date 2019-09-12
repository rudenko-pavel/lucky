$(document).ready(function(){
    $.getScript("dist/includes/js/common.js",function(){
        $.getScript("dist/includes/js/vendor/jquery.dataTables.min.js",function(){
            $.getScript("dist/includes/js/vendor/dataTables.bootstrap4.min.js",function(){
                // initialisation vars
                $.memberId = "";
                $.memberPhoto = "";
                $.memberInfo={};
                $.fullInfo={};
                $.pathToImg = "dist/img/members/";                      // path to avatar
                $.flagIsMember = false;
                $.elephantLanguage = localStorage.getItem('elLang');    // language (en/ua)

                // get all athletes data from *.JSON
                $.getJSON( "dist/includes/json/members.json", function( data ) {
                    $.fullInfo = data.data;

                    var str = window.location.search.substring(1).split(":"); // get number athlet's from url e.g. athlet:3
                    $.memberId = parseInt (str[1]);
                    $.each( $.fullInfo, function(key) {
                        if ($.fullInfo[key]["memberId"] == $.memberId){
                            $.memberInfo = Object.assign({}, $.fullInfo[key]); // clone object with current athlet info
                            $.flagIsMember = true;
                            return false; 
                        };
                    });
                    
                }).done(function(){
                    $.getJSON( "dist/includes/json/common.json", function( data ) { //get fields names for view on page
                        $.commonData = data.athletNamesOptions;

                    }).done(function(){
                        if ($.flagIsMember){    // id-athlet is in JSON
                            $.pathToGallery = $.pathToImg + $.memberInfo["memberId"]+"/";
                            $.galleryItems="";
                            $.galleryIndicators="";
                            var addClass="";
                            for (var i=1; i<=$.memberInfo["countImages"];i++){
                                i==1 ? addClass ="active": addClass="";
                                $.galleryItems = $.galleryItems + "<div class='item "+addClass+"'>"+
                                            "<img class='d-block w-100 card-img-top' src='"+$.pathToGallery+i+".jpg' data-toggle='modal' data-target='#photo"+i+"'></div>";
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
                                            '<div class="modal-body"><img src="'+$.pathToGallery+i+'.jpg" alt="" >'+
                                            '</div>'+
                                        '</div>'+
                                    '</div>'+
                                '</div>';

                                $('#modalSegment').append(newModalCollectionGallery);
                            }

                            $.memberPhoto = "<img class='card-img-top d3-effect' src='"+$.pathToGallery+"1.jpg' data-toggle='modal' data-target='#photo1' />";

                            $.galleryControls = '<a class="carousel-control-prev" href="#wrapperCarouselEvent" role="button" data-slide="prev">'+
                                                    '<span class="carousel-control-prev-icon" aria-hidden="true"></span>'+
                                                    '<span class="sr-only">Previous</span>'+
                                                '</a>'+
                                                '<a class="carousel-control-next" href="#wrapperCarouselEvent" role="button" data-slide="next">'+
                                                '<span class="carousel-control-next-icon" aria-hidden="true"></span>'+
                                                '<span class="sr-only">Next</span>'+
                                                '</a>';


                            $("#memberPhoto").prepend($.memberPhoto);
                            
                            $('#carouselEvent').append($.galleryItems);
                            $('#carouselEvent').append($.galleryControls);
                            $('#carouselIndicators').append($.galleryIndicators);

                            $.getScript("./dist/includes/js/carousel.swipe.js",function(){
                                initSwipe();        // init Swipe
                                addControlButtons();    // add Control Buttons
                            });

                            $.getScript("./dist/includes/js/translate/athlet_tr.js",function(){
                                infoAthlet();  // draw info about athlet
                            });
                           
                        }else{
                            $.newURL = "dist/includes/404.html";
                            $("#bodyContent").load($.newURL); 
                            $("#preloader").hide();
                            console.log("4. str `404` loaded");
                        }
                    })


                    /************** data table ************/
                    $.getJSON( "dist/includes/json/events.json", function( data ) {
                        $.itemsEvents = data.data;
                    }).done(function(){
                        $.getScript("./dist/includes/js/translate/athlet_tr.js",function(){
                            athletDataTable();  // draw info about athlet
                        });
                    })

                });
            })
            .done(function(){
                /************** necessary scripts **************/
                $.getScript("./dist/includes/js/redline.js",function(){
                    $( window ).scroll(function() {
                        getOffset();
                    });
                });
                $.getScript("dist/includes/js/mypreloader.js",function(){
                    console.log("`mypreloader.js` is DONE");
                });
            });
        });
    });    
})
        