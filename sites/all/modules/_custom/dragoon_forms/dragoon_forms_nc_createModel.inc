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

    $form['p'] = array(
        '#type' => 'textfield',
        '#title' => t('Problem'),
        '#required' => TRUE,
        '#maxlength' => 50,
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

    $form['g'] = array(
        '#type' => 'hidden',
        '#value' => $name."-private",
    );

    $form['rp'] = array(
        '#type' => 'hidden',
        '#value' => $rp,
    );

    $form['sm'] = array(
        '#type' => 'hidden',
        '#value' => 'feedback',
    );
    $form['c'] = array(
        '#type' => 'hidden',
        '#value' => 'continue',
    );

    $form['is'] = array(
        '#type' => 'hidden',
        '#value' => 'algebraic',
    );
    $form['submit_button'] = array(
        '#type' => 'submit',
        '#value' => t('Create Model'),
        '#id' => 'create_nc_model',
    );
    $form['#validate'] = array('dragoon_forms_ncCModel_form_validate');


    return $form;
}

function dragoon_forms_ncCModel_form_validate($form, &$form_state){
    $modelName = $form_state["values"]["p"];
    if($modelName == ''){
        form_set_error("p",t("Model name cannot be empty"));
    }
    else{
        form_set_error("p",t('No error'));
    }

}