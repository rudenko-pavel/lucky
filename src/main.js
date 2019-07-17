"use strict";
    
import $ from 'jquery';
import jQuery from 'jquery';
window.$ = jQuery;
import 'bootstrap';
import './styles/styles.less';

$(function(){ 
    $("#includedTopMenu").load("../includes/headermenu.html");   
});