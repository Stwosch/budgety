<?php 
	
	if(!isset($_POST['id'])) {
		header("Location: welcome");
		exit;
	}

	DatabaseManager::changeValSQL('DELETE FROM budget WHERE id_item = :s0 AND id_users = :s1', [$_POST['id'], $_SESSION['iduser']]);

	$return = ["val" => true];
    echo json_encode($return);