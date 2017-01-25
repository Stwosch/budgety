<?php

if($_SESSION) {
	if($_SESSION['logged']){
		header("Location: home");
		exit;
	}
}
 
ModuleLoader::load('welcome');