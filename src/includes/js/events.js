$(document).ready(function(){
    $.getScript("dist/includes/js/vendor/jquery.dataTables.min.js",function(){
        $.getScript("dist/includes/js/vendor/dataTables.bootstrap4.min.js",function(){

            $.storageImg = "dist/img/timeline/";
            var table = $('#listEvents').DataTable( {
                "ajax": "dist/includes/json/events.json",
                "oLanguage": {
                    "sUrl": "dist/includes/json/dataTables.russian.txt"
                },
                "order": [[ 1, 'asc' ]],
                "columns": [
                    { "data": null},
                    { "data": "runDate"},
                    { "data": "runId"},
                    { "data": "name" },
                    { "data": "descriptions" }
                ],
                "columnDefs": [
                    {
                        "targets": 0,
                        "orderable": false,
                        "className": "details-control control more576",
                        "render": function ( data, type, row, meta ) {
                          return type === 'display' ?
                          '&nbsp;' :
                            data;
                        }
                    },
                    {
                        "targets": 1,
                        "className": "w-20-percent"
                    },
                    {
                        "targets": 2,
                        "orderable": false,
                        "className": "w-20-percent less576",
                        "render": function ( data, type, row, meta ) {
                          return type === 'display' ?
                            '<div class="one-event" data-toggle="modal" data-target="#carousel'+data+'"><img id="showEvent'+data+'" data-run-id="'+data+'" src="dist/img/logoevents/'+data+'.png" class="eventLogo" alt="" data-target="#carousel'+data+'" data-slide-to="0" /></div>' :
                            data;
                        }
                    },
                    {
                        "targets": 3,
                        "render": function ( data, type, row, meta ) {
                          return type === 'display' ?
                            '<div class="one-descr">'+data+'</div>' :
                            data;
                        }
                    },
                    {
                        "targets": 4,
                        "orderable": false,
                        "className": "less576",
                        "render": function ( data, type, row, meta ) {
                            var result;
                            if ( type === 'display'){
                                result = '<div class="one-descr" data-toggle="modal" data-target="#description'+row.runId+'"><span class="btn btn-outline-info" data-target="#description'+row.runId+'">Описание</span></div>' 
                            

                                var newModalDescriptions ='<div class="modal fade" id="description'+row.runId+'" tabindex="-1" role="dialog" aria-hidden="true">'+
                                '<div class="modal-dialog" role="document">'+
                                    '<div class="modal-content description-event">'+
                                        '<div class="modal-header">'+
                                            '<button type="button" class="close" data-dismiss="modal" aria-label="Close">'+
                                                '<span aria-hidden="true">&times;</span>'+
                                            '</button>'+
                                        '</div>'+
                                        '<div class="modal-body"><img src="dist/img/team.png" alt="" >'+data +
                                        '</div>'+
                                    '</div>'+
                                '</div>'+
                            '</div>';
                                $('#modalDescriptions').append(newModalDescriptions);
                            



    
                                var newModalCollectionStart ='<div class="modal fade" id="carousel'+row.runId+'" tabindex="-1" role="dialog" aria-hidden="true">'+
                                '<div class="modal-dialog" role="document">'+
                                    '<div class="modal-content">'+
                                        '<div class="modal-header">'+
                                            '<button type="button" class="close" data-dismiss="modal" aria-label="Close">'+
                                                '<span aria-hidden="true">&times;</span>'+
                                            '</button>'+
                                        '</div>'+
                                        '<div class="modal-body">'+        
                                            '<div id="images_'+row.runId+'" class="carousel slide" data-ride="carousel">'+
                                                '<div class="carousel-inner">';
                
                                var newModalCollectionMiddle = "";
                                for (i=1;i<=row.countImages; i++){
                                    var addClass = "";
                                    if (i==1) addClass=" active"; else addClass = ""
                                    newModalCollectionMiddle += '<div class="carousel-item'+addClass+'">'+
                                                            '<img class="d-block w-100" src="'+$.storageImg+row.runId+'/'+i+'.jpg">'+
                                                        '</div>';
                                }
                
                                var newModalCollectionEnd ='</div>'+ 
                                                    '<a class="carousel-control-prev" href="#images_'+row.runId+'" role="button" data-slide="prev">'+
                                                        '<span class="carousel-control-prev-icon" aria-hidden="true"></span>'+
                                                        '<span class="sr-only">Previous</span>'+
                                                    '</a>'+
                                                    '<a class="carousel-control-next" href="#images_'+row.runId+'" role="button" data-slide="next">'+
                                                        '<span class="carousel-control-next-icon" aria-hidden="true"></span>'+
                                                        '<span class="sr-only">Next</span>'+
                                                    '</a>'+       
                                                '</div>'+
                                            '</div>'+
                                        '</div>'+
                                    '</div>'+
                                '</div>';
            
                
                                var newModalCollection = newModalCollectionStart + newModalCollectionMiddle + newModalCollectionEnd;

                                $('#modalSegment').append(newModalCollection);    

                            }else
                            {
                                result =  data;
                            }
                            return result;
                        }
                    }
                ]
            })


            $('#listEvents tbody').on('click', 'td.details-control', function () {
                var tr = $(this).closest('tr');
                var row = table.row( tr );
             
                if ( row.child.isShown() ) {
                    row.child.hide();
                    tr.removeClass('shown');
                }
                else {
                    row.child( format(row.data()) ).show();
                    tr.addClass('shown');
                    $( ".shown" ).next().addClass( "addInfoShow577");
                }
            } );
            function format ( rowData ) {
                var div = $('<div id="addinfo_'+rowData.runId+'"/>')
                    .addClass( 'loading' )
                    .text( 'Loading...' );
             
                $.ajax( {
                    url: 'dist/includes/json/events.json',

                    success: function ( json ) {
                        div
                            .html('<table class="table table-striped table-bordered table-sm"><tbody><tr>'+
                            '<td><span class="dtr-title">Галлерея: </span></td><td><div class="one-event" data-toggle="modal" data-target="#carousel'+rowData.runId+'"><img id="showEvent'+rowData.runId+'" data-run-id="'+rowData.runId+'" src="dist/img/logoevents/'+rowData.runId+'.png" class="eventLogo" alt="" data-target="#carousel'+rowData.runId+'" data-slide-to="0" /></div></td></tr>'+
                            '<tr><td><span class="dtr-title">Описание: </span></td><td><span class="dtr-data">'+rowData.descriptions+'</span></td>'+
                            '</tr></tbody></table>')
                           
                    }
                } );
                return div;
            }




        })
        .done(function(){
            $.getScript("./dist/includes/js/vendor/tooltipster.bundle.min.js",function(){
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

    }); 
});
