<?php
function forms_nc_delete_folder_form($form, &$form_state){
	global $user;
	$user_name = 'anonymous';
	if($user->uid){
		$user_name = $user->name;
	}
    //load private and shared folders

    $json = loadNCModels($user_name,0);
    $data = json_decode($json, true);
    forms_show_del_tree($data,$form, 'none', true);

    //following element separates out delete button
    if(isset($data["Shared With Me"])){
        $form['finish'] = array(
            '#markup' => '</div>'
        );
    }
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
		'#value' => t('Delete folder'),
		'#id' => 'delete_nc_folder',
	);

    $form['cancel_button'] = array(
        '#type' => 'button',
        '#value' => t('Cancel'),
    );

	return $form;
}


function forms_show_del_tree($data, &$form, $parent, $showFolders){
    foreach ($data as $a => $b) {
        
        if (is_array($b)) {
            if (!($a == "private" || $a == "Shared With Me" || $a == "Shared By Me")) {
                $form['fo'.'-'.$a .'-'. uniqid()] = array(
                    '#prefix' => '<div class="accordion"><h2>',
                    '#type' => "checkbox",
                    '#title' => t($a),
                    '#suffix' => '</h2><div class="pane">',
                    '#tree' =>true
                );
            } else {
                if($a == "Shared With Me"){
                    $showFolders = false;
                }else{
                    $showFolders = true;
                }
                $form[$a .'-'. uniqid()] = array(
                    '#prefix' => '<div class="accordion"><h2 data-folder="'.$a.'">',
                    '#markup' => t($a),
                    '#suffix' => '</h2><div class="pane">',
                    '#tree' => true
                );
            }
            forms_show_del_tree($b, $form,$a,$showFolders);
            if (!($a == "private" || $a == "Shared With Me" || $a == "Shared By Me")) {
                $form['fo'.'-'.$a .'-'. uniqid()] = array(
                    '#suffix' => '</div></div>'
                );
            } else {
                $form[$a .'-'. uniqid()] = array(
                    '#suffix' => '</div></div>'
                );
            }
        } else {
            
            if($showFolders){
                if(trim($a) !== trim("No models ")) {
                    $form['mo'.'-'.$a .'-'. uniqid().'-'.$parent] = array(
                        '#prefix' => '<p>',
                        '#type' => 'checkbox',
                        '#title' => t($a),
                        '#suffix' => '</p>',
                        '#tree' =>true
                    );
                }
                else{
                    $form[$a .'-'. uniqid()] = array(
                        '#prefix' => '<p style="color: #de151f">',
                        '#markup' => 'No Models Present',
                        '#suffix' => '</p>',
                        '#tree' =>true
                    );

                }
            }else{
                $form[$a .'-'. uniqid()] = array(
                        '#prefix' => '<p style="color: #de151f">',
                        '#markup' => 'Only the owner can delete shared models. Delete this folder if you want to stop sharing it.',
                        '#suffix' => '</p>',
                        '#tree' =>true
                    );
                break;
            }
        }
    }
}


