
$.getScript("./dist/includes/js/jquery.textwave.js",function(){
    console.log("load head menu");
    });
  
    $.repeatCountHead = 0;
   function runEffectHead() {
        $.repeatCountHead<12 ? $( "#logoIMG" ).effect( "bounce", 1000 ): "";
        $.repeatCountHead++;
   };

   $(document).ready(function(){
       setInterval(runEffectHead,15000);
   });

/********top Menu ******/
$.topMenu="";
$.itemsTopMenu = "";

$.getJSON( "dist/includes/json/common.json", function( data ) {
    $.itemsTopMenu = data.topNavigation;

}).done(function(){
    if ($.topMenu.length==0){
        var newItem = "";
        $.each( $.itemsTopMenu, function(key) {
            var str = window.location.search.substring(0);
            if (str == $.itemsTopMenu[key]["href"]){
                newItem = "<li><span class='itemMenu butt current-b'>"+$.itemsTopMenu[key]["name"]+"</span></li>";
            }
            else newItem = "<li><a  class='itemMenu butt' href='/"+$.itemsTopMenu[key]["href"]+"'>"+$.itemsTopMenu[key]["name"]+"</a></li>";
            
            $.topMenu = $.topMenu +  newItem;
console.log(str, $.itemsTopMenu[key]["href"]);
        })

    
    }
    
    $("#itemsMenu").prepend($.topMenu);
});
