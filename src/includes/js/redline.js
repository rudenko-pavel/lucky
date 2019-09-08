var getOffset = function () {
    var collection = $('.bottom-line');
    collection.each(function() {
        //console.log("123 " + this.id  );
        var el =  "#"+this.id;
        var isView = $( window ).height()-$(el).offset().top + $(document).scrollTop();
        var upBorder = $( window ).height() - $( window ).height()/5;
        var _x = 0;
        var _y = 0;
        var _focus = 0;
        var flagView=false;

        var scrollTopVar = $(document).scrollTop();
        var winH = $( document ).height();
        while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
            _x += el.offsetLeft - el.scrollLeft;
            _y += el.offsetTop - el.scrollTop;
            el = el.offsetParent;
        }
    //console.log("$(el).offset().top", el[0]["id"],isView)
        if (isView>=50 && isView<upBorder) { flagView = true;}
        else{flagView = false;};
        if (flagView==true) $(el).addClass( "btb-active" )
        else $(el).removeClass( "btb-active" );
    });   
}