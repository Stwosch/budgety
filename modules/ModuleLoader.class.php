<?php

class ModuleLoader {
    
    static public function load($module) {

        switch($module) {

            case 'home':
                
            break;

            default:
                echo 'Wrong module name';
            break;
        }
    }
}