<?php
    
    if(!isset($_POST['sending'])) { MainManager::router(); }
    
    $return = DatabaseManager::selectValSQL('SELECT b.type, b.value, d.id_date, d.name, d.month, d.year FROM budget AS b RIGHT JOIN date AS d ON b.id_date = d.id_date WHERE d.id_users = :s0', [$_SESSION['iduser']]);

    if(isset($return['name'])) $return = [$return];

    echo json_encode($return);