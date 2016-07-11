

jQuery(document).ready(function($) {
    var showForm = function (/* object */ event) {
        var id = '#' + event.data.id;
        if (event.data.hasOwnProperty("update") && event.data.update) {
            if (event.data.hasOwnProperty("value")) {
                event.data.func(event);
            }
        }
    };
    var updateProblemsForm = function(/* object */ event){
        //Any future form event can be triggered
        //Might be used after adding user sharing
    };

    var hideForm = function(/* object */ event){
        console.log("inside hide Form");
        var id = '#' + event.data.id;
        if(event.data.hasOwnProperty("submit") && event.data.submit){
            event.data.func();
        }
    };

    var submitProblemsForm = function(){
        //In this case form has to be submitted asynchronously
        $.post('sites/all/modules/_custom/NC_models/static/nonClassupdates.php', $('#dragoon_ncCFolder_form').serialize())
            .success(function(){
                location.reload();
            });
    };

    $('.createFolderClass').click({
        id: "createFolderModal",
        update: true,
        func: updateProblemsForm,
        value: true,
        key: "p&pname"
    }, showForm);

    $('#create_nc_folder').click({
        id: "createFolderModal",
        submit: true,
        func: submitProblemsForm,
        formId: "dragoon_ncCFolder_form"
    }, hideForm);

});
