
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