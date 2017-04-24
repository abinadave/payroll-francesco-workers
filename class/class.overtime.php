<?php
	/**
	* 
	*/
	include_once 'class.database.php';
	class Overtime extends Database
	{
		private static $handler;
		function __construct()
		{
			self::$handler = Database::connect();
		}

	}
?>