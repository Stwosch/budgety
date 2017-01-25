<?php 

	if(!isset($_POST['type']) || !isset($_POST['description']) || !isset($_POST['value'])) {
		header("Location: welcome");
		exit;
	}

	$result = DatabaseManager::changeValSQL('INSERT INTO budget(type, description, value, id_users) VALUES (:s0, :s1, :s2, :s3)', [$_POST['type'], $_POST['description'], $_POST['value'], $_SESSION['iduser']]);

	echo $result? 'true':'false';