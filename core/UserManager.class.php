<?php 


class UserManager {

	static public function LogIn($username, $password) {

		$username = filter_var($username, FILTER_SANITIZE_STRING);
		$password = filter_var($password, FILTER_SANITIZE_STRING);

		$checkedUser = self::checkLogIn($username, $password);
		
		if(!$checkedUser) return false;

		self::getSession($checkedUser['id_users']);

		return true;
	}

	static public function SignUp($username, $email, $password) {

		$username = filter_var($username, FILTER_SANITIZE_STRING);
		$email = filter_var($email, FILTER_SANITIZE_EMAIL);
		$password = filter_var($password, FILTER_SANITIZE_STRING);

		$checkedUser = self::checkSignUp($username, $email);

		if($checkedUser) return false;

		self::addUser($username, $password, $email);

		return true;
	}

	static private function getSession($id) {

		$_SESSION['iduser'] = $id;
        $_SESSION['logged'] = true;
	}

	static public function removeSession() {
		session_unset();
		session_destroy();
	}

	static private function checkLogIn($username, $password) {

		return DatabaseManager::selectValSQL('SELECT * FROM users WHERE username = :s0 AND password = :s1 LIMIT 1', [$username, $password]);
	}

	static private function checkSignUp($username, $email) {

		return DatabaseManager::selectValSQL('SELECT * FROM users WHERE username = :s0 OR email = :s1 LIMIT 1', [$username, $email]);
	}

	static private function addUser($username, $password, $email) {

		DatabaseManager::changeValSQL('INSERT INTO users (username, password, email) VALUES (:s0, :s1, :s2)', [$username, $password, $email]);
	}

}