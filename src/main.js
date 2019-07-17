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

$(document).ready(function(){
    $("#logoImg").click(function(){
      $("#logoImgModal").modal();
    });
  });