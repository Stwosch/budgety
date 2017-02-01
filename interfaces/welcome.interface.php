<?php

if($_SESSION) {
	if($_SESSION['logged']){
		header("Location: home#start");
		exit;
	}
}
 
ModuleLoader::load('welcome');