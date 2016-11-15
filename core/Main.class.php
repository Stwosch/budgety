<?php

class Main {

    private $request;

    public function __construct($request) {
        
        $this->request = $request;

        switch($this->request) {

            case 'home':
                require_once($this->request.'.interface.php');
            break;
            
        }
    }
}