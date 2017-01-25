<?php

ob_start();

//URL ADRESS
$URL = ( isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ) ? 'https://' : 'http://';
$dirName = dirname($_SERVER['PHP_SELF']);
$URL .= $_SERVER['HTTP_HOST'];
$URL .= $dirName != '//' ? $dirName : "";
$slash = substr($URL, -1);
$URL = $slash != '/' ? $URL.'/' : $URL;

//DATABASE
define('DB_SERVER', 'mysql');
define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PASSWORD', 'toor1234');
define('DB_NAME', 'kanciantus');

//ENVIROMENT
define('ENVIROMENT', 'dev');

//LOCATION
define('SERVER_ADDRESS', $URL);

set_include_path(get_include_path(). PATH_SEPARATOR . "core");
set_include_path(get_include_path(). PATH_SEPARATOR . "modules");
set_include_path(get_include_path(). PATH_SEPARATOR . "interfaces");
set_include_path(get_include_path(). PATH_SEPARATOR . "ajax");
set_include_path(get_include_path(). PATH_SEPARATOR . "helpers");

function __autoload($className) {
    require_once($className.".class.php");
}

