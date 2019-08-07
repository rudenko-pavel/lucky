  /*-------------converter digit ------------*/
  
$( ".converter-digit" ).on('change', function() {
  var firstSystem = document.getElementById("first-line").value;
  var secondSystem = document.getElementById("second-line").value;
  var lineValue = document.getElementById("first-digit").value;
  
  var parsed = parseInt(lineValue, firstSystem).toString(secondSystem);
  $( "#second-digit" ).val(parsed);

});

/************** datepicker  ******************/
$.getScript("./dist/includes/js/vendor/datepicker-ru.js",function(){
  $( function() {
    $.selectDate = "";
    $( "#datepicker" ).datepicker({
      dateFormat: "yy-mm-dd",
      changeMonth: true,
      changeYear: true,
      showAnim: "clip",
      showButtonPanel: true,
      showOtherMonths: true,
      selectOtherMonths: true
    });

    $("#datepicker").change(function() {
      var date = $(this).datepicker("getDate");
      $.selectDate = date.getTime();
      $( "#timestamp" ).val($.selectDate);
    });

    $("#timestamp2").change(function() {
      var humanDate="";
      var milsec = parseInt(this.value);
      humanDate = new Date(milsec).toLocaleDateString().slice(0,10);
      var arr = humanDate.split('/');
      var newArr=[];
      $.each( arr, function(key,value) {
        if (value.length<2) newArr[key]="0"+value; else newArr[key]=value;
      })

      humanDate = newArr[2]+"-"+newArr[0]+"-"+newArr[1]
      $( "#humanDate" ).val(humanDate);
    });
  });
})
.done(function(){
        

  $.getScript("./dist/includes/js/vendor/tooltipster.bundle.min.js",function(){
      console.log("`tooltipster.js` is loaded");
  }).done(function(){
          $('.mytooltip').tooltipster({
              contentCloning: true,
              functionPosition: function(instance, helper, position){
                  position.coord.top += 10;
                  position.coord.left += 10;
                  return position;
              },
              interactive: true
          });
          console.log("`tooltipster.js` is DONE");
          $.getScript("dist/includes/js/mypreloader.js",function(){
              console.log("`mypreloader.js` is DONE");
  });

      
    }); 
});