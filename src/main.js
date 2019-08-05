"use strict";
    
import $ from 'jquery';
import jQuery from 'jquery';
window.$ = jQuery;
import 'bootstrap';
import './styles/styles.less';




/*---- add body-Content to page -------*/
$(document).ready(function(){
  console.log("1. start");
  $.getScript("dist/includes/js/vendor/preloader.js",function(){
    console.log("`preloader.js` is loaded");
  });
  /*---- add top menu to page -------*/
  $(function(){ 
    $("#includedTopMenu").load("dist/includes/headermenu.html");  
    console.log("2. add top menu");
  });

  var str = window.location.search.substring(1);
  if (str =="") str="home";
  $.newURL = "dist/includes/"+ str + ".html";

  var jqxhr = $.get( $.newURL, function() {
    console.log("3. get str `"+str+"`");
  })
    .done(function() {


      $("#bodyContent").load($.newURL,function(){
        console.log("4. str `"+str+"` loaded");
        $.getScript("dist/includes/js/"+str+".js",function(){
          console.log("5. `"+str+".js` is loaded");
        });
      })

    })
    .fail(function() {
      $.newURL = "dist/includes/404.html";
      $("#bodyContent").load($.newURL); 
      console.log("4. str `", str, "` loaded");
    })

});