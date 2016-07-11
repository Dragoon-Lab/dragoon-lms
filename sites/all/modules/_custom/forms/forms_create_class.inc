<?php
function create_class_form($form, &$form_state){
	$form['class_name'] = array(
		'#type' => 'textfield',
		'#title' => t('Class Name'),
		'#description' => t('Enter name of the class, try to keep it unique by entering year or other distinguishing text'),
		'#required' => TRUE,
	);

	$form['submit_button'] = array(
		'#type' => 'submit',
		'#value' => 'Create Class',
		'#submit' => array('create_class_form_submit'),
	);

	return $form;
}

function create_class_form_submit($form, &$form_state){
	global $user;
	$code = create_class_code();
	db_insert('classes')
		-> fields(array(
			'created_by' => $user->uid,
			'code' => $code,
			'name' => $form_state['values']['class_name'],
			'section' => create_class_section($form_state['values']['class_name']),
			'is_active' => TRUE,
			'time' => now(),
		))->execute();
	drupal_set_message(t("Your class has been successfully created. The class code is ".$code));
	$block = module_invoke('classes', 'classes_block_view', 'classes_created');
	print render($block['content']);
}

function create_class_code(){
	$seed = &drupal_static('create_class_seed');
	$size = 6;
	$code = '';
	$characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
	for($index = 0; $index < $size; $index++){
		$seed = round(srand($seed)*4294967296); // this number is 2^32
		$code .= substr($characters, round(srand($seed)*52+1), 1);
	}

	return $code;
}

function create_class_seed(){
	$seed = &drupal_static(__FUNCTION__);
	if(!isset($seed)){
		$seed = 1;
	}

	return $seed++;
}

function create_class_section($name){
	return str_replace(" ", "", $name);
}
