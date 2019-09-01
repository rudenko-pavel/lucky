/******** top Menu start ******/
var reloadItemsMenu = function(){
    $.topMenu="";
    $.itemsTopMenu = "";
    $.getJSON( "dist/includes/json/common.json", function( data ) {
        $.itemsTopMenu = data.topNavigation;
        var locationPort;
        window.location.port=="" ? locationPort = "/": locationPort= ":"+window.location.port+"/";
        $.locationPage = window.location.protocol + "//" +window.location.hostname + locationPort;
    })
    .done(function(){
        $.elephantLanguage = localStorage.getItem('elLang');
        if ($.topMenu.length==0){
            var newItem = "";
            var endSubmenu = "";
            $.parentId = "";
            var str = window.location.search.substring(0);
            console.log("str: "+ str);

            $.each( $.itemsTopMenu, function(key) {
                if ($.itemsTopMenu[key]["isDropdown"]==1){
                    newItem = "<li class='dropdown'>"+
                                "<a class='btn btn-outline-success' id='parent_"+$.itemsTopMenu[key]["idButton"]+"'  href='#' data-toggle='dropdown'>"+ $.itemsTopMenu[key][$.elephantLanguage] +"&nbsp;&nbsp;<i class='fas fa-angle-down'></i></a>"+
                                "<div class='dropdown-menu'>";
                } else {
                    if($.itemsTopMenu[key]["subMenu"]!=0){ // submenu
                        if ( $.itemsTopMenu[key]["isLast"]==true) endSubmenu = "</div></li>";
                        if (str == $.itemsTopMenu[key]["href"]){
                            newItem = "<a class='btn btn-success' href='"+$.locationPage+ $.itemsTopMenu[key]["href"]+"'>"+ $.itemsTopMenu[key][$.elephantLanguage]+"</a>" + endSubmenu;
                            $.parentId = "#parent_"+$.itemsTopMenu[key]["subMenu"];
                        }else {
                            newItem = "<a class='btn btn-outline-success' href='"+$.locationPage+ $.itemsTopMenu[key]["href"]+"'>"+ $.itemsTopMenu[key][$.elephantLanguage]+"</a>" + endSubmenu;
                        }
                    }else{
                        var flagDependent = false;     // check page without item in topMenu. If true - make green button for parent page (e.g. athlet for athlets)
                        //get status current page: dependent or no
                        var depends = $.itemsTopMenu[key]["dependents"].length;
                        if (depends>0){
                            for (var i=0; i<depends; i++){
                                if ($.itemsTopMenu[key]["dependents"][i] ==str.slice(0,str.indexOf(":"))) {
                                    flagDependent = true;
                                    break;
                                }
                            }
                        }
                        if (str == $.itemsTopMenu[key]["href"] || (str=="" && $.itemsTopMenu[key]["href"]=="?home" || flagDependent==true)){ // current page
                            newItem = "<li><a class='btn btn-success' href='"+$.locationPage+$.itemsTopMenu[key]["href"]+"'>"+$.itemsTopMenu[key][$.elephantLanguage]+"</a></li>";
                        }
                        else newItem = "<li><a  class='btn btn-outline-success' href='"+$.locationPage+$.itemsTopMenu[key]["href"]+"'>"+$.itemsTopMenu[key][$.elephantLanguage]+"</a></li>";
                    }
                }
                $.topMenu = $.topMenu +  newItem;
            })
        }
        $("#itemsMenu").html($.topMenu);
        $($.parentId).addClass("btn btn-success"); 
    }); //end done()
}
/******** top Menu end ******/