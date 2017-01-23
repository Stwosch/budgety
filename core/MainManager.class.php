<?php

class MainManager {

    private $request;

    public function __construct($request) {
        
        $this->request = $request;

        switch($this->request) {

            case 'home':
                require_once($this->request.'.interface.php');
            break;
            
            case 'checkLogIn':
            	require_once($this->request.'.ajax.php');
            break;

            case 'checkSignUp':
            	require_once($this->request.'.ajax.php');
            break;
        }
    }
}