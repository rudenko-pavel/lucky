  $(document).ready(function () {
    $.getScript("./dist/includes/js/translate/converting_tr.js",function(){
      convertingText();  // translate
      initDatePicker();
    })
    .done(function(){ 
  /*-------------converter digit ------------*/
  $(function () {
    $("#first-digit").keyup(function () { 
      if (/[^a-fA-F0-9]/.test(this.value)) this.value = this.value.replace(/[^a-fA-F0-9]/,'');
      convertDigit(); 
    });
    $( ".converter-digit" ).on("change",function() { convertDigit(); });
    
    function convertDigit(){
      var firstSystem =   $( "#first-line"  ).val();
      var secondSystem =  $( "#second-line" ).val();
      var lineValue =     $( "#first-digit" ).val(); 
      
      var parsed = parseInt(lineValue, firstSystem).toString(secondSystem);
      lineValue == "" ?$( "#second-digit" ).val("") : $( "#second-digit" ).val(parsed);
    }
    
  });


/************** datepicker  ******************/
// Data Picker Initialization
 

  $("#timestamp2").keyup(function () { 
    if (/[^0-9]/.test(this.value)) this.value = this.value.replace(/[^0-9]/,'');
    convertDate();
  });


  function convertDate(){
    var humanDate="";
    var lineValue = document.getElementById("timestamp2").value;
    var milsec = parseInt(lineValue);
    humanDate = new Date(milsec).toLocaleDateString().slice(0,10);
    var arr = humanDate.split('/');
    var newArr=[];
    $.each( arr, function(key,value) {
      if (value.length<2) newArr[key]="0"+value; else newArr[key]=value;
    })

    humanDate = newArr[2]+"-"+newArr[0]+"-"+newArr[1]
    $( "#humanDate" ).val(humanDate);
    $( "#timestamp2" ).val() == "" ?$( "#humanDate" ).val("") : $( "#humanDate" ).val(humanDate);
  }

  $("#prefill").change(function() {
    var date = $( "#prefill" ).val();
    var newDate = parseInt((new Date(date).getTime()).toFixed(0));
    date == "" ?$( "#timestamp" ).val("") : $( "#timestamp" ).val(newDate);

    
  });

  $.getScript("./dist/includes/js/vendor/tooltipster.bundle.min.js",function(){
      console.log("`tooltipster.js` is loaded");
  })
  .done(function(){
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
  })
});