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
  $("#bodyContent").load("dist/includes/index.html");   
});





$(document).ready(function(){
  console.log("start");
  $(function () {
    $("a.itemMenu").click(function(){

      var newURL = "dist/includes/"+ this.dataset.item + ".html";
      $("#bodyContent").load(newURL);   
      
    });
  });
});