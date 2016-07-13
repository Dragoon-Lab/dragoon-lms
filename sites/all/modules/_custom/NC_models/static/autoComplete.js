(function ($) {

    $(document).ready(function() {

        var availableTags = [];
        $.ajax({
            type: "GET",
            url: "sites/all/modules/_custom/NC_models/static/getUsers.php",
            success: function(data) {
                availableTags = data.split(",");
                console.log(availableTags, typeof availableTags);
            },
            error: function(data){
                availableTags = "something went wrong please try again";
                console.log("something failed");
            }
        });
        function split( val ) {
            return val.split( /,\s*/ );
        }
        function extractLast( term ) {
            return split( term ).pop();
        }

        $( "#share_user_name" )
            // don't navigate away from the field on tab when selecting an item
            .bind( "keydown", function( event ) {
                if ( event.keyCode === $.ui.keyCode.TAB &&
                    $( this ).autocomplete( "instance" ).menu.active ) {
                    event.preventDefault();
                }
            })
            .autocomplete({
                minLength: 0,
                source: function( request, response ) {
                    // delegate back to autocomplete, but extract the last term
                    response( $.ui.autocomplete.filter(
                        availableTags, extractLast( request.term ) ) );
                },
                focus: function() {
                    // prevent value inserted on focus
                    return false;
                },
                select: function( event, ui ) {
                    var terms = split( this.value );
                    // remove the current input
                    terms.pop();
                    // add the selected item
                    terms.push( ui.item.value );
                    // add placeholder to get the comma-and-space at the end
                    terms.push( "" );
                    this.value = terms.join( ", " );
                    return false;
                },
                appendTo: "#user_list_display"
            });

    });
})(jQuery);/**
 * Created by RiteshSamala on 6/29/16.
 */
