jQuery(document).ready(function($) {
	var showForm = function(/* object */ event){
		var id = '#' + event.data.id;
		if(event.data.hasOwnProperty("update") && event.data.update){
			if(event.data.hasOwnProperty("value")){
				event.data.func(event);
			}
		}
	};

	var hideForm = function(/* object */ event){
		var id = '#' + event.data.id;
		if(event.data.hasOwnProperty("submit") && event.data.submit){
			event.data.func(event.data.formID);
		}
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

	$('.dragoon_problem').click({
		id: "dragoon_problem_wrapper",
		update: true,
		func: updateProblemsForm,
		value: true,
		key: "p&pname"
	}, showForm);

	$('#submit_button').click({
		id: "dragoon_problem_wrapper",
		submit: true,
		func: submitProblemsForm
	}, hideForm);
});
