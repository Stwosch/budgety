<?php

	if(!isset($_POST['month']) || !isset($_POST['year'])) { MainManager::router(); }

	$result = DatabaseManager::selectValSQL('SELECT b.type, b.description, b.value, b.id_item FROM budget AS b INNER JOIN date AS d ON b.id_date = d.id_date WHERE b.id_users = :s0 && d.month = :s1 && d.year = :s2', 
	[$_SESSION['iduser'], $_POST['month'], $_POST['year']]);
	
	// We always want to return array of objects, so if we have only one object, we must put its into array
	if(isset($result['type'])) $result = [$result];

	echo json_encode($result);