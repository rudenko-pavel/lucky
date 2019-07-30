$(document).ready(function(){
    $.getScript("dist/includes/js/vendor/jquery.dataTables.min.js",function(){
        $.getScript("dist/includes/js/vendor/dataTables.bootstrap4.min.js",function(){

            $('#listMembers').DataTable( {
                "ajax": "dist/includes/json/members.json",
                "columns": [
                    { "data": "memberId"},
                    { "data": "name"},
                    { "data": "nick"},
                    { "data": "memberId"},
                    { "data": "dateJoin" }
                ],
                "columnDefs": [
                    {
                        "targets": 3,
                        "orderable": false,
                        "render": function ( data, type, row, meta ) {
                          return type === 'display' ?
                          '<div class="one-event" data-toggle="modal" data-target="#photo'+data+'"><img id="showMemberPhoto'+data+'" data-run-id="'+data+'" src="dist/img/members/'+data+'.jpg" class="memberPhoto" alt="" data-target="#photo'+data+'" data-slide-to="0" /></div>' :
                            data;
                        }
                    }
                ]
            })

        })
    })
    .done(function(){
        $.getJSON( "dist/includes/json/members.json", function( data ) {
            $.listMembers = data.data;
            console.log($.listMembers);
            $.modalMembersPhoto = "";
        })
        .done(function(){
            $( ".memberPhoto" ).each(function( index ) {

                $.storageImgMembers = "dist/img/members/";
    
                var newModalCollection =                   
                '<div class="modal fade" id="photo'+$.listMembers[index]["memberId"]+'" tabindex="-1" role="dialog" aria-hidden="true">'+
                    '<div class="modal-dialog" role="document">'+
                        '<div class="modal-content description-member">'+
                            '<div class="modal-body"><img src="dist/img/members/'+$.listMembers[index]["memberId"]+'.jpg" alt="" >'+
                            '</div>'+
                        '</div>'+
                    '</div>'+
                '</div>';

             
                    $.modalMembersPhoto +=newModalCollection;

              });
              $('#modalMembersPhoto').append($.modalMembersPhoto);


        })
    }); 
});
