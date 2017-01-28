<?php

class MainManager {

    public function __construct($request) {

        if( $request === 'welcome' ||
            $request === 'home') {

            require_once($request.'.interface.php');

        } 

        else if (   $request === 'checkLogIn' ||
                    $request === 'checkSignUp' ||
                    $request === 'selectBudget' ||
                    $request === 'saveBudget' ||
                    $request === 'deleteItem' ||
                    $request === 'selectUsername') {

            require_once($request.'.ajax.php');
        }

        else if (   $request === 'logout') {

            require_once($request.'.helper.php');
        }
    }
}