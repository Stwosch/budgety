<?php

    if(!isset($_POST['value'])) {
        header("Location: welcome");
        exit();
    }

    $return = DatabaseManager::selectValSQL('SELECT b.type, b.value, d.name, d.month, d.year FROM budget AS b RIGHT JOIN date AS d ON b.id_date = d.id_date WHERE d.id_users = :s0', [$_SESSION['iduser']]);

    echo json_encode($return);