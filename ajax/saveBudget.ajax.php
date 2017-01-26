<?php 

	if(!isset($_POST['type']) || !isset($_POST['description']) || !isset($_POST['value'])) {
		header("Location: welcome");
		exit;
	}

	$lastRecord = DatabaseManager::selectValSQL('SELECT id_item FROM budget WHERE id_users = :s0 ORDER BY id_item DESC LIMIT 1', [$_SESSION['iduser']]);
	
	if(!$lastRecord['id_item'] && $lastRecord['id_item'] !== 0) $lastRecord['id_item'] = 0; 
	
	$ID = $lastRecord['id_item'] + 1;
	
	$result = DatabaseManager::changeValSQL('INSERT INTO budget(type, description, value, id_item, id_users) VALUES (:s0, :s1, :s2, :s3, :s4)', [$_POST['type'], $_POST['description'], $_POST['value'], $ID, $_SESSION['iduser']]);

	$return = ["id" => $ID];
    echo json_encode($return);