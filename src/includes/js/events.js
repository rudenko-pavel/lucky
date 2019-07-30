$(document).ready(function(){
    $.getScript("dist/includes/js/jquery.dataTables.min.js",function(){
        $.getScript("dist/includes/js/dataTables.bootstrap4.min.js",function(){

            $('#listEvents').DataTable( {
                "ajax": "dist/includes/json/events.json",
                "columns": [
                    { "data": "runDate","width": "15%" },
                    { "data": "runId","width": "15%" },
                    { "data": "name" },
                    { "data": "runId" }
                ],
                "columnDefs": [
                    {
                        "targets": 1,
                        "orderable": false,
                        "render": function ( data, type, row, meta ) {
                          return type === 'display' ?
                            '<div class="one-event" data-toggle="modal" data-target="#carousel'+data+'"><img id="showEvent'+data+'" data-run-id="'+data+'" src="dist/img/logoevents/'+data+'.png" class="eventLogo" alt="" data-target="#carousel'+data+'" data-slide-to="0" /></div>' :
                            data;
                        }
                    },
                    {
                        "targets": 2,
                        "render": function ( data, type, row, meta ) {
                          return type === 'display' ?
                            '<div>'+data+'</div>'+ row.runId +
                            '<div class="one-descr" data-toggle="modal" data-target="#description'+row.runId+'"><span class="btn btn-outline-info" data-target="#description'+row.runId+'">Описание</span></div>' :
                            data;
                        }
                    },
                    {
                        "targets": 3,
                        "orderable": false,
                        "render":function ( data, type, row, meta ) {
                            if (type === 'display') {
                                return data + '&&&';
                            }      
                            else{
                                return data + '***';
                            }
                        }
                    }
                ]
            })

        })
        .done(function(){
            $.getScript("./dist/includes/js/tooltipster.bundle.min.js",function(){
            }).done(function(){
                    $('.mytooltip').tooltipster({
                        contentCloning: true,
                        functionPosition: function(instance, helper, position){
                            position.coord.top += 10;
                            position.coord.left += 10;
                            return position;
                        },
                        interactive: true
                    });
            });
        });
    })
    .done(function(){
        $.getJSON( "dist/includes/json/events.json", function( data ) {
            $.listEvents = data.data;
            $.modalImages = "";
        })
        .done(function(){
            $( ".eventLogo" ).each(function( index ) {

                $.storageImg = "dist/img/timeline/";
    
                    var newModalCollectionStart ='<div class="modal fade" id="carousel'+$( this ).data('runId')+'" tabindex="-1" role="dialog" aria-hidden="true">'+
                    '<div class="modal-dialog" role="document">'+
                        '<div class="modal-content">'+
                            '<div class="modal-body">'+        
                                '<div id="images_'+$( this ).data('runId')+'" class="carousel slide" data-ride="carousel">'+
                                    '<div class="carousel-inner">';
    
                    var newModalCollectionMiddle = "";
                    for (i=1;i<=$.listEvents[index]["countImages"]; i++){
                        var addClass = "";
                        if (i==1) addClass=" active"; else addClass = ""
                        newModalCollectionMiddle += '<div class="carousel-item'+addClass+'">'+
                                                '<img class="d-block w-100" src="'+$.storageImg+$.listEvents[index]["runId"]+'/'+i+'.jpg">'+
                                            '</div>';
                    }
    
                    var newModalCollectionEnd ='</div>'+ 
                                        '<a class="carousel-control-prev" href="#images_'+$( this ).data('runId')+'" role="button" data-slide="prev">'+
                                            '<span class="carousel-control-prev-icon" aria-hidden="true"></span>'+
                                            '<span class="sr-only">Previous</span>'+
                                        '</a>'+
                                        '<a class="carousel-control-next" href="#images_'+$( this ).data('runId')+'" role="button" data-slide="next">'+
                                            '<span class="carousel-control-next-icon" aria-hidden="true"></span>'+
                                            '<span class="sr-only">Next</span>'+
                                        '</a>'+       
                                    '</div>'+
                                '</div>'+
                            '</div>'+
                        '</div>'+
                    '</div>';

                    var newModalDescriptions =
                    '<div class="modal fade" id="description'+$( this ).data('runId')+'" tabindex="-1" role="dialog" aria-hidden="true">'+
                        '<div class="modal-dialog" role="document">'+
                            '<div class="modal-content description-event">'+
                                '<div class="modal-body"><img src="dist/img/team.png" alt="" >'+$.listEvents[index]["descriptions"] +
                                '</div>'+
                            '</div>'+
                        '</div>'+
                    '</div>';
    
                    var newModalCollection = newModalCollectionStart + newModalCollectionMiddle + newModalCollectionEnd;
                
                    $.modalImages +=newModalCollection;
                    $.modalDescriptions += newModalDescriptions;

              });
              $('#modalSegment').append($.modalImages);
              $('#modalDescriptions').append($.modalDescriptions);

        })
    }); 

    

/**************MODAL CAROUSEL **************/
 
});
