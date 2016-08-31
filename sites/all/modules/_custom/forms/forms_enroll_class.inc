<?php

function enroll_class_form($form, &$form_state){
	$form['class_code'] = array(
		'#type' => 'textfield',
		'#title' => t('Class Code'),
		'#description' => t('Please enter the class code sent by your teacher.'),
		'#required' => TRUE,
		'#maxlength' => 6,
	);

	$form['enroll_button'] = array(
		'#type' => 'submit',
		'#value' => 'Enroll',
		'#submit' => array('enroll_class_form_submit'),
	);

	return $form;
}

function enroll_class_form_validate($form, &$form_state){
	if($form_state['values']['class_code'] != ''){
		$results = db_query('SELECT name FROM {classes} WHERE code = :code', array(":code" => $form_state['values']['class_code']));
		if($results->rowCount() == 0){
			form_set_error('class_code', t('No class could be found with this code.'));
		} else {
			global $user;
			$query = "SELECT ueid FROM {enrolled_users} WHERE code = :code AND uid = :uid";
			$args = array(
				':code' => $form_state['values']['class_code'],
				':uid' => $user->uid
			);
			$result = db_query($query, $args);
			if($result->rowCount() > 0){
				form_set_error('class_code', t('Can not enroll you in this class as you are already enrolled.'));
			}
		}
	}
}

function enroll_class_form_submit($form, &$form_state){
	global $user;
	db_insert('enrolled_users')
		->fields(array(
			'uid' => $user->uid,
			'code' => $form_state['values']['class_code'],
		))->execute();

	drupal_set_message("You have been enrolled in the class");

	$block = module_invoke('classes', 'classes_block_view', 'enrolled_classes');
	print drupal_render($block['content']);
}
