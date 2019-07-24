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

  var str = window.location.search.substring(1)
  if (str =="") str="home";
  var newURL = "dist/includes/"+ str + ".html";
  $("#bodyContent").load(newURL); 


  /*$.getJSON( "dist/includes/json/runnings.json", function( data ) {
    var storageImg = "dist/img/timeline/";
    var runnings = data.actions;
    var runItems =[];
    $.each( runnings, function(key) {

      runItems.push(
        '<div data-time="2018-10-02" class="timeline-item">'+
          '<div class="timeline-visual" data-toggle="modal" data-target="#carousel20180930">'+
            '<img src="dist/img/timeline/20180930.jpg" alt="" data-target="#carousel20180930" data-slide-to="0">'+
          '</div>'+
          '<div class="timeline-detail">'+
            '<h6>CHISINAU INTERNATIONAL MARATHON</h6>'+
            '<p>Создание закрытого клуба людей с одинаковой целью - БЕЖАТЬ ))</p>'+
            '<p>Идея озвучена во время поездки из Киева в Кишинев. Реализована во время забега CHISINAU INTERNATIONAL MARATHON</p>'+
          '</div>'+
        '</div>');
    });
    
    //runItems.push( "<li>"+runnings[key]["name"] + "</li>" );
//console.log(runItems);
    //$( "asd").prepend( "#actionsContent");
    //$("#actionsContent").prepend(runItems);
  });*/

  
});