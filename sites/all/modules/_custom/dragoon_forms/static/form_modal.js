jQuery(document).ready(function($) {
    var showForm = function(/* object */ event){
        showOverlay();
    	var id = '#' + event.data.id;
    	if(event.data.hasOwnProperty("update") && event.data.update){
    		if(event.data.hasOwnProperty("value")){
    			/*data = {};
    			if(event.data.value.indexOf("&") >= 0){
    				keys = event.data.key.split("&");
    				values = event.data.value.split("&");
    			} else {
    				keys = [event.data.key];
    				values = [event.data.value];
    			}

    			var key;
    			var i = 0;
    			for(key in keys){
    				data[keys[key]] = values[i];
    				i++;
    			}*/
    			event.data.func(event);
    		}
    	}
    	$(id).show();
    };

    var hideForm = function(/* object */ event){
    	var id = '#' + event.data.id;
    	if(event.data.hasOwnProperty("submit") && event.data.submit){
    		event.data.func(event.data.formID);
    	}
        hideOverlay();
    	$(id).hide();
    };

    var submitProblemsForm = function(){
    	var form = document.forms['dragoon_problem_form'];
    	form.setAttribute("action", "/code/index.php");
    	form.setAttribute("target", "_blank");
    	form.setAttribute("method", "POST");
    	form.submit();
    };

    var updateProblemsForm = function(/* object */ event){
    	var form = document.forms['dragoon_problem_form'];
    	var key = event.data.key;
        var values = [$("#"+event.target.id).attr('value'), $("#" + event.target.id).attr('key')];
        var keys = [];
        if(key.indexOf("&") >= 0){
            keys = key.split("&");
        } else {
            keys = [event.data.key];
        }

        for(index in keys){
            form[keys[index]].value = values[index];
        }
    	//form.pname.value = "Rabbits";
    };

    var showOverlay = function(){
        if($("#overlay").length){
            $("#overlay").show();
        } else {
            var overlay = "<div id = 'overlay' class = 'overlay'></div>"
            $("body").append(overlay);
        }
    };

    var hideOverlay = function(){
        $("#overlay").hide();
    };

    $('.dragoon_problem').click({
    	id: "dragoon_problem_wrapper",
    	update: true,
    	func: updateProblemsForm,
    	value: true,
    	key: "p&pname"
    }, showForm);
    
    $('#close_button').click({id: "dragoon_problem_wrapper"}, hideForm);
    $('#submit_button').click({
        id: "dragoon_problem_wrapper",
    	submit: true,
    	func: submitProblemsForm
    }, hideForm);
});