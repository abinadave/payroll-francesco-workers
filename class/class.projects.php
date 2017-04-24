<?php 
	/**
	* 
	*/
	include 'class.database.php';
	class Projects extends Database
	{
		public static $handler;
		
		function __construct()
		{
			self::$handler = Database::connect();
		}

		public static function save($data){
			$sql = "INSERT INTO projects SET location= ?";
			$query = self::$handler->prepare($sql);
			$query->execute(array($data['location']));
			if ($query) {
				return self::$handler->lastInsertId();
			}else {
				return 0;
			}
		}

		public static function getJSON(){
			$sql = "SELECT * FROM projects ORDER BY location";
			$query = self::$handler->prepare($sql);
			$query->execute();
			if ($query) {
				$json = $query->fetchAll(PDO::FETCH_OBJ);
				return $json;
			}
		}

		public static function remove($id){
			$sql = "DELETE FROM projects WHERE id = ?";
			$query = self::$handler->prepare($sql);
			$query->execute(array($id));
			if ($query) {
				return true;
			}else {
				return false;
			}
		}
	}
?>