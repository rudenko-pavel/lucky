/************** HOME - start  *************/
    $.homeDictionary = {
        "en": {
            "_content2"     : "sometimes we are athletes ;)",
            "_moreInfo"     : "more info",
            "_youBornTo"    : "you born to",
            "_effect1Text"  : ["win", "rejoice", "love", "success", "life","progress"],
            "_athletes"     : "athletes",
            "_races"        : "events"
        },
        "ua": {
            "_content2"     : "Іноді ми атлети ;)",
            "_moreInfo"     : "ще цікавіше",
            "_youBornTo"    : "ти народився для",
            "_effect1Text"  : ["перемог", "радості", "любові", "успіху", "життя","досягнень"],
            "_athletes"     : "спортсмени",
            "_races"        : "події"
        }
    };
    /************** translate info start  *************/
    var translateHome = function(){
        $.elephantLanguage = localStorage.getItem('elLang');
        var content2 = $.homeDictionary[$.elephantLanguage]["_content2"];
        $("#content2").html(content2);
        $.moreInfo = $.homeDictionary[$.elephantLanguage]["_moreInfo"];
 
    }
    /************** translate info end    *************/    
    /************** reveal start ****************/
    var initMagicScroll = function(){
        // init controller
        var controller = new ScrollMagic.Controller({globalSceneOptions: {triggerHook: "onEnter", duration: "150%"}});
        
        // build scenes - advanced/parallax_sections
        new ScrollMagic.Scene({triggerElement: ".parallaxParent"})
			.setTween(".parallaxParent > div", {y: "80%", ease: Linear.easeNone})
            .addTo(controller);

        // build scenes - basic/reveal_on_scroll
		new ScrollMagic.Scene({
            triggerElement: "#trigger1",
            triggerHook: 0.9, // show, when scrolled 10% into view
            duration: "80%", // hide 10% before exiting view (80% + 10% from bottom)
            offset: 50 // move trigger to center of element
        })
        .setClassToggle("#reveal1", "visible") // add class to reveal
        .addTo(controller);
		new ScrollMagic.Scene({
            triggerElement: "#trigger2",
            triggerHook: 0.9, // show, when scrolled 10% into view
            duration: "80%", // hide 10% before exiting view (80% + 10% from bottom)
            offset: 50 // move trigger to center of element
        })
        .setClassToggle("#reveal2", "visible") // add class to reveal  
        .addTo(controller);
    }

    var cardView = function(){
        $.getJSON( "dist/includes/json/events.json", function( data ) {
            $.eventsData = data.data;
            $.races = $.eventsData.length;
        })
        $.getJSON( "dist/includes/json/members.json", function( data ) {
            $.athletesData = data.data;
            $.athletes = $.athletesData.length;
            $.each( $(".reveal.carousel"), function(key, value) {
                var header= $("#"+value.id).find(".card-header");
                $("#"+ header[0]["id"]).html("<span>"+$.homeDictionary[$.elephantLanguage][$("#"+ header[0]["id"]).data("txt")]+"</span>");

                var title= $("#"+value.id).find(".title");
                var ff = $("#"+ title[0]["id"]).data("item");
                var gg = eval("$."+ff);
                $("#"+ title[0]["id"]).html(gg);
            })            
        })
    }
    /************** reveal end ****************/

    /************** text effects start    *************/    
    $.timerId  = null;
    var textEffects = function(){
        $.elephantLanguage = localStorage.getItem('elLang');
        var youBornTo = $.homeDictionary[$.elephantLanguage]["_youBornTo"];
        $("#effect1--intro").html(youBornTo);
        if($.timerId){
            clearInterval($.timerId);
            $.timerId = null
         }
            var t = $.homeDictionary[$.elephantLanguage]["_effect1Text"],
                $h2 = $(".effect"),
                $sp = $h2.find(".effect--highlight"),
                i = 0,
                widths = [];
    
            $.each(t, function (i, v) {
                var el = $('<span />', {
                    text: v
                }).appendTo($h2);
                widths.push(el.width());
                el.remove();
            });
    
           $sp.css({
                opacity: 0
            });
 
            $.timerId = setInterval(function () {
                i = ++i % t.length;
                $sp.text(t[i]).animate({width: widths[i]}, 500, function () {
                    TweenLite.to($sp.text(t[i]), 0.5, {width:widths[i], onComplete:function () {
                        TweenLite.to($sp.text(t[i]), 0.5, {autoAlpha:1});
                        TweenLite.to($sp.text(t[i]), 0.5, {autoAlpha:0, delay:2});
                    }});
                });
            }, 5000);
            
 
    }
    /************** text effects end    *************/

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
    /************** create carousel start  *************/
    var createMyCarousel = function(){
        var locationPort;
        window.location.port=="" ? locationPort = "/": locationPort= ":"+window.location.port+"/";
        $.locationPage = window.location.protocol + "//" +window.location.hostname + locationPort;
        $.runItems="";  // list all events  (from CAROUSEL)
        $.runnings="";  // data  events from JSON
        $.storageImg = "dist/img/events/";
        $.modalImg = "";
        $.newIndicator = "";
        $.getJSON( "dist/includes/json/events.json", function( data ) {
            $.runnings = data.data;
        })
        .done(function(){
            $.getScript("./dist/includes/js/carousel.swipe.js",function(){
                initSwipe();        // init Swipe
                addControlButtons();    // add Control Buttons
            });

            $.elephantLanguage = localStorage.getItem('elLang');
            var nameEvent = "name-"+$.elephantLanguage;
            var descriptionsEvent = "descriptions-"+$.elephantLanguage;

            // add data to `#listbox-events`
            if ($.runItems.length==0){
                var newItem = "";
                var newIndicator ="";

                $.each( $.runnings, function(key) {
                    var addClass="";
                    if (key==0) {
                        addClass=" active";
                        $("#chosen-value").val($.runnings[key]["runDate"]+": "+ $.runnings[key][nameEvent]);
                    };

                    /*********** newItem - div in CAROUSEL (img+description+button) *************/
                    newItem=
                        "<div data-currid='"+key+"' class='timeline-item item"+addClass+"'>"+
                            "<div class='timeline-visual col-12 col-sm-12 col-md-6' data-toggle='modal' data-target='#photo"+key+"'>"+
                                "<img class='card-img-top' src='"+$.storageImg+$.runnings[key]["runId"]+".jpg' alt='"+$.runnings[key]["name"]+"'>"+
                            "</div>"+
                            "<div class='card-body timeline-detail col-12 col-sm-12 col-md-6'>"+
                                "<h5>"+$.runnings[key][nameEvent]+"</h5>"+
                                "<div class='niceDate'>"+$.runnings[key]["runDate"]+"</div>"+
                                "<div>"+$.runnings[key][descriptionsEvent]+"</div>"+
                                "<a href='"+$.locationPage+"?event:"+$.runnings[key]["runId"]+"' class='btn btn-info btn-block my-4'>"+$.moreInfo+"</a>"+
                            "</div>"+
                        "</div>";
                    newIndicator ="<li data-target='#carouselEvents' data-slide-to='"+key+"' class='btn ind"+addClass+"'><div class='inTimeline'>"+$.runnings[key]["runDate"]+"</div></li>";
                    $.runItems = $.runItems + newItem;

                    $.newIndicator = $.newIndicator + newIndicator;
                    /*********** newModalCollection - div in MODAL (big img) *************/
                    var newModalCollection =
                        '<div class="modal fade" id="photo'+key+'" tabindex="-1" role="dialog" aria-hidden="true">'+
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
    
                    $.galleryControls = 
                        '<a class="carousel-control-prev" href="#carouselEvents" role="button" data-slide="prev">'+
                            '<span class="carousel-control-prev-icon" aria-hidden="true"></span>'+
                            '<span class="sr-only">Previous</span>'+
                        '</a>'+
                        '<a class="carousel-control-next" href="#carouselEvents" role="button" data-slide="next">'+
                            '<span class="carousel-control-next-icon" aria-hidden="true"></span>'+
                            '<span class="sr-only">Next</span>'+
                        '</a>';
    
                    $('#modalSegment').append(newModalCollection);
                });
                $("#listbox-events").html($.runItems);
                $('#listbox-events').prepend($.galleryControls);
               //$("#carousel-indicators").html($.newIndicator);
                $('#tooltipSegment').load('./dist/includes/tooltip.html')
            }

            
                /*************** select Fill start ***************/
                var selectFill = function(){

                    var nameEvent = "name-"+$.elephantLanguage;

                    const inputField = document.querySelector('.chosen-value');
                    const dropdown = document.querySelector('.value-list');
                    var tt ="";
                    var addClass="";
                    $.each( $.runnings, function(key, value) {
                        if (tt.length==0) addClass=" active";
                        else addClass="";
                        tt = tt +"<li class='select-item"+addClass+"' data-target='#carouselEvents' data-slide-to='"+key+"'>"+$.runnings[key]["runDate"]+": "+ $.runnings[key][nameEvent]+"</li>";
                    })
                    $("#value-list-1").html(tt);
                    const dropdownArray = [... document.querySelectorAll('li.select-item')];
                    console.log(typeof dropdownArray)
                    //dropdown.classList.add('open');
                    //inputField.focus(); // Demo purposes only
                    let valueArray = [];
                    dropdownArray.forEach(item => {
                      valueArray.push(item.textContent);
                    });
                    
                    const closeDropdown = () => {
                      dropdown.classList.remove('open');
                    }
                      
                    dropdownArray.forEach(item => {
                      item.addEventListener('click', (evt) => {
                        inputField.value = item.textContent;
                        dropdownArray.forEach(dropdown => {
                          dropdown.classList.add('closed');
                        });
                      });
                    })
                    
                    inputField.addEventListener('focus', () => {
                       inputField.placeholder = 'Type to filter';
                       dropdown.classList.add('open');
                       dropdownArray.forEach(dropdown => {
                         dropdown.classList.remove('closed');
                       });
                    });
                    
                    inputField.addEventListener('blur', () => {
                       inputField.placeholder = 'Select state';
                      dropdown.classList.remove('open');
                    });
                    
                    document.addEventListener('click', (evt) => {
                      const isDropdown = dropdown.contains(evt.target);
                      const isInput = inputField.contains(evt.target);
                      if (!isDropdown && !isInput) {
                        dropdown.classList.remove('open');
                      }
                    });
                }
                selectFill();
                /*************** select Fill end ***************/
        })

        $.maxWidth = $( "#carouselEvents" ).width();
        $.positionLeft = $.maxWidth/2;   
        //$( "#carousel-indicators" ).css("left",$.positionLeft+"px");
    
        /***** action after change current slide *****/

        $("#carouselEvents").on('slid.bs.carousel', function (){
            var flagCurrIndicator = $( ".item.active" ).data("currid");
            var nameEvent = "name-"+$.elephantLanguage;
            $("#chosen-value").val($.runnings[flagCurrIndicator]["runDate"]+": "+ $.runnings[flagCurrIndicator][nameEvent]);

            $( ".select-item" ).removeClass(function() {
                $( this ).data("slide-to") == flagCurrIndicator ? $( this ).addClass( "active" ) : $( this ).removeClass( "active" );
            });    
 
            $( ".btn.ind" ).removeClass(function() {
                $( this ).data("slide-to") == flagCurrIndicator ? $( this ).addClass( "active" ) : $( this ).removeClass( "active" );
            });

        });
    }
    /************** create carousel end  *************/
    /************** create accordion start  *************/
    var createAccordion = function(){
        $.elephantLanguage = localStorage.getItem('elLang');
        $.accordionItems="";    // list tabs from accordion 
        $.getJSON( "dist/includes/json/accordion.json", function( data ) {
            $.home01 = data.home01;
        })
        .done(function(){
            // add data to `#accordion`
            if ($.accordionItems.length==0){
                var newItemAccordion = "";
                var nameEvent = "name-"+$.elephantLanguage;
                var descriptionEvent = "description-"+$.elephantLanguage;
                $.each( $.home01, function(key) {
                    newItemAccordion=
                    '<div class="card">'+
                        '<div class="card-header eventtype alert alert-info" style="background-image:url(/dist/img/logo/'+$.home01[key]["bgImg"]+'.png)" role="tab"  id="heading'+$.home01[key]["id"]+'">'+
                            '<h5 class="mb-0">'+
                                '<a class="btn btn-info d3-effect" data-toggle="collapse" href="#'+$.home01[key]["id"]+'" aria-expanded="true" aria-controls="collapseOne">'+$.home01[key][nameEvent]+'</a>'+
                            '</h5>'+
                        '</div>'+
                        '<div id="'+$.home01[key]["id"]+'" class="collapse"  role="tabpanel" aria-labelledby="heading'+$.home01[key]["id"]+'" data-parent="#accordion">'+
                            '<div class="card-body">'+$.home01[key][descriptionEvent]+'</div>'+
                        '</div>'+
                    '</div>'
                    $.accordionItems = $.accordionItems + newItemAccordion;
                })
            };
            $("#accordion").html($.accordionItems);
        })

    }
    /************** create accordion end  *************/
/************** HOME -  end    *************/