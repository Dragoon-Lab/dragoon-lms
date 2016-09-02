jQuery(document).ready(function($) {
	$('.copy-to-clipboard').click(function(event){
		var id = "#"+event.target.id;

		var codeCopied = copyToClipboard(id);
		if(codeCopied == "successful"){
			alert("Class Join Code has been copied to your clipboard");
		}
	});

	/*
	 * takes the id of the field and copies the text in inner html for the to clipboard
	 * parameters:
	 * 			 id - id of the field whose inner html has to be copied
	 * 			 returns - "successful" if the string was copied correctly or 
	 *					  "unsuccessful" if the string was not copied.
	*/
	var copyToClipboard = function(id){
		var string = $(id).html();
		var ta = document.createElement('textarea');
		ta.value = string;
		ta.style.display = 'none';
		ta.style.width = '2em';
		ta.style.height = '2em';
		document.body.appendChild(ta);

		alert(string);
		ta.select();
		var msg;
		try{
			if(document.queryCommandEnabled('copy')){
				var successful = document.execCommand('copy');
				msg = successful ? "successful" : "unsuccessful";
			} else {
				alert("Copy to clipboard is not allowed from your browser.");
				msg = "unsuccessful";
			}
		} catch(err){
			console.log(err);
		}

		document.body.removeChild(ta);
		return msg;
	}
});
