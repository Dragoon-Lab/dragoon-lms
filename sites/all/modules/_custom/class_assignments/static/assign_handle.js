/**
 * Created by RiteshSamala on 9/12/16.
 */
jQuery(document).ready(function($) {
    var action = $('#cardReader').text();
    var form = document.forms['nonAuthData'];
    form.setAttribute("action", "http://localhost/Laitsv3/www/index.php");
    form.setAttribute("target", "_blank");
    form.setAttribute("method", "POST");
    if(action == "nonAuthor"){
        console.log(form);
        form.submit();
    }
    else if(action == "Author"){
        $('#messageReader').html('creating Assignment...');
        $('#userOpenAuthorProb').modal('show');
        //Open a modal to take user destination folder where he wants to author his assignment
        //which is reflected in the group the model has to be saved

    }
    $('#openAuthorAssign').on("click",function(){
        console.log($('#authorDest').val());
        form["g"].value = $('select[name=authorAssignSave]').val()
        console.log(form);
        form.submit();
    });

    $('#messageReader').html('Your problem has been opened in new tab. If no new tab appeared, disable popup blocking for this website and try again. To open the problem again, refresh this page or visit the link again.');
});