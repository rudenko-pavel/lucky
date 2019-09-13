/************** ATHLETES - start  *************/
    /************** dataTable start    *************/
    var locationPort;
    window.location.port=="" ? locationPort = "/": locationPort= ":"+window.location.port+"/";
    $.locationPage = window.location.protocol + "//" +window.location.hostname + locationPort;
    $.dataTablesDictionary = {
        "en": {
            "_name"         : "Name",
            "_photo"        : "Photo",
            "_join"         : "Join",
            "_athletes"     : "athletes",
            "_runs"         : "runs"
        },
        "ua": {
            "_name"         : "Ім'я",
            "_photo"        : "Фото",
            "_join"         : "Приєднався",
            "_athletes"     : "спортсмени",
            "_runs"         : "перегони"
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
        $.getJSON( "dist/includes/json/members.json", function( data ) {
            $.athletesData = data.data;
            $.athletes = $.athletesData.length;
            $.getJSON( "dist/includes/json/participations.json", function( data2 ) {
                $.runsData = data2.data;
                $.runs = $.runsData.length;
                $.each( $(".reveal.carousel"), function(key, value) {
                    var header= $("#"+value.id).find(".card-header");
                    $("#"+ header[0]["id"]).html("<span>"+$.dataTablesDictionary[$.elephantLanguage][$("#"+ header[0]["id"]).data("txt")]+"</span>");
    
                    var title= $("#"+value.id).find(".title");
                    var ff = $("#"+ title[0]["id"]).data("item");
                    var gg = eval("$."+ff);
                    $("#"+ title[0]["id"]).html(gg);
                })
            })
        })
    }
    /************** reveal end ****************/   
    var athletesDataTable = function(){
        $.elephantLanguage = localStorage.getItem('elLang');
        var listAthletes = '<table id="listAthletes" class="table table-hover container table-bordered dataTable d3-effect" style="width:100%">'+
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
                            result = '<div class="one-event" data-toggle="modal" data-target="#photo'+data+'"><img id="showMemberPhoto'+data+'" data-run-id="'+data+'" src="'+$.storageImgMembers+data+'/1.jpg" class="memberPhoto" alt="" data-target="#photo'+data+'" data-slide-to="0" /></div>'

                            var newModalCollection ='<div class="modal fade" id="photo'+data+'" tabindex="-1" role="dialog" aria-hidden="true">'+
                                '<div class="modal-dialog" role="document">'+
                                    '<div class="modal-content description-member">'+
                                        '<div class="modal-header">'+
                                            '<button type="button" class="close" data-dismiss="modal" aria-label="Close">'+
                                                '<span aria-hidden="true">&times;</span>'+
                                            '</button>'+
                                        '</div>'+
                                        '<div class="modal-body"><img src="'+$.storageImgMembers+data+'/1.jpg" alt="" >'+
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