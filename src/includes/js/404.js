$(document).ready(function(){
    console.log("404");
  
  
    var str = window.location.href;
    var wrongURL = "Страницы `<span style='color:red'>"+ str + "</span>` не существует.";


    $("#generalText404").prepend(wrongURL);
});