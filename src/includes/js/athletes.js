$(document).ready(function(){
    $.getScript("dist/includes/js/vendor/jquery.dataTables.min.js",function(){
        $.getScript("dist/includes/js/vendor/dataTables.bootstrap4.min.js",function(){
            $.getJSON( "dist/includes/json/common.json", function( data ) {
                $.itemsTopMenu = data.topNavigation;
                var locationPort;
                window.location.port=="" ? locationPort = "/": locationPort= ":"+window.location.port+"/";
                $.locationPage = window.location.protocol + "//" +window.location.hostname + locationPort;
            }).done(function(){            
                $.storageImgMembers = "dist/img/members/";
                var table = $('#listMembers').DataTable( {
                    "ajax": "dist/includes/json/members.json",
                    "oLanguage": {
                        "sUrl": "dist/includes/json/dataTables.russian.txt"
                    },
                    "order": [[ 0, 'asc' ]],
                    "columns": [
                        { "data": "memberId"},
                        { "data": "memberName"},
                        { "data": "memberId"},
                        { "data": "dateJoin" },
                        { "data": "memberId"}
                    ],
                    "columnDefs": [
                        {
                            "targets": 0, 
                            "className": "text-middle",
                        },
                        {
                            "targets": 1, 
                            "className": "text-middle",
                            "render": function ( data, type, row, meta ) {
                                var result;
                                if (type === 'display'){
                                    result = '<p>'+data+'</p>';
                                }else{
                                    result = data;   
                                }
                                return result;
                            }
                        },
                        {
                            "targets": 2,
                            "orderable": false,
                            "render": function ( data, type, row, meta ) {
                                var result;
                            if (type === 'display'){
                                result = '<div class="one-event" data-toggle="modal" data-target="#photo'+data+'"><img id="showMemberPhoto'+data+'" data-run-id="'+data+'" src="'+$.storageImgMembers+data+'.jpg" class="memberPhoto" alt="" data-target="#photo'+data+'" data-slide-to="0" /></div>'
                            

                                var newModalCollection ='<div class="modal fade" id="photo'+data+'" tabindex="-1" role="dialog" aria-hidden="true">'+
                                    '<div class="modal-dialog" role="document">'+
                                        '<div class="modal-content description-member">'+
                                            '<div class="modal-header">'+
                                                '<button type="button" class="close" data-dismiss="modal" aria-label="Close">'+
                                                    '<span aria-hidden="true">&times;</span>'+
                                                '</button>'+
                                            '</div>'+
                                            '<div class="modal-body"><img src="'+$.storageImgMembers+data+'.jpg" alt="" >'+
                                            '</div>'+
                                        '</div>'+
                                    '</div>'+
                                '</div>';
                                $('#modalMembersPhoto').append(newModalCollection);
                            }else{
                                result = data;   
                            }
                                return result;
                            }
                        },
                        {
                            "targets": 3, 
                            "className": "text-middle",
                        },
                        {
                            "targets": 4, 
                            "orderable": false,
                            "className": "text-middle",
                            "render": function ( data, type, row, meta ) {
                                var result;
                                if (type === 'display'){
                                    result = '<a href="'+$.locationPage+'?athlet:'+data+'" class="btn btn-sm btn-outline-info">Подробнее</a>';
                                }else{
                                    result = data;   
                                }
                                return result;
                            }
                        }
                    ]
                })

                $('#listMembers tbody').on('click', 'td.details-control', function () {
                    var tr = $(this).closest('tr');
                    var row = table.row( tr );
                
                    if ( row.child.isShown() ) {
                        row.child.hide();
                        tr.removeClass('shown');
                    }
                    else {
                        row.child( format(row.data()) ).show();
                        tr.addClass('shown');
                        $( ".shown" ).next().addClass( "addInfoShow516");
                    }
                } );

                function format ( rowData ) {
                    var div = $('<div id="addinfo_'+rowData.memberId+'"/>')
                        .addClass( 'loading' )
                        .text( 'Loading...' );
                
                    $.ajax( {
                        url: 'dist/includes/json/members.json',

                        success: function ( json ) {
                            div
                                .html('<table class="table table-striped table-bordered table-sm"><tbody><tr>'+
                                '<td><span class="dtr-title">Никнейм: </span></td><td><span class="dtr-data">'+rowData.nick+'</span></td></tr>'+
                                '<tr><td><span class="dtr-title">join: </span></td><td><span class="dtr-data">'+rowData.dateJoin+'</span></td>'+
                                '</tr></tbody></table>')
                            
                        }
                    } );
                    return div;
                }

            })
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
        });
    });
});