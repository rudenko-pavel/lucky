$(document).ready(function(){

    wow = new WOW().init();

                    /*doughnut
                    var ctxD = document.getElementById("doughnutChart").getContext('2d');
                    var myLineChart = new Chart(ctxD, {
                      type: 'doughnut',
                      data: {
                        labels: ["Red", "Green", "Yellow", "Grey", "Dark Grey"],
                        datasets: [{
                          data: [300, 50, 100, 40, 120],
                          backgroundColor: ["#F7464A", "#46BFBD", "#FDB45C", "#949FB1", "#4D5360"],
                          hoverBackgroundColor: ["#FF5A5E", "#5AD3D1", "#FFC870", "#A8B3C5", "#616774"]
                        }]
                      },
                      options: {
                        responsive: true
                      }
                    });*/

    $.getScript("./dist/includes/js/translate/home_tr.js",function(){
        translateHome();        // translate Home
        createMyCarousel();     // create Carousel
        createAccordion();      // create Accordion 
        textEffects();          // add Text Effects
        setInterval(runEffect,10000);
    })
    .done(function(){
        $.getScript("dist/includes/js/mypreloader.js",function(){
            console.log("`mypreloader.js` is DONE");
        }); 
    })

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