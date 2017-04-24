<?php 

	include 'class.database.php';
	class Positions extends Database
	{
		public static $handler, $id, $name;
		function __construct()
		{
			self::$handler = Database::connect();
		}

		public function setId($value){
			self::$id = $value;
			return $this;
		}

		public function setName($value){
			self::$name = $value;
			return $this;
		}

		public static function save($data){
			$sql = "INSERT INTO positions SET name = ?";
			$query = self::$handler->prepare($sql);
			$query->execute(array($data['name']));
			if ($query) {
				# code...
				return self::$handler->lastInsertId();
			}else {
				return false;
			}
		}

		public static function get_positions(){
			$sql = "SELECT * FROM positions ORDER BY name";
			$query = self::$handler->prepare($sql);
			$query->execute();
			if ($query) {
				$json = $query->fetchAll(PDO::FETCH_OBJ);
				return $json;
			}
		}

		public static function remove($id){
			$sql = "DELETE FROM positions WHERE id = ?";
			$query = self::$handler->prepare($sql);
			$query->execute(array($id));
			if ($query) {
				echo true;
			}else {
				echo false;
			}
		}


	}
?>