<?php 
	/**
	* 
	*/
	include 'class.database.php';
	class Chats extends database
	{
		private static $handler;
		function __construct()
		{
			self::$handler = Database::connect();
		}

		public static function save($data){
			$sql = "INSERT INTO chats SET text = ?, sender = ?, date = ?";
			$query = self::$handler->prepare($sql);
			$query->execute(array($data['text'], $data['id'], $data['date']));
			if ($query) {
				return true;
			}else {
				return false;
			}
		}
	}

?>