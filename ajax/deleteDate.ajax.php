<?php

    if(!isset($_POST['values'])) { MainManager::router(); }

    // Merge all values into one string
    $string = "";
    $i = 1;
    foreach($_POST['values'] as $value) {
        $string .= ' :s' . $i . ',';
        $i++;
    }
    $string = substr($string, 0, -1);


    // Flatten array
    function flatten($array) {
        $return = array();
        while(count($array)) {
            $value = array_shift($array);
            if(is_array($value))
                foreach($value as $sub)
                    $array[] = $sub;
            else
                $return[] = $value;
        }
        return $return;
    }

    $arr = flatten([$_SESSION['iduser'], $_POST['values']]);

    // Create sql query
    $sqlBudget = 'DELETE FROM budget WHERE id_users = :s0 && id_date IN (' . $string . ')';
    $sqlDate = 'DELETE FROM date WHERE id_users = :s0 && id_date IN (' . $string . ')';

    // Delete associated records in budget table
    DatabaseManager::changeValSQL($sqlBudget, $arr);

    //Delete dates 
    DatabaseManager::changeValSQL($sqlDate, $arr);

    echo json_encode(['value' => 'returned']);