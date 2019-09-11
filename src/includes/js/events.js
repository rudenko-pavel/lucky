$(document).ready(function(){

    wow = new WOW().init();

    $.getScript("dist/includes/js/common.js",function(){
        $.getScript("dist/includes/js/vendor/jquery.dataTables.min.js",function(){
            $.getScript("dist/includes/js/vendor/dataTables.bootstrap4.min.js",function(){
                $.getScript("./dist/includes/js/translate/events_tr.js",function(){
                    initMagicScroll();
                    cardView();             // change info in cards
                    eventsDataTable();      // draw info about events
                })

                /************** necessary scripts start**************/
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
                /************** necessary scripts end**************/
            })

        })
    })
});