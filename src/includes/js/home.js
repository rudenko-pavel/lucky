$(document).ready(function(){
    $.getScript("./dist/includes/js/carousel.swipe.js",function(){
        initSwipe();        // init Swipe
        addControlButtons();    // add Control Buttons
    });
    $.getScript("./dist/includes/js/translate/home_tr.js",function(){
        translateHome();        // translate Home
        createMyCarousel();     // create Carousel
        createAccordion();      // create Accordion 
    })
    .done(function(){
        $.getScript("dist/includes/js/mypreloader.js",function(){
            console.log("`mypreloader.js` is DONE");
        }); 
    })

    /************** necessary scripts start**************/
    $.getScript("./dist/includes/js/redline.js",function(){
        $( window ).scroll(function() {
            getOffset();
        });
    });
    /****************** TOOLTIP **************/
    $.getScript("./dist/includes/js/vendor/tooltipster.bundle.min.js",function(){
        $.getScript("dist/includes/js/mytooltip.js",function(){
            console.log("`mytooltip.js` is DONE");
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
    setInterval(runEffect,10000);
    /************** necessary scripts end**************/
});

