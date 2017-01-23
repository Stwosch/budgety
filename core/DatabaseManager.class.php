<?php

class DatabaseManager {

    static private function devErrorHandling($e, $message="Wystąpił błąd, przepraszamy za usterki") { //KONEICZNIE SFORMATOWAC WYGLAD WYSWIETLANIA BLEDOW W CSSIE
        
        if(ENVIROMENT==='dev') {

            echo '<b style="color:red">Code: </b>'.(int)$e->getCode().'<br>';
            echo '<b style="color:red">Message: </b>'.$e->getMessage().'<br>';
            echo '<b style="color:red">In file: </b>'.$e->getFile().'<br>';
            echo '<b style="color:red">On line: </b>'.$e->getLine().'<br>';
        } else 
            echo $message;

        die();
    }

    static private function DBconnect() {

        try {

            $pdo = new PDO(DB_SERVER . ":host=" . DB_HOST . ";dbname=" . DB_NAME, DB_USER, DB_PASSWORD);
            return $pdo; //CONNECT WITH DATABASE, IF ALL IS GOOD RETURN PDO OBJECT

        } catch (PDOException $e) {

            self::devErrorHandling($e); //IF SOMETHING IS WRONG CHECK ENVIROMENT AND DISPLAY INFORMATIONS
        }
    }

    static private function templateSQL($sql, $options = Array()) {

    	/*
        ARGUMENT OPTIONS FOR WHERE'S VALUES BECAUSE WE WANT TO PREPARE 
        OUR SELECT TO DEFEND AGAINST SQL INCJETION
        IN ARGUMENTS, IF WE ARE USING 'WHERE' WE MUST SEND ARRAY WITH VALUES
        e.g 
        first arg "SELECT * FROM users WHERE id_users = :s0 AND username = :s1"
        second arg ["5", "test"]

        example about returned value if we have mulitple result from function
        $select is variable contains called this method
        

        if($select !== false) {  <- check the method didnt return false(found 0 rows)
            foreach($select as $s) { <- we are in the dimensional arrays so we must go deeper
                foreach($s as $k => $v) { <- we can do this with using second foreach, we have assoc arrays
                    echo $v."<br>";             so we can use $key => $val structure
                }
            }
        }

        */

    	$pdo = self::DBconnect();

    	if(!empty($options)) {

            $count = count($options);

            for($i=0; $i<$count; $i++) { // IF YES, WE MUST CREATE ARRAY WITH VALUES 
                $values[":s".$i] = $options[$i]; // THAT WE WILL USE TO COMPARE :s with value 
            }
                
        }
            
        $query = $pdo->prepare($sql);
        $result = isset($values)? $query->execute($values) : $query->execute(); // DEPENDING ON WHETHER WE SEND ARRAY WITH OPTIONS

        $pdo = null;

        return [$result, $query]; // WE NEED ALSO RETURN QUERY FOR SQL SELECTS
    }

    static public function selectValSQL($sql, $options = Array()) { 
    	
        try {
            
        	$tempArr = self::templateSQL($sql, $options);

        	$result = $tempArr[0];
        	$query = $tempArr[1]; // ASSIGN VALUES
        
            if(!$result) {
                throw new Exception('Something went wrong in SQL select'); // IF WE DON'T HAVE ANY RESULT, WE THROW EXCEPTION
            }
            
            if($query->rowCount()===0){
            	return false;
            }  //NOT FOUND IN DATABASE

            if($query->rowCount()===1) {
                return $query->fetch(PDO::FETCH_ASSOC);
            }
               
            while( ($row = $query->fetch(PDO::FETCH_ASSOC) )) {
                $returnArray[] = $row; // PREPARE TO RETURN
            }
			
            return $returnArray;

        } catch(Exception $e) {

            self::devErrorHandling($e);
        }
    }

    static public function changeValSQL($sql, $options = Array()) {

        //TO USE THIS METHOD WE MUST PREPARE OUR SQL 
        //IN OPTIONS ARRAY WE WILL DEFINE VALUES FOR WHERE AND SET
        //ALWAYS REMEMBER ABOUT WHERE AND SET BEACUSE
        //WITHOUT WHERE THIS IS NOT WORKING

        try {
            
            $tempArr = self::templateSQL($sql, $options);
            $result = $tempArr[0];
            
            if(!$result) {
                throw new Exception("Can't update. Something went wrong during updating");
            }

            return $result;

        } catch(Exception $e) {

             self::devErrorHandling($e); //IF SOMETHING IS WRONG CHECK ENVIROMENT AND DISPLAY INFORMATIONS
        }
    }

}