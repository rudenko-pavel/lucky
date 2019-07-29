$(document).ready(function(){
    $.getScript("dist/includes/js/jquery.dataTables.min.js",function(){
        $.getScript("dist/includes/js/dataTables.bootstrap4.min.js",function(){
        


            $('#listEvents').DataTable( {
                "ajax": "dist/includes/json/events.json",
                "columns": [
                    { "data": "runDate" },
                    { "data": "runId" },
                    { "data": "name" }
                ],
                "columnDefs": [
                    {
                        "targets": 1,
                        "data": "description",
                        "orderable": false,
                        "render": function ( data, type, row, meta ) {
                          return type === 'display' ?
                            '<img src="dist/img/logoevents/'+data+'.png" class="eventLogo" />' :
                            data;
                        }
                      }
                ]
            });
     

        });
    });
});
