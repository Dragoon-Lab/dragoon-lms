<?php
function forms_nc_sharing($form, &$form_state){
    global $user;
    $name = 'anonymous';
    $rp = 'on';
    if($user->uid){
        $name = $user->name;
        $rp = 'off';
    }

    //call a function which returns all potential folders user model can be created in
    $user_folders = loadUserFolders($name);
    unset($user_folders[$name . "-private"]);
    $form['select_folder'] = array(
        //pump folder options including the user personal folder
        '#type' => 'select',
        '#options' => $user_folders,
        "#id" => 'folder_list'
    );

    $share_holders = loadShareHolders(current($user_folders),$name);
    $form['relevant_users'] = array(
        '#markup' => '<div class="sharedUsersList">
                        <header><b>Who has access</b></header>
                        <table id="shareHoldersList">
                        '.$share_holders.'
                        </table>
                    </div>',
    );
    $form['sh_user_name'] = array(
        '#prefix' => '<div class="row new_user_sharing_block"><div class="col-md-6"><header><b>Share Folder With New User</b></header>',
        '#type' => 'textfield',
        '#id' => 'share_user_name',
        '#title' => 'Enter email here',
        '#REQUIRED' => TRUE,
        '#suffix' => '</div><div class="col-md-6"><button id="shareAuser" class="btn btn-success">Share Folder</button></div></div>',
    );
    $form['sh_support_div'] = array(
        '#markup' => '<div id="user_list_display"></div>',
    );
    $form['req_type'] = array(
        "#type" => "hidden",
        "#value" => "Share folder"
    );
    $form['owner'] = array(
        "#type" => "hidden",
        "#value" => $name
    );
    $form['submit_button'] = array(
        '#type' => 'submit',
        '#value' => t('Done'),
    );

    return $form;
}
