<?php

class MainManager {

    public function __construct($request) {

        switch($request) {

            case 'welcome': 
            case 'home': require_once($request.'.interface.php'); break;

            case 'logout': require_once($request.'.helper.php'); break;

            case 'checkLogIn':
            case 'checkSignUp':
            case 'loadBudget':
            case 'saveBudget':
            case 'deleteItem':
            case 'dateSelector': 
            case 'saveDate':
            case 'loadUsername':
            case 'deleteDate':
            case 'summaryGetBudget': require_once($request.'.ajax.php'); break;
        }
    }

    static public function router() {

        header("Location: welcome");
        exit();

    }
}