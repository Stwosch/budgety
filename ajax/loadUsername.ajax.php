<?php

    if(!isset($_POST['sending'])) { MainManager::router(); }
    
    $result = DatabaseManager::selectValSQL('SELECT username FROM users WHERE id_users = :s0', [$_SESSION['iduser']]);

    echo json_encode($result);