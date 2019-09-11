/************** EVENTS - start  *************/
    /************** dataTable start    *************/
    var locationPort;
    window.location.port=="" ? locationPort = "/": locationPort= ":"+window.location.port+"/";
    $.locationPage = window.location.protocol + "//" +window.location.hostname + locationPort;
    $.eventsData="";
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
    /************** reveal start ****************/
    var initMagicScroll = function(){
        // init controller
        var controller = new ScrollMagic.Controller({globalSceneOptions: {triggerHook: "onEnter", duration: "150%"}});
        
        // build scenes - advanced/parallax_sections
        new ScrollMagic.Scene({triggerElement: ".parallaxParent"})
            .setTween(".parallaxParent > div", {y: "80%", ease: Linear.easeNone})
            .addTo(controller);

        // build scenes - basic/reveal_on_scroll
        new ScrollMagic.Scene({
            triggerElement: "#trigger1",
            triggerHook: 0.9, // show, when scrolled 10% into view
            duration: "80%", // hide 10% before exiting view (80% + 10% from bottom)
            offset: 50 // move trigger to center of element
        })
        .setClassToggle("#reveal1", "visible") // add class to reveal
        .addTo(controller);
        new ScrollMagic.Scene({
            triggerElement: "#trigger2",
            triggerHook: 0.9, // show, when scrolled 10% into view
            duration: "80%", // hide 10% before exiting view (80% + 10% from bottom)
            offset: 50 // move trigger to center of element
        })
        .setClassToggle("#reveal2", "visible") // add class to reveal  
        .addTo(controller);
    }

    var cardView = function(){
        $.getJSON( "dist/includes/json/events.json", function( data ) {
            $.eventsData2 = data.data;
            $.citiesData2 = data.googlePlases;
            $.races = $.eventsData2.length;
            $.cities = $.citiesData2.length;
            $.each( $(".reveal.carousel"), function(key, value) {
                var header= $("#"+value.id).find(".card-header");
                $("#"+ header[0]["id"]).html("<span>"+$.dataTablesDictionary[$.elephantLanguage][$("#"+ header[0]["id"]).data("txt")]+"</span>");

                var title= $("#"+value.id).find(".title");
                var ff = $("#"+ title[0]["id"]).data("item");
                var gg = eval("$."+ff);
                $("#"+ title[0]["id"]).html(gg);
            })   
        })

    }
    /************** reveal end ****************/

    var eventsDataTable = function(){
        $.getJSON( "dist/includes/json/events.json", function( data ) {
            $.eventsData = data.data;

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