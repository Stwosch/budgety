<?php

	$result = DatabaseManager::selectValSQL('SELECT type, description, value FROM budget WHERE id_users = :s0', [$_SESSION['iduser']]);
	echo json_encode($result);