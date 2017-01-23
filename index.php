<?php

session_start();
require_once('config.php');

if( !( isset($_GET['page']) ) ) { // forwarding to given page
    
    header("Location: ".SERVER_ADDRESS."home");
    
} else {
    
    $main = new MainManager($_GET['page']); // forwarding to home
    
}