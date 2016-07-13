jQuery(document).ready(function($) {


    var hideForm = function(/* object */ event){
        console.log("hide form");
        var id = '#' + event.data.id;
        if(event.data.hasOwnProperty("submit") && event.data.submit){
            event.data.func(event.data.formID);
        }
    };




    $('#share_nc_model').click(function(){
        console.log($('#dragoon_nc_manageSharing').serialize());
        $.ajax({
            type: "POST",
            url: "sites/all/modules/_custom/NC_models/static/nonClassUpdates.php",
            data: $('#dragoon_nc_manageSharing').serialize(),
            success: function(data) {
                console.log(data);
                //location.reload();
            },
            error: function(data){

                console.log("fail");
            }
        });

    });

});
