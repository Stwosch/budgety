<?php

	if(!isset($_POST['username']) || !isset($_POST['password'])) { MainManager::router(); }


	$username = preg_replace('/\s+/', '', $_POST['username']);
	$password = preg_replace('/\s+/', '', $_POST['password']);

	if( !preg_match('/^[0-9a-zA-Z]{5,20}$/', $username) ||
		!preg_match('/^[0-9a-zA-Z]{5,20}$/', $password) ) {

		$return = ["value" => false];
        echo json_encode($return);
        exit();
	}

	$login = UserManager::LogIn($username, $password);

	if($login) {

		$return = ["value" => true];
        echo json_encode($return);
	} else {

		$return = ["value" => false];
        echo json_encode($return);
	}

	