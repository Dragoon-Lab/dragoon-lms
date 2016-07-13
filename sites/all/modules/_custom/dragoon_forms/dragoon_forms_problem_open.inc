<?php
function dragoon_forms_problem_form($form, &$form_state){
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
			'AUTHOR' => t('Author'),
			'COACHED' => t('Coached (Maximum Feedback)'),
			'STUDENT' => t('Immediate Feedback'),
			'TEST' => t('Delayed Feedback'),
			'EDITOR' => t('No Feedback'),
		),
		'#title' => t('Select a mode: '),
		'#required' => TRUE,
		'#default_value' => 'STUDENT',
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

function dragoon_forms_problem_form_validate($form, &$form_state){
	if($form_state['values']['m'] == ""){
        form_set_error('m',t('mode can not be emplty'));
	}
}

