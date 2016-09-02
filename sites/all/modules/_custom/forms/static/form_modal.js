jQuery(document).ready(function($) {
	var showForm = function(/* object */ event){
		var id = '#' + event.data.id;
        //hide the author mode radio and by default check student mode/immediate feedback mode
        $('input[type=radio]#edit-m-authoraconstruction').closest('div').hide();
        //by default check the student mode
        $('input[type=radio]#edit-m-coachedaconstruction').prop('checked',true);

        //model library problems should not have group "g" set, so remove the element from the form
        var form = document.forms['dragoon_problem_form'];
        if(form["g"] != undefined)
            form["g"].remove();
        //also make sure other fields like section are set to default values
        form["s"].value = "public-login";
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
		var date = Math.round(new Date().getTime()/1000);
		var form = document.forms['dragoon_problem_form'];
		if(form.u && form.u.value.indexOf("anon") >= 0)
			form.u.value = "anon-"+ date.toString();
		form.setAttribute("action", "https://dragoon.asu.edu/devel/index.php");
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

    $('.dragoon_nc_problem').click(function(){
        var form = document.forms['dragoon_problem_form'];
        var user = form["u"].value;
        var prob_name = $(this).text();
        if(prob_name != "No models"){
            var group_name = $(this).closest('.accordion').find('h2:first').text();
            console.log("gp name",group_name);
            if(group_name == "private")
                group_name = user+"-private";
            else{
                //group name might contain by keyword which indicates the actual owner
                //if there is no by key word user himself is the owner
                var group_owner = group_name.split('by');
                if(group_owner.length>1){
                    group_name = group_owner[0].trim()+"-"+group_owner[1].trim();
                }
                else{
                    group_name = group_name + "-" + user;
                }
            }
        }


        form["pname"].value = prob_name;
        form["p"].value = prob_name;
        form["s"].value = "non-class-models";
        $('input[type=radio]#edit-m-authoraconstruction').closest('div').show();
        // add "g" to the form as the public library models wont have a g in the form them selves, g indicates group
        //check if g is defined already and remove it from form before appending a new value
        if(form["g"] != undefined){
            form["g"].remove();
        }
        var hiddenGroupField = document.createElement("input");
        hiddenGroupField.setAttribute("type", "hidden");
        hiddenGroupField.setAttribute("name", "g");
        hiddenGroupField.setAttribute("value", group_name);
        form.appendChild(hiddenGroupField);


    });

    $('#submit_button').click({
		id: "dragoon_problem_wrapper",
		submit: true,
		func: submitProblemsForm
	}, hideForm);




});
