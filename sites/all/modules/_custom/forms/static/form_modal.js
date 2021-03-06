jQuery(document).ready(function($) {

	//'should_check_share' variable controls whether last second check should be performed whether the user is allowed
	//to open specific problem, it has to be false in case of public models, private models but true in case of 
	//shared models by other users
	var should_check_share = false;

	var showForm = function(/* object */ event){
		var id = '#' + event.data.id;
		should_check_share = false;
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
		var form = document.forms['dragoon_problem_form'];
		//before submission we need to perform a final sharing check just in case user has been disabled sharing after he has opened the dialog
		console.log(should_check_share," should");
		if(!should_check_share){
			doSubmit();
		}
		else{
			$.when(checkSharing(form["g"].value,form["u"].value)).done(function(share_check){
				//console.log(typeof share_check, share_check);
				if(share_check == '0'){
					console.log("indicate lack of sharing");
					$('#alertDisabledSharing').modal('show');
					return;
				} 
				doSubmit();
			});
		}
	};

	var doSubmit = function(){
		var form = document.forms['dragoon_problem_form'];
		var date = Math.round(new Date().getTime()/1000);

		if(sessionStorage.user){
			form.u.value = sessionStorage.user;
		}
		else{
			if(form.u && form.u.value.indexOf("anon") >= 0){
				sessionStorage.user = "anon-"+ date.toString();
				form.u.value = sessionStorage.user;
				}
		}
		form.setAttribute("action", $("#dragoon_url").val()+"index.php");
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

	var checkSharing = function(folder_id,user){
		return $.ajax({
			type: "POST",
			url: "sites/all/modules/_custom/NC_models/static/nonClassUpdates.php",
			data: {'folder_id': folder_id, 'req_type': 'checkSharing', 'user': user},
			success: function (data) {
				console.log("success");
			},
			error: function (data) {
				console.log("fail");
			}
		});
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
			if(group_name == "private"){
				group_name = user+"-private";
				should_check_share = false;
			}
			else{
				//group name might contain by keyword which indicates the actual owner
				//if there is no by key word user himself is the owner
				
				var local_shared_store = $('#local_shared_store').val();
				//console.log("lss",local_shared_store);
				var local_shared_arr = local_shared_store.split("&");
				console.log(local_shared_arr);
				var get_group_owner = [];
				local_shared_arr.forEach(function(local_grp){
					//console.log(local_grp);
					if(local_grp!=""){
						console.log(local_grp);
						var local_grp_ar = local_grp.split("=");
						get_group_owner[local_grp_ar[0].trim()] = local_grp_ar[1].trim();
					}
				});
				
				if(get_group_owner[group_name] !== undefined)
					group_name = get_group_owner[group_name].trim();
				else
					group_name = group_name + "-" + user;
				//console.log(group_name,our_ans);
				var owner = group_name.split("-");
				if(owner[1] == user)
					should_check_share = false;
				else
					should_check_share = true;
			}
		}
		form["pname"].value = prob_name.trim();
		form["p"].value = prob_name.trim();
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