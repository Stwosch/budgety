<?php
 
ModuleLoader::load('home');
 
$arr = Database::selectValSQL("SELECT * FROM users");
echo "<pre>";
print_r($arr);
echo "</pre>";