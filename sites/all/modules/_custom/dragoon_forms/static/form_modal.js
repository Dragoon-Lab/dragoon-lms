jQuery(document).ready(function($) {
	var showForm = function(/* object */ event){
		var id = '#' + event.data.id;
		if(event.data.hasOwnProperty("update") && event.data.update == true){
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
		form.setAttribute("action", "https://dragoon.asu.edu/devel/index.php");
		form.setAttribute("target", "_blank");
		form.setAttribute("method", "POST");
		console.log(form);
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

    $('.dragoon_nc_problem').click(function(){
        var form = document.forms['dragoon_problem_form'];
        var user = form["u"].value;
        var prob_name = $(this).text();
        if(prob_name != "no data found"){
            var group_name = $(this).parent().parent().parent().find('.current').text();
            if(group_name == "private")
                group_name = user+"-private";
            else
                group_name = group_name + "-" + user;
        }


        form["pname"].value = prob_name;
        form["p"].value = prob_name;
        form["s"].value = "non-class-models";
        // add "g" to the form as the public library models wont have a g in the form them selves, g indicates group
        var hiddenGroupField = document.createElement("input");
        hiddenGroupField.setAttribute("type", "hidden");
        hiddenGroupField.setAttribute("name", "g");
        hiddenGroupField.setAttribute("value", group_name);
        form.appendChild(hiddenGroupField);
        //console.log("problem name set",for());
    });

    $('#submit_button').click({
		id: "dragoon_problem_wrapper",
		submit: true,
		func: submitProblemsForm
	}, hideForm);




});
