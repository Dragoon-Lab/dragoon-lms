<?php
/**
 * Created by PhpStorm.
 * User: RiteshSamala
 * Date: 6/29/16
 * Time: 4:07 PM
 */

$mysqli = new mysqli("localhost", "root", "", "Dragoon-Lms");
if ($mysqli->connect_errno) {
    printf("Connect failed: %s\n", $mysqli->connect_error);
    exit();
}
//private unshared folders

$query = "select name,init from users";
//return $query;
$q_res = $mysqli->query($query);
$string = array();

while($res=$q_res->fetch_object()){
    array_push($string,$res->name."-".$res->init);
}

echo json_encode($string);