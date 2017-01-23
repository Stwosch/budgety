<?php

class ModuleLoader {
    
    static public function load($module) {

        switch($module) {

            case 'home':
                require_once('offlineSite.php');
            break;

            default:
                echo 'Wrong module name';
            break;
        }
    }
}