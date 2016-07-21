<?php
define('DRUPAL_ROOT', '/Applications/XAMPP/htdocs/dragoon-lms');
require_once DRUPAL_ROOT . '/includes/bootstrap.inc';
drupal_bootstrap(DRUPAL_BOOTSTRAP_FULL);

    $request_type = $_REQUEST["req_type"];
    takeAction($request_type);
    //All take actions require a working db connection
    function takeAction($case=" "){

        switch ($case) {
            case "create Folder":
                $owner = $_REQUEST["owner"];
                $folder = $_REQUEST["folder_name"];
                //indicates whether the folder is a non class folder or a class related folder
                //type 0 indicates a non class folder
                $type=0;
                $folder_id = $folder."-".$owner;
                $folder_class_id = $_REQUEST["class-id"];
                //current status indicates if the folder is shared or not, for private
                $current_status = $_REQUEST["sharing_status"];
                $q_res = $query=db_insert('folders')
                ->fields(array(
                    'folder_id' => ''.$folder_id,
                    'folder_name' => ''.$folder,
                    'owner' => ''.$owner,
                    'folder_type' => ''.$type,
                    'folder_class_id' => ''.$folder_class_id,
                    'current_status' => ''.$current_status,
                ))->execute();
                return $q_res;
                break;
            case "delete Folder":
                $owner = $_REQUEST["owner"];
                $del_folders =[];
                if(isset($_REQUEST["folders"])){
                    $del_folders = $_REQUEST["folders"];
                }
                $del_models = [];
                if(isset($_REQUEST["models"])){
                    $del_models = $_REQUEST["models"];
                }
                //folder deletion
                foreach($del_folders as $folder_id){
                    //delete from folders table
                    $query1 = db_delete('folders')
                        ->condition('folder_id',$folder_id)
                        ->execute();
                    //$query1 = "delete from folders where folder_id='$folder_id'";
                    //delete from shared_members
                    $query2 = db_delete('shared_members')
                        ->condition('folder_id',$folder_id)
                        ->execute();
                    //$query2 = "delete from shared_members where folder_id='$folder_id'";
                    //$q_res2 = $mysqli->query($query2);

                    //run both queries

                    //connect to dragoon
                    //run query which marks all sessions consisting of group = folder_id as deleted
                    //run query which marks all sessions where problem name is model id and group = folder_id as deleted

                }

                //models and folder deletion from dragoon
                deleteModels($del_models,$del_folders);

                break;
            case "Share Folder":
                $owner = $_REQUEST["owner"];
                $folder = $_REQUEST["select_folder"];
                $user_list = $_REQUEST["sh_user_name"];

                //all inserts go into shared members table
                //owner has to be given sharing member_relation 1

                $owner_q=db_insert('shared_members')
                    ->fields(array(
                        "member_name" => $owner,
                        "folder_id" => $folder,
                        "member_relation" => 1
                    ))->execute();
                //$owner_q = "insert into shared_members(member_name,folder_id,member_relation) values('$owner','$folder',1)";
                //$owner_q_res = $mysqli->query($owner_q);

                //member queries
                $users = explode("+",$user_list);
                foreach($users as $member){
                    $user_name = explode(",",$member);
                    $user_name = $user_name[0];
                    $mem_q = db_insert('shared_members')
                        ->fields(array(
                            "member_name" => $user_name,
                            "folder_id" => $folder,
                            "member_relation" => 0
                        ))->execute();
                    //$mem_q= "insert into shared_members(member_name,folder_id,member_relation) values('$user_name','$folder',0)";
                }
                break;

            case "check Folder":
                $folder_id = $_REQUEST['folder_id'];
                $check_q = "select * from folders where folder_id='$folder_id'";
                $check_q_res = $mysqli->query($check_q);
                $row_count = $check_q_res->num_rows;
                if($row_count>0)
                    echo "already exists";
                else
                    echo 1;
                break;
        }
    }

    function deleteModels($del_models,$del_folders){
        $url = 'http://localhost/LaitsV3/www/global.php';
        $data = array('t' => 'deleteNonClassProblems', 'dm' => $del_models, 'df' => $del_folders);
        $options = array(
            'http' => array(
                'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
                'method'  => 'POST',
                'content' => http_build_query($data)
            )
        );
        $context  = stream_context_create($options);
        $result = file_get_contents($url, false, $context);
        if ($result === FALSE) { /* Handle error */
            echo "something failed";
        }
        print_r($del_folders);
        print_r($del_models);
    }

