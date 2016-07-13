jQuery(document).ready(function($) {


    var hideForm = function(/* object */ event){
        console.log("hide form");
        var id = '#' + event.data.id;
        if(event.data.hasOwnProperty("submit") && event.data.submit){
            event.data.func(event.data.formID);
        }
    };

    var submitCreateProblemsForm = function(){
        console.log("trying to submit form",$('#dragoon_ncCModel_form').serialize());
        var form = document.forms['dragoon_ncCModel_form'];
        form.setAttribute("action", "https://dragoon.asu.edu/devel/index.php");
        form.setAttribute("target", "_blank");
        form.setAttribute("method", "POST");
        form.submit();
    };

    $('#create_nc_model').click({
        id: "createModelModal",
        submit: true,
        func: submitCreateProblemsForm,
        formId: "dragoon_ncCModel_form"
    }, hideForm);
});
