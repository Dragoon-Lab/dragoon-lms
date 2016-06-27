jQuery(document).ready(function($) {
    var showForm = function(/* object */ event){
        showOverlay();
    	var id = '#' + event.data.id;
    	if(event.data.hasOwnProperty("update") && event.data.update){
    		if(event.data.hasOwnProperty("value")){
    			data = {};
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
    				data[key] = values[i];
    				i++;
    			}
    			event.data.func(event.data);
    		}
    	}
    	$(id).show();
    };

    var hideForm = function(/* object */ event){
    	var id = '#' + event.data.id;
    	if(event.data.hasOwnProperty("submit") && event.data.submit){
    		event.data.func();
    	}
        hideOverlay();
    	$(id).hide();
    };

    var submitProblemsForm = function(){
    	var form = $("#dragoon_forms_problem_form");
    	form.attr("action", "/code/index.php");
    	form.attr("target", "_blank");
    	form.attr("method", "POST");
    	form.submit();
    };

    var updateProblemsForm = function(/* object */ data){
    	var form = $("#dragoon_forms_problem_form");
    	form.p = data.p;
    	form.pname = data.pname;
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
    	value: $(this).attr('value')+ '&' +$(this).attr('key'),
    	key: "p&pname"
    }, showForm);
    
    $('#close_button').click({id: "dragoon_problem_wrapper"}, hideForm);
    $('#submit_button').click({
    	submit: true,
    	func: submitProblemsForm
    }, hideForm);
});