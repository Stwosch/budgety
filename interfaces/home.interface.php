<?php
	
	// Does user is logged?
	if(!$_SESSION['logged']) {
		header("Location: welcome");
		exit;
	}
	
	ModuleLoader::load('home');
 