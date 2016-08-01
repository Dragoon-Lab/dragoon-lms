<?php
function problem_form($form, &$form_state){
	global $user;
	$name = 'anonymous';
	$rp = 'on';
	if($user->uid){
		$name = $user->name;
		$rp = false;
	}

	$form['pname'] = array(
		'#type' => 'textfield',
		'#title' => t('Problem'),
		'#disabled' => TRUE,
	);

	$form['m'] = array(
		'#type' => 'radios',
		'#options' => array(
			'AUTHOR&a=construction' => t('Author'),
			'COACHED&a=construction' => t('Construction - Feedback on everything'),
			'STUDENT&a=construction' => t('Construction - Feedback on entries and graphs'),
			'TEST&a=construction' => t('Construction - Feedback on graphs only'),
			'EDITOR&a=construction' => t('Construction - No feedback'),
			'STUDENT&a=execution' => t('Execution'),
			'STUDENT&a=executionDemo' => t('Demo of Execution'),
		),
		'#title' => t('Select a method to start Dragoon problem'),
		'#required' => TRUE,
		'#default_value' => 'COACHED&a=construction',
	);

	/*$form['m'] = array(
		'#type' => 'radios',
		'#options' => array(
			'AUTHOR' => t('Author'),
			'COACHED' => t('Coached (Maximum Feedback)'),
			'STUDENT' => t('Immediate Feedback'),
			'TEST' => t('Delayed Feedback'),
			'EDITOR' => t('No Feedback'),

		),
		'#title' => t('Select a mode: '),
		'#required' => TRUE,
		'#default_value' => 'COACHED',
        '#id' => 'openProbMode'
	);

	$form['a'] = array(
		'#type' => 'radios',
		'#options' => array(
			'construction' => t('Construction'),
			'execution' => t('Execution'),
			'executionDemo' => t('Demo of Execution'),
//			'incremental' => t('Incremental Analysis'),
//			'incrementalDemo' => t('Demo of Incremental Analysis'),
//			'waveform' => t('Waveform Selection'),
		),
		'#title' => t('Select an activity: '),
		'#required' => TRUE,
		'#default_value' => 'construction',
	);*/

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
