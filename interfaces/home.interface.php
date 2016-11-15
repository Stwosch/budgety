<?php
 
ModuleLoader::load('home');
 
Database::SQLupdate("UPDATE users SET username=:s0 WHERE password=:s1 AND email=:s2", ["witam", "test2", "test2"]);
