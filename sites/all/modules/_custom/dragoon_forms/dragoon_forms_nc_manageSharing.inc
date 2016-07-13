<?php
function dragoon_forms_nc_sharing($form, &$form_state){
    global $user;
    $name = 'anonymous';
    $rp = 'on';
    if($user->uid){
        $name = $user->name;
        $rp = 'off';
    }

    //call a function which returns all potential folders user model can be created in
    $user_folders = loadUserFolders($name);

    $form['select_folder'] = array(
        //pump folder options including the user personal folder
        '#type' => 'select',
        '#options' => $user_folders
    );

    $form['sh_user_name'] = array(
        '#type' => 'textfield',
        '#id' => 'share_user_name',
        '#title' => t('Enter username or email'),
        '#REQUIRED' => TRUE,
    );
    $form['sh_support_div'] = array(
        '#markup' => '<div id="user_list_display"></div>',
    );
    $form['req_type'] = array(
        "#type" => "hidden",
        "#value" => "Share Folder"
    );
    $form['owner'] = array(
        "#type" => "hidden",
        "#value" => $name
    );

    $form['submit_button'] = array(
        '#type' => 'submit',
        '#value' => t('Share Model'),
        '#id' => 'share_nc_model',
    );

    return $form;
}