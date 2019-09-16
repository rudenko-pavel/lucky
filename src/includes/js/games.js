$(document).ready(function () {
    $.getScript("./dist/includes/personal/personal.js",function(){
        $.getScript("./dist/includes/js/translate/games_tr.js",function(){
            $.getScript("https://maps.googleapis.com/maps/api/js?key="+window.myAuth+"&libraries=geometry&callback=initMap",function(){

            })
        })
    })
  /************** necessary scripts start**************/

    $.getScript("dist/includes/js/mypreloader.js",function(){
        console.log("`mypreloader.js` is DONE");
    });
    /************** necessary scripts end**************/
})