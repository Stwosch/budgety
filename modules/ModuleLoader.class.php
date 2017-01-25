<?php

class ModuleLoader {
    
    static public function load($module) {

    	require_once($module.'.module.php');
    }
}
