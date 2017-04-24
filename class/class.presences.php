<?php 
	/**
	* 
	*/
	include_once 'class.database.php';
	class Presences extends Database
	{
		private static $handler;
		function __construct()
		{
			self::$handler = Database::connect();
		}

		public static function save($model){
			$sql = "INSERT INTO presences SET from_date = ?, to_date = ?, loc_id = ?, loc_name = ?";
			$query = self::$handler->prepare($sql);
			$query->execute(array($model['from'], $model['to'], $model['loc_id'], $model['loc_name']));
			if ($query) {
				return self::$handler->lastInsertId();
			}
		}

		public static function getJSON(){
			$sql = "SELECT * FROM presences";
			$query = self::$handler->prepare($sql);
			$query->execute();
			if ($query) {
				$json = $query->fetchAll(PDO::FETCH_OBJ);
				return $json;
			}
		}

		public static function remove($id){
			$sql = "DELETE FROM presences WHERE id = ?";
			$query = self::$handler->prepare($sql);
			$query->execute(array($id));
			if ($query) {
				$rs = self::afterRemove($id);
				return $rs;
			}
		}

		public static function afterRemove($id){
			$sql = "DELETE FROM presents WHERE presence_id = ?";
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