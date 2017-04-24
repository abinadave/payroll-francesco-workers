<?php 
	/**
	* 
	*/
	include_once 'class.database.php';
	class Usertypes extends Database
	{
		public static $handler;
		function __construct()
		{
			self::$handler = Database::connect();	
		}

		public static function getJSON(){
			$sql = "SELECT * FROM usertypes";
			$query = self::$handler->prepare($sql);
			$query->execute();
			if ($query) {
				$json = $query->fetchAll(PDO::FETCH_OBJ);
				echo json_encode($json);
			}
		}
	}
?>