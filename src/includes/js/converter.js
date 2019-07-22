  /*-------------converter digit ------------*/
  
  $( ".converter-digit" ).on('change', function() {
      var firstSystem = document.getElementById("first-line").value;
      var secondSystem = document.getElementById("second-line").value;
      var lineValue = document.getElementById("first-digit").value;
    
      var parsed = parseInt(lineValue, firstSystem).toString(secondSystem);
      $( "#second-digit" ).val(parsed);

  });