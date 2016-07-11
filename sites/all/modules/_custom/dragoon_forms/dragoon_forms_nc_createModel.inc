<?php
function dragoon_forms_ncCModel_form($form, &$form_state){
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

    $form['pname'] = array(
        '#type' => 'textfield',
        '#title' => t('Problem'),
        '#REQUIRED' => TRUE,
    );

    $form['m'] = array(
        '#type' => 'hidden',
        '#value' => 'AUTHOR'
    );

    $form['a'] = array(
        '#type' => 'hidden',
        '#value' => 'construction'
    );

    $form['u'] = array(
        '#type' => 'hidden',
        '#value' => $name,
    );

    $form['s'] = array(
        '#type' => 'hidden',
        '#value' => $name."-private",
    );

    $form['rp'] = array(
        '#type' => 'hidden',
        '#value' => $rp,
    );

    $form['submit_button'] = array(
        '#type' => 'submit',
        '#value' => t('Create Model'),
        '#id' => 'create_nc_model',
    );

    return $form;
}