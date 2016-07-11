<?php
function dragoon_forms_ncDelFolder_form($form, &$form_state){
	global $user;
	$user_name = 'anonymous';
	if($user->uid){
		$user_name = $user->name;
	}
    //load private and shared folders

    $json = loadNCModels($user_name,1);
    $data = json_decode($json, true);

    dragoon_forms_show_del_tree($data,$form, 'none');
    //following element separates out delete button
    $form['finish'] = array(
        '#markup' => '</div>'
    );

    $form['owner'] = array(
		'#type' => 'hidden',
        '#value' => $user_name,
        '#id' => "folder_owner"
	);
    $form['req_type'] = array(
        '#type' => 'hidden',
        '#value' => 'delete Folder',
    );
	$form['submit_button'] = array(
		'#type' => 'submit',
		'#value' => t('Delete Folder'),
		'#id' => 'delete_nc_folder',
	);

	return $form;
}

function dragoon_forms_ncDelFolder_form_validate($form, &$form_state){
	if($form_state['values']['folder_name']){
        form_set_error('folder_name', t('An event may not end before it starts.'));
	}
}

function dragoon_forms_show_del_tree($data, &$form, $parent){
    foreach ($data as $a => $b) {
        if (is_array($b)) {
            if (!($a == "private" || $a == "shared")) {
                $form['fo'.'-'.$a .'-'. uniqid()] = array(
                    '#prefix' => '<div class="accordion"><h2>',
                    '#type' => "checkbox",
                    '#title' => t($a),
                    '#suffix' => '</h2><div class="pane">',
                    '#tree' =>true
                );
            } else {
                $form[$a .'-'. uniqid()] = array(
                    '#prefix' => '<div class="accordion"><h2>',
                    '#markup' => t($a),
                    '#suffix' => '</h2><div class="pane">',
                    '#tree' =>true
                );
            }
            dragoon_forms_show_del_tree($b, $form,$a);
        } else {

            $ls = '';
            $las_elem = end($data);
            if ($las_elem == $b) {
                $ls = '</div></div>';
            }
            if(trim($a) !== trim("no data found ")) {
                $form['mo'.'-'.$a .'-'. uniqid().'-'.$parent] = array(
                    '#prefix' => '<p>',
                    '#type' => 'checkbox',
                    '#title' => t($a),
                    '#suffix' => '</p>' . $ls,
                    '#tree' =>true
                );
            }
            else{
                $form[$a .'-'. uniqid()] = array(
                    '#prefix' => '<p style="color: #de151f">',
                    '#markup' => 'No Models Present',
                    '#suffix' => '</p>' . $ls,
                    '#tree' =>true
                );
            }
        }

    }
}


