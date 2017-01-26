<?php

	$result = DatabaseManager::selectValSQL('SELECT type, description, value, id_item FROM budget WHERE id_users = :s0', [$_SESSION['iduser']]);

	if(isset($result['type'])) $result = [$result];

	echo json_encode($result);