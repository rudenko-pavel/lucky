$.getScript("./dist/includes/js/vendor/jquery.textwave.js",function(){
    console.log("load textwave.js");
});
  
$.repeatCountHead = 0;
function runEffectHead() {
    $.repeatCountHead<12 ? $( "#logoIMG" ).effect( "bounce", 1000 ): "";
    $.repeatCountHead++;
};

$(document).ready(function(){
    setInterval(runEffectHead,15000);
    $.getScript("./dist/includes/js/translate/headermenu_tr.js",function(){
        reloadItemsMenu();  // draw a menu
    });
    $.elephantLanguage = localStorage.getItem('elLang');
    $.getScript("dist/includes/js/common.js",function(){
        /******* change language *********/
        $("#current-lang").on("click", function(){
            localStorage.getItem('elLang') =="en" ? ( $(this).toggleClass('en'), localStorage.setItem('elLang','ua') ) : 
                                                     ( $(this).toggleClass('en'), localStorage.setItem('elLang','en') );
            reloadItemsMenu();  // draw a menu
            var str = window.location.search.substring(1).split(":");
            if ( str[0]=="events" )     {eventsDataTable();}
            if ( str[0]=="event" )     {infoEvent();}
            if ( str[0]=="athletes" )   {athletesDataTable();}
            if ( str[0]=="athlet" )     {infoAthlet();athletDataTable();}
        });
    });
});

