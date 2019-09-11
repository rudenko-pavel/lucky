$(document).ready(function(){

    wow = new WOW().init();

    $.getScript("./dist/includes/js/translate/home_tr.js",function(){
        translateHome();        // translate Home
        initMagicScroll();
        cardView();             // change info in cards
        createMyCarousel();     // create Carousel
        createAccordion();      // create Accordion 
        textEffects();          // add Text Effects
        setInterval(runEffect,10000);

        $.getScript("dist/includes/js/mypreloader.js",function(){
            console.log("`mypreloader.js` is DONE");
        });
    });

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
    /************** necessary scripts end**************/
});