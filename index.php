<?php

session_start();
require_once('config.php');

if( !( isset($_GET['page']) ) ) { // forwarding to home
    
    header("Location: ".SERVER_ADDRESS."welcome");
    
} else {
    
    $main = new MainManager($_GET['page']); // forwarding to given page
    
}