(function ($) {
    $(document).ready(function() {
        $('#cf_button').click(function(){
            var newFolder = $("#folder_name").val();
            var sharedList = $("#shared_users").val();
            if(sharedList == ""){
                console.log(newFolder, "is private" );
                //send a request to update newFolder to the database
                $.ajax({
                    url: "sites/all/modules/_custom/NC_models/static/nonClassUpdates.php",
                    dataType: "jsonp",
                    data: {
                        req_type: "create Folder",
                        newf: newFolder,
                        type: "private",
                        owner:
                    },
                    success: function( data ) {
                        response( data );
                    }
                });
            }
        })
    });
})(jQuery);