"use strict";
    
import $ from 'jquery';
import jQuery from 'jquery';
window.$ = jQuery;
import 'bootstrap';
import './styles/styles.less';


/*---- add top menu to page -------*/
$(function(){ 
    $("#includedTopMenu").load("dist/includes/headermenu.html");   
});

/*---- add body-Content to page -------*/


$(document).ready(function(){
  console.log("start");

  var str = window.location.search.substring(1);
  if (str =="") str="home";
  $.newURL = "dist/includes/"+ str + ".html";

  var jqxhr = $.get( $.newURL, function() {
  })
    .done(function() {
      $("#bodyContent").load($.newURL); 
    })
    .fail(function() {
      $.newURL = "dist/includes/404.html";
      $("#bodyContent").load($.newURL); 
    })
  
});