/************** ATHLET:id - start  *************/
    /************** translate info start  *************/
    var infoAthlet = function(){
        var fl=0;
        var dataInfo = "";
        $.elephantLanguage = localStorage.getItem('elLang');
        $.each( $.memberInfo, function(key, value) {
            var currLang="";
            var n = key.indexOf("-");
            if (n != -1){
                currLang = key.substr(n+1);
                key = key.substr(0, n);
            }else{currLang =$.elephantLanguage}
            if (currLang ==$.elephantLanguage ){
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
                    dataInfo = dataInfo + '<tr class="'+addClass+'"><td style="width:50%">'+nameField + '</td><td>'+ value + '</td></tr>';
                }
            }
        });

        $("#memberInfo").html(dataInfo);
    }
    /************** translate info end    *************/
    /************** dataTable start    *************/
    $.dataTablesDictionary = {
        "en": {
            "_race": "Race",
            "_date": "Date"
        },
        "ua": {
            "_race": "Гонка",
            "_date": "Дата"
        }
    };
        
    $.elephantLanguage = localStorage.getItem('elLang');
    var athletDataTable = function(){
        var listRaces = '<table id="listRaces" class="table table-hover container table-bordered dataTable" style="width:80%">'+
                            '<thead>'+
                                '<tr>'+
                                    '<th>'+$.dataTablesDictionary[$.elephantLanguage]["_date"]+'</th>'+
                                    '<th>&nbsp;&nbsp;</th>'+
                                    '<th>'+$.dataTablesDictionary[$.elephantLanguage]["_race"]+'</th>'+
                                '</tr>'+
                            '</thead>'+
                            '<tfoot>'+
                                '<tr>'+
                                    '<th>'+$.dataTablesDictionary[$.elephantLanguage]["_date"]+'</th>'+
                                    '<th class="w-20-percent">&nbsp;&nbsp;</th>'+
                                    '<th>'+$.dataTablesDictionary[$.elephantLanguage]["_race"]+'</th>'+
                                '</tr>'+
                            '</tfoot>'+
                        '</table>';
        $("#wrapperListRaces").html(listRaces);

        $.getJSON( "dist/includes/json/participations.json", function( data ) { //get fields names for view on page
            $.participationsData = data.data;
            $.arrayMemberEvents = [];
            $.eventsData=[];
            $.each( $.participationsData, function(key) {
                if ($.participationsData[key]["memberId"] == $.memberInfo["memberId"]){
                    $.arrayMemberEvents.push($.participationsData[key]);
                };
            });
        }).done(function(){
            $.getJSON( "dist/includes/json/events.json", function( data ) { //get fields names for view on page
                $.eventsData = data.data;
            }).done(function(){
                $.storageImg = "dist/img/logoevents/";
                console.log("$.arrayMemberEvents",$.arrayMemberEvents);
                console.log("EVENTS2: ", $.eventsData);
                var table = $('#listRaces').DataTable( {
                    "data": $.arrayMemberEvents,
                    "oLanguage": {
                        "sUrl": "dist/includes/json/dataTables."+$.elephantLanguage+".txt"
                    },
                    "order": [[ 0, 'asc' ]],
                    "columns": [
                        { "data": "eventId"},
                        { "data": "eventId"},
                        { "data": "eventId"}
                    ],
                    "columnDefs": [
                        {
                            "targets": 0, 
                            "className": "text-middle",
                            "render": function ( data, type, row, meta ) {
                                var result;
                                if (type === 'display' && $.memberId==row.memberId){
                                    $.each( $.eventsData, function(key) {
                                        if ($.eventsData[key]["runId"] == data){
                                            result = $.eventsData[key]["runDate"];
                                            return true;
                                        };
                                    });
                                    
                                }else{
                                    result = data;   
                                }
                                return result;
                            }
                        },
                        {
                            "targets": 1, 
                            "orderable": false,
                            "className": "text-middle",
                            "render": function ( data, type, row, meta ) {
                                var result;
                                if (type === 'display' && $.memberId==row.memberId){
                                    result = '<div class="one-event" data-toggle="modal" data-target="#photo'+data+'"><img id="showEvent'+data+'" data-run-id="'+data+'" src="'+$.storageImg+data+'.png" class="eventLogo" alt="" data-target="#photo'+data+'" data-slide-to="0" /></div>';

                                    var newModalCollection ='<div class="modal fade" id="photo'+data+'" tabindex="-1" role="dialog" aria-hidden="true">'+
                                        '<div class="modal-dialog" role="document">'+
                                            '<div class="modal-content description-member">'+
                                                '<div class="modal-header">'+
                                                    '<button type="button" class="close" data-dismiss="modal" aria-label="Close">'+
                                                        '<span aria-hidden="true">&times;</span>'+
                                                    '</button>'+
                                                '</div>'+
                                                '<div class="modal-body"><img src="'+$.storageImg+data+'.png" alt="" >'+
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
                            "targets": 2, 
                            "className": "text-middle",
                            "render": function ( data, type, row, meta ) {
                                var result;
                                if (type === 'display' && $.memberId==row.memberId){
                                    $.each( $.eventsData, function(key) {
                                        if ($.eventsData[key]["runId"] == data){
                                            result = $.eventsData[key]["name"];
                                            return true;
                                        };
                                    });
                                    
                                }else{
                                    result = data;   
                                }
                                return result;
                            }
                        }
                    ]
                })
            })
        })
    }
    /************** dataTable end    *************/
/************** ATHLET:id -  end    *************/