<?php
    $request_type = $_REQUEST["req_type"];
    takeAction($request_type);
    //All take actions require a working db connection
    function takeAction($case=" "){
        $mysqli = new mysqli("localhost", "root", "", "Dragoon-Lms");
            if ($mysqli->connect_errno) {
                printf("Connect failed: %s\n", $mysqli->connect_error);
                exit();
            }
        switch ($case) {

            case "create Folder":
                $owner = $_REQUEST["owner"];
                $folder = $_REQUEST["folder_name"];
                $type=0;
                $folder_id = $folder."-".$owner;
                $folder_class_id = $_REQUEST["class-id"];
                $current_status = 1;
                if($type=="private")
                    $current_status = 0;
                $query = "insert into folders(folder_id,folder_name,owner,folder_type,folder_class_id,current_status) VALUES ('$folder_id','$folder','$owner',$type,'$folder_class_id','$current_status')";
                //run the query
                $q_res = $mysqli->query($query);
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
                    $query1 = "delete from folders where folder_id='$folder_id'";
                    //delete from shared_members
                    $q_res1 = $mysqli->query($query1);

                    $query2 = "delete from shared_members where folder_id='$folder_id'";
                    $q_res2 = $mysqli->query($query2);

                    //run both queries

                    //connect to dragoon
                    //run query which marks all sessions consisting of group = folder_id as deleted
                    //run query which marks all sessions where problem name is model id and group = folder_id as deleted

                }

                //models and folder deletion from dragoon
                deleteModels($del_models,$del_folders);

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

