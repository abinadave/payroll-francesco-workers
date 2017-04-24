<?php 
	/**
	* 
	*/
	include_once 'class.database.php';
	class Users extends Database
	{
		public static $handler, $username, $password, $usertype;
		function __construct()
		{
			self::$handler = Database::connect();
		}

		public function setUsername($value){
			self::$username = $value;
			return $this;
		}


		public function setPassword($value){
			self::$password = $value;
			return $this;
		}


		public function setUsertype($value){
			self::$usertype = $value;
			return $this;
		}

		
	}

	
?>