<?php 
	
	/**
	* 
	*/
	include_once 'class.database.php';
	class Presents extends Database
	{
		private static $handler;
		
		function __construct()
		{
			self::$handler = Database::connect();
		}

		public static function save($data, $id){
			$sql = "INSERT INTO presents SET id = ?, value = ?, presence_id = ?";
			$query = self::$handler->prepare($sql);
			$query->execute(array($data['id'], $data['value'], $id));
			if ($query) {
				return true;
			}
		}

		public static function getJSON(){
			$sql = "SELECT * FROM presents";
			$query = self::$handler->prepare($sql);
			$query->execute();
			if ($query) {
				$json = $query->fetchAll(PDO::FETCH_OBJ);
				return $json;
			}
		}

		public static function delete($id){
			$sql = "DELETE FROM presents WHERE id = ?";
			$query = self::$handler->prepare($sql);
			$query->execute(array($id));
			if ($query) {
				return true;
			}
		}

		public static function update($model){
			$sql = "UPDATE presents SET value = ? WHERE id = ?";
			$query = self::$handler->prepare($sql);
			$query->execute(array($model['value'], $model['id']));
			if ($query) {
				return true;
			}
		}


	}


?>