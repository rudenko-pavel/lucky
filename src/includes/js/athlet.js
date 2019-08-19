$(document).ready(function(){
    $.getScript("dist/includes/js/common.js",function(){
        $.getScript("dist/includes/js/vendor/jquery.dataTables.min.js",function(){
            $.getScript("dist/includes/js/vendor/dataTables.bootstrap4.min.js",function(){
                // initialisation vars
                $.memberId = "";
                $.memberPhoto = "";
                $.memberInfo={};
                $.fullInfo={};
                $.pathToImg = "dist/img/members/";
                $.flagIsMember = false;

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
                    $.getJSON( "dist/includes/json/common.json", function( data ) { //get fields names for vew on page
                        $.commonData = data.athletNamesOptions;
                        console.log("$.commonData",$.commonData,$.memberInfo);
                    }).done(function(){
                        if ($.flagIsMember){    // id-athlet is in JSON
                            $.memberPhoto = "<img class='card-img-top' src='"+$.pathToImg+$.memberId+".jpg' data-toggle='modal' data-target='#photo"+$.memberId+"' />";
                            
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
                            var fl=0;

                            $.each( $.memberInfo, function(key, value) {

                                var nameField="";
                                var flagView = false;
                                $.each( $.commonData, function(key2) {
                                    if (key == $.commonData[key2]["idName"]){
                                        if ($.commonData[key2]["isView"] == true){
                                            flagView = true;
                                            nameField = $.commonData[key2][$.elephantLanguage];
                                            fl++;
                                        }
                                        return false;
                                    }
                                })

                                if (flagView == true){
                                    var addClass;
                                    fl%2!=0 ? addClass="bg-success" : addClass="bg-warning"; 
                                    var dataInfo = '<tr class="'+addClass+'"><td>'+nameField + '</td><td>'+ value + '</td></tr>';
                                    $("#memberInfo").append(dataInfo);
                                }
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
                        var table = $('#listRaces').DataTable( {
                            "ajax": "dist/includes/json/participations.json",
                            "order": [[ 0, 'asc' ]],
                            "columns": [
                                { "data": "id"},
                                { "data": "eventId"}
                            ],
                            "columnDefs": [
                                {
                                    "targets": 1, 
                                    "className": "text-middle",
                                    "render": function ( data, type, row, meta ) {
                                        var result;
                                        if (type === 'display' && $.memberId==row.memberId){
                                            result = $.memberId+' '+data;
                                        }else{
                                            result = data;   
                                        }
                                        return result;
                                    }
                                }
                            ]
                        })
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
        