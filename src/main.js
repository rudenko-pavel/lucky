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
$(function(){ 
  $("#bodyContent").load("dist/includes/home.html");   
});


$(document).ready(function(){
  console.log("start");

  var str = window.location.search.substring(1);
  if (str =="") str="home";
  var newURL = "dist/includes/"+ str + ".html";
  $("#bodyContent").load(newURL); 

});