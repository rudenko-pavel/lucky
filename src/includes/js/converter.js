  /*-------------converter digit ------------*/
  
$( ".converter-digit" ).on('change', function() {
  var firstSystem = document.getElementById("first-line").value;
  var secondSystem = document.getElementById("second-line").value;
  var lineValue = document.getElementById("first-digit").value;
  
  var parsed = parseInt(lineValue, firstSystem).toString(secondSystem);
  $( "#second-digit" ).val(parsed);

});

/************** datepicker  ******************/
$( function() {
  $.selectDate = "";
  $( "#datepicker" ).datepicker({
    dateFormat: "yy-mm-dd"
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