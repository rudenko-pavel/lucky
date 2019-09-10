/************** EVENTS - start  *************/
    /************** dataTable start    *************/
    var locationPort;
    window.location.port=="" ? locationPort = "/": locationPort= ":"+window.location.port+"/";
    $.locationPage = window.location.protocol + "//" +window.location.hostname + locationPort;
    $.dataTablesDictionary = {
        "en": {
            "_date"         : "Date",
            "_logo"         : "Logo",
            "_title"        : "Title",
            "_races"        : "events",
            "_cities"       : "cities"
        },
        "ua": {
            "_date"         : "Дата",
            "_logo"         : "Лого",
            "_title"        : "Назва",
            "_races"        : "події",
            "_cities"       : "міста"
        }
    };
        
    var eventsDataTable = function(){
        $.elephantLanguage = localStorage.getItem('elLang');
        var listEvents = '<table id="listEvents" class="table table-hover container table-bordered dataTable d3-effect" style="width:100%">'+
                            '<thead>'+
                                '<tr>'+
                                    '<th>'+$.dataTablesDictionary[$.elephantLanguage]["_date"]+'</th>'+
                                    '<th class="text-middle">'+$.dataTablesDictionary[$.elephantLanguage]["_logo"]+'</th>'+
                                    '<th>'+$.dataTablesDictionary[$.elephantLanguage]["_title"]+'</th>'+
                                '</tr>'+
                            '</thead>'+
                            '<tfoot>'+
                                '<tr>'+
                                    '<th>'+$.dataTablesDictionary[$.elephantLanguage]["_date"]+'</th>'+
                                    '<th class="text-middle">'+$.dataTablesDictionary[$.elephantLanguage]["_logo"]+'</th>'+
                                    '<th>'+$.dataTablesDictionary[$.elephantLanguage]["_title"]+'</th>'+
                                '</tr>'+
                            '</tfoot>'+
                        '</table>';
        $("#wrapperListEvents").html(listEvents);

        $.arrayEvents = [];
        $.storageImg = "dist/img/logoevents/";
        $.eventName = "name-"+ $.elephantLanguage;
        /************* List of Events**************/
        $.getJSON( "dist/includes/json/events.json", function( data ) {
            $.eventsData = data.data;
            $.citiesData = data.googlePlases;
            $.races = $.eventsData.length;
            $.cities = $.citiesData.length;
            $.each( $(".reveal.carousel"), function(key, value) {
                var header= $("#"+value.id).find(".card-header");
                $("#"+ header[0]["id"]).html("<span>"+$.dataTablesDictionary[$.elephantLanguage][$("#"+ header[0]["id"]).data("txt")]+"</span>");

                var title= $("#"+value.id).find(".title");
                var ff = $("#"+ title[0]["id"]).data("item");
                var gg = eval("$."+ff);
                $("#"+ title[0]["id"]).html(gg);
            })   
        })
        .done(function(){
            var table = $('#listEvents').DataTable( {
                "data": $.eventsData,
                "oLanguage": {
                    "sUrl": "dist/includes/json/dataTables."+$.elephantLanguage+".txt"
                },
                "order": [[ 0, 'asc' ]],
                "columns": [
                    { "data": "runDate"},
                    { "data": "runId"},
                    { "data": $.eventName }
                ],
                "columnDefs": [
                    {
                        "targets": 0, 
                        "className": "text-middle w-20-percent",
                    },
                    {
                        "targets": 1,
                        "orderable": false,
                        "className": "text-middle w-20-percent",
                        "render": function ( data, type, row, meta ) {
                            var result;
                            if (type === 'display'){
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
                        return type === 'display' ?
                            "<a href='"+$.locationPage+"?event:"+row.runId+"'>"+data+"</a>" :
                            data;
                        }
                    }
                ]
            })
        })
    }
    /************** dataTable end    *************/
/************** EVENTS -  end    *************/