<?php

	$result = DatabaseManager::selectValSQL('SELECT type, description, value, id_item FROM budget WHERE id_users = :s0', [$_SESSION['iduser']]);
	
	// We always want to return array of objects, so if we have only one object, we must put its into array
	if(isset($result['type'])) $result = [$result];

	echo json_encode($result);