<?php
function dragoon_forms_ncCFolder_form($form, &$form_state){
	global $user;
	$user_name = 'anonymous';
	if($user->uid){
		$user_name = $user->name;
	}

	$form['folder_name'] = array(
		'#type' => 'textfield',
		'#title' => t('New Folder Name'),
        '#required' => TRUE,
	);

    $form['shared_with'] = array(
        '#type' => 'textfield',
        '#title' => t('Share with'),
        '#default_value' => '',
    );

	$form['owner'] = array(
		'#type' => 'hidden',
        '#value' => $user_name,
	);

    $form['class-id'] = array(
        '#type' => 'hidden',
        '#value' => '0000',
    );

	$form['req_type'] = array(
		'#type' => 'hidden',
		'#value' => 'create Folder',
	);

	$form['submit_button'] = array(
		'#type' => 'submit',
		'#value' => t('Create Folder'),
		'#id' => 'create_nc_folder',
	);

	return $form;
}

function dragoon_forms_ncCFolder_form_validate($form, &$form_state){
	if($form_state['values']['folder_name']){
        form_set_error('folder_name', t('An event may not end before it starts.'));
	}
}

