<?php 
	
	if(!isset($_POST['type']) || !isset($_POST['description']) || !isset($_POST['value']) || !isset($_POST['month']) || !isset($_POST['year'])) {
		header("Location: welcome");
		exit;
	}
	
	// 1. Get last id to proper assign id
	$lastRecord = DatabaseManager::selectValSQL('SELECT id_item FROM budget WHERE id_users = :s0 ORDER BY id_item DESC LIMIT 1', [$_SESSION['iduser']]);
	
	if(!$lastRecord['id_item'] && $lastRecord['id_item'] !== 0) $lastRecord['id_item'] = 0; 
	
	$idItem = $lastRecord['id_item'] + 1;

	// 2. Get proper id of date for foregin key value in budget table

	$idDate = DatabaseManager::selectValSQL('SELECT id_date FROM date WHERE month = :s0 && year = :s1 && id_users = :s2', [$_POST['month'], $_POST['year'], $_SESSION['iduser']]);
	$idDate = $idDate['id_date'];
	
	$result = DatabaseManager::changeValSQL('INSERT INTO budget(type, description, value, id_item, id_users, id_date) VALUES (:s0, :s1, :s2, :s3, :s4, :s5)', [$_POST['type'], $_POST['description'], $_POST['value'], $idItem, $_SESSION['iduser'], $idDate]);

	$return = ["id_item" => $idItem];
    echo json_encode($return);