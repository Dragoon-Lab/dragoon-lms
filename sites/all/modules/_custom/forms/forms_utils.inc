<?php

function get_code($size = 4){
	$seed = &drupal_static('get_seed');
	//$size = 4;
	$code = '';
	$characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
	srand(time());
	for($index = 0; $index < $size; $index++){
		$code .= substr($characters, rand()%62, 1); 
	}

	return $code;
}

function get_seed(){
	$seed = &drupal_static(__FUNCTION__);
	if(!isset($seed)){
		$seed = 1;
	}

	return $seed++;
}
