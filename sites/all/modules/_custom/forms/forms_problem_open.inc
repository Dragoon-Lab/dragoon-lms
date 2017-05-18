<?php
function problem_form($form, &$form_state){
	global $user;
	$name = 'anonymous';
	$rp = 'on';
	if($user->uid){
		$name = $user->name;
		$rp = 'off';
	}

	$form['pname'] = array(
		'#type' => 'textfield',
		'#title' => t('Problem'),
		'#disabled' => TRUE,
	);
	
	$form['m'] = array(
		'#type' => 'radios',
		'#options' => array(
			'STUDENT&a=executionDemo' => t('Step through running the model'),
			'STUDENT&a=execution' => t('Run the model manually'),
			'COACHED&a=construction' => t('Reconstruct the model - Feedback on everything'),
			'STUDENT&a=construction' => t('Reconstruct the model - Feedback on entries and graphs'),
			'TEST&a=construction' => t('Reconstruct the model - Feedback on graphs only'),
			'EDITOR&a=construction' => t('Reconstruct the model - No feedback'),
			'AUTHOR&a=construction' => t('Edit the model'),
		),
		'#title' => t('Select a method to start Dragoon problem'),
		'#required' => TRUE,
		'#default_value' => 'COACHED&a=construction',
	);

	$form['p'] = array(
		'#type' => 'hidden',
	);

	$form['sm'] = array(
		'#type' => 'hidden',
		'#value' => 'feedback',
	);

	$form['u'] = array(
		'#type' => 'hidden',
		'#value' => $name,
	);

	$form['is'] = array(
		'#type' => 'hidden',
		'#value' => 'algebraic',
	);

	$form['s'] = array(
		'#type' => 'hidden',
		'#value' => 'public-login',
	);

	$form['rp'] = array(
		'#type' => 'hidden',
		'#value' => $rp,
	);
	
	$form['submit_button'] = array(
		'#type' => 'submit',
		'#value' => t('Open Problem'),
		'#id' => 'submit_button',
	);

	return $form;
}
