/************** ATHLETES - start  *************/
    /************** dataTable start    *************/
    var locationPort;
    window.location.port=="" ? locationPort = "/": locationPort= ":"+window.location.port+"/";
    $.locationPage = window.location.protocol + "//" +window.location.hostname + locationPort;
    $.dataTablesDictionary = {
        "en": {
            "_name" : "Name",
            "_photo": "Photo",
            "_join" : "Join"
        },
        "ua": {
            "_name" : "Ім'я",
            "_photo": "Фото",
            "_join": "Приєднався"
        }
    };
        
    var athletesDataTable = function(){
        $.elephantLanguage = localStorage.getItem('elLang');
        var listAthletes = '<table id="listAthletes" class="table table-hover container table-bordered dataTable" style="width:100%">'+
                            '<thead>'+
                                '<tr>'+
                                    '<th>#&nbsp;&nbsp;</th>'+
                                    '<th>'+$.dataTablesDictionary[$.elephantLanguage]["_name"]+'</th>'+
                                    '<th class="text-middle">'+$.dataTablesDictionary[$.elephantLanguage]["_photo"]+'</th>'+
                                    '<th>'+$.dataTablesDictionary[$.elephantLanguage]["_join"]+'</th>'+
                                '</tr>'+
                            '</thead>'+
                            '<tfoot>'+
                                '<tr>'+
                                    '<th>#&nbsp;&nbsp;</th>'+
                                    '<th>'+$.dataTablesDictionary[$.elephantLanguage]["_name"]+'</th>'+
                                    '<th class="text-middle">'+$.dataTablesDictionary[$.elephantLanguage]["_photo"]+'</th>'+
                                    '<th>'+$.dataTablesDictionary[$.elephantLanguage]["_join"]+'</th>'+
                                '</tr>'+
                            '</tfoot>'+
                        '</table>';
        $("#wrapperListAthletes").html(listAthletes);

        $.arrayAthletes = [];
        $.storageImgMembers = "dist/img/members/";
        $.memberName = "memberName-"+ $.elephantLanguage;
        /************* List of Athletes**************/
        $.getJSON( "dist/includes/json/members.json", function( data ) {
            $.athletesData = data.data;
        })
        .done(function(){
            var table = $('#listAthletes').DataTable( {
                "data": $.athletesData,
                "oLanguage": {
                    "sUrl": "dist/includes/json/dataTables."+$.elephantLanguage+".txt"
                },
                "order": [[ 0, 'asc' ]],
                "columns": [
                    { "data": "memberId"},
                    { "data": $.memberName},
                    { "data": "memberId"},
                    { "data": "dateJoin" }
                ],
                "columnDefs": [
                    {
                        "targets": 0, 
                        "className": "text-middle w-15-percent"
                    },
                    {
                        "targets": 1, 
                        "className": "text-middle",
                        "render": function ( data, type, row, meta ) {
                            var result;
                            if (type === 'display'){
                                result = "<a href='"+$.locationPage+"?athlet:"+row.memberId+"'>"+data+'</a>';
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
                            $('#modalSegment').append(newModalCollection);
                        }else{
                            result = data;   
                        }
                            return result;
                        }
                    },
                    {
                        "targets": 3, 
                        "className": "text-middle",
                    }
                ]
            })
        })
    }
    /************** dataTable end    *************/
/************** ATHLETES -  end    *************/