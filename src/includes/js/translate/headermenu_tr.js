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
            $.parentId = ""
            $.each( $.itemsTopMenu, function(key) {
                var str = window.location.search.substring(0);
                if ($.itemsTopMenu[key]["isDropdown"]==1){
                    newItem = "<li class='dropdown'>"+
                                "<a class='btn btn-outline-success' id='parent_"+$.itemsTopMenu[key]["idButton"]+"'  href='#' data-toggle='dropdown'>"+ $.itemsTopMenu[key][$.elephantLanguage] +"&nbsp;&nbsp;<i class='fas fa-angle-down'></i></a>"+
                                "<div class='dropdown-menu'>";
                } else {
                    if($.itemsTopMenu[key]["subMenu"]!=0){
                        if ( $.itemsTopMenu[key]["isLast"]==true) endSubmenu = "</div></li>";
                        if (str == $.itemsTopMenu[key]["href"]){
                            newItem = "<a class='btn btn-success' href='"+$.locationPage+ $.itemsTopMenu[key]["href"]+"'>"+ $.itemsTopMenu[key][$.elephantLanguage]+"</a>" + endSubmenu;
                            $.parentId = "#parent_"+$.itemsTopMenu[key]["subMenu"];
                        }else {
                            newItem = "<a class='btn btn-outline-success' href='"+$.locationPage+ $.itemsTopMenu[key]["href"]+"'>"+ $.itemsTopMenu[key][$.elephantLanguage]+"</a>" + endSubmenu;
                        }
                    }else{
                        if (str == $.itemsTopMenu[key]["href"] || (str=="" && $.itemsTopMenu[key]["href"]=="?home")){
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