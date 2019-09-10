$(document).ready(function(){
    
    $.getScript("dist/includes/js/common.js",function(){
        $.getScript("dist/includes/js/vendor/jquery.dataTables.min.js",function(){
            $.getScript("dist/includes/js/vendor/dataTables.bootstrap4.min.js",function(){
                wow = new WOW().init();
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
                initMagicScroll();
                $.getScript("./dist/includes/js/translate/events_tr.js",function(){
                    eventsDataTable();  // draw info about events
                })
            })
                /************** necessary scripts start**************/
            .done(function(){
                $.getScript("./dist/includes/js/redline.js",function(){
                    $( window ).scroll(function() {
                        getOffset();
                    });
                });
                $.getScript("./dist/includes/js/vendor/tooltipster.bundle.min.js",function(){
                    console.log("`tooltipster.js` is loaded");
                })
                .done(function(){
                    $.getScript("dist/includes/js/mytooltip.js",function(){
                        console.log("`mytooltip.js` is DONE");
                    });
                    $.getScript("dist/includes/js/mypreloader.js",function(){
                        console.log("`mypreloader.js` is DONE");
                    });
                }); 
            });
                /************** necessary scripts end**************/
        })
    })
});