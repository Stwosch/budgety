<?php

    if(!isset($_POST['name']) || !isset($_POST['month']) || !isset($_POST['year'])) { MainManager::router(); }

    $test = DatabaseManager::selectValSQL('SELECT * FROM date WHERE month = :s0 && year = :s1 && id_users = :s2', [$_POST['month'], $_POST['year'], $_SESSION['iduser']]);

    if($test) {
        echo json_encode(["value" => "exists"]);
        exit();
    }

    $result = DatabaseManager::changeValSQL('INSERT INTO date (name, month, year, id_users) VALUES (:s0, :s1, :s2, :s3)', [$_POST['name'], $_POST['month'], $_POST['year'], $_SESSION['iduser']]);

    echo json_encode($result);