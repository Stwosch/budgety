<?php

    if (!isset($_POST['data'])) { MainManager::router(); }

   $result =  DatabaseManager::selectValSQL('SELECT name, month, year FROM date WHERE id_users = :s0', [$_SESSION['iduser']]);

   // We always want to return array of objects, so if we have only one object, we must put its into array
    if(isset($result['month'])) $result = [$result];

    echo json_encode($result);