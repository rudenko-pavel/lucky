$(document).ready(function(){
    $.getScript("dist/includes/js/common.js",function(){
        $.getScript("dist/includes/js/vendor/jquery.dataTables.min.js",function(){
            $.getScript("dist/includes/js/vendor/dataTables.bootstrap4.min.js",function(){
                // initialisation vars
                $.memberId = "";
                $.memberPhoto = "";
                $.memberInfo={};
                $.fullInfo={};
                $.pathToImg = "dist/img/members/";                      // path to avatar
                $.flagIsMember = false;
                $.elephantLanguage = localStorage.getItem('elLang');    // language (en/ua)

                // get all athletes data from *.JSON
                $.getJSON( "dist/includes/json/members.json", function( data ) {
                    $.fullInfo = data.data;

                    var str = window.location.search.substring(1).split(":"); // get number athlet's from url e.g. athlet:3
                    $.memberId = parseInt (str[1]);
                    $.each( $.fullInfo, function(key) {
                        if ($.fullInfo[key]["memberId"] == $.memberId){
                            $.memberInfo = Object.assign({}, $.fullInfo[key]); // clone object with current athlet info
                            $.flagIsMember = true;
                            return false; 
                        };
                    });
                    
                }).done(function(){
                    $.getJSON( "dist/includes/json/common.json", function( data ) { //get fields names for view on page
                        $.commonData = data.athletNamesOptions;
                        console.log("$.memberInfo: ",$.memberInfo);
                    }).done(function(){
                        if ($.flagIsMember){    // id-athlet is in JSON
                            $.memberPhoto = "<img class='card-img-top d3-effect' src='"+$.pathToImg+$.memberId+".jpg' data-toggle='modal' data-target='#photo"+$.memberId+"' />";
                            
                            var newModalCollection ='<div class="modal fade" id="photo'+$.memberId+'" tabindex="-1" role="dialog" aria-hidden="true">'+
                                '<div class="modal-dialog" role="document">'+
                                    '<div class="modal-content description-member">'+
                                        '<div class="modal-header">'+
                                            '<button type="button" class="close" data-dismiss="modal" aria-label="Close">'+
                                                '<span aria-hidden="true">&times;</span>'+
                                            '</button>'+
                                        '</div>'+
                                        '<div class="modal-body"><img src="'+$.pathToImg+$.memberId+'.jpg" alt="" >'+
                                        '</div>'+
                                    '</div>'+
                                '</div>'+
                            '</div>';
                            $('#modalSegment').append(newModalCollection);

                            $("#memberPhoto").prepend($.memberPhoto);
                            $.getScript("./dist/includes/js/translate/athlet_tr.js",function(){
                                infoAthlet();  // draw info about athlet
                            });
                           
                        }else{
                            $.newURL = "dist/includes/404.html";
                            $("#bodyContent").load($.newURL); 
                            $("#preloader").hide();
                            console.log("4. str `404` loaded");
                        }
                    })


                    /************** data table ************/
                    $.getJSON( "dist/includes/json/events.json", function( data ) {
                        $.itemsEvents = data.data;
                    }).done(function(){
                        $.getScript("./dist/includes/js/translate/athlet_tr.js",function(){
                            athletDataTable();  // draw info about athlet
                        });
                    })

                });
            })
            .done(function(){
                /************** necessary scripts **************/
                $.getScript("dist/includes/js/mypreloader.js",function(){
                    console.log("`mypreloader.js` is DONE");
                });
            });
        });
    });    
})
        