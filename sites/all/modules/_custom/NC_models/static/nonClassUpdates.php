<?php
    $request_type = $_REQUEST["req_type"];
    //All take actions require a working db connection


 takeAction($request_type);

function takeAction($case=" "){
    $mysqli = new mysqli("localhost", "root", "", "Dragoon-Lms");
    if ($mysqli->connect_errno) {
        printf("Connect failed: %s\n", $mysqli->connect_error);
        exit();
    }
    switch ($case) {

        case "create Folder":
            $owner = $_REQUEST["owner"];
            $folder = $_REQUEST["newf"];
            $type=0;
            $folder_id = $folder."-".$owner;
            $folder_class_id = "000";
            $current_status=1;
            if($type=="private")
                $current_status = 0;
            $query = "insert into folders(folder_id,folder_name,owner,folder_type,folder_class_id,current_status) VALUES ('$folder_id','$folder','$owner',$type,'$folder_class_id','$current_status')";
            //return $query;
            $q_res = $mysqli->query($query);
            break;

    }
}