$(document).ready(function(){
    $.getScript("dist/includes/js/common.js",function(){
        $.getScript("dist/includes/js/vendor/jquery.dataTables.min.js",function(){
            $.getScript("dist/includes/js/vendor/dataTables.bootstrap4.min.js",function(){
                $.getScript("./dist/includes/js/translate/athletes_tr.js",function(){
                    athletesDataTable();  // draw info about athlet
                })
                /************** necessary scripts start**************/
                .done(function(){ 
                    $.getScript("./dist/includes/js/vendor/tooltipster.bundle.min.js",function(){
                        console.log("`tooltipster.js` is loaded");
                    })
                    .done(function(){
                        $('.mytooltip').tooltipster({
                            contentCloning: true,
                            functionPosition: function(instance, helper, position){
                                position.coord.top += 10;
                                position.coord.left += 10;
                                return position;
                            },
                            interactive: true
                        });
                        console.log("`tooltipster.js` is DONE");
                        $.getScript("dist/includes/js/mypreloader.js",function(){
                            console.log("`mypreloader.js` is DONE");
                        });
                    }); 
                });
                /************** necessary scripts end**************/
            });
        });
    });
});