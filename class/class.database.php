<?php 
	/**
	* 
	*/
	class Database
	{
		private static $dsn = 'mysql:host=localhost;dbname=payroll_francesco_workers',
		$user = 'root',
		$pass = "Ethanabina2016",
		$pdo;

		function __construct()
		{
			# code...
		}

		public static function connect(){
			if (!isset(self::$pdo)) {
				try {
					$pdo = new PDO(self::$dsn, self::$user, self::$pass);
					$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
				} catch (Exception $e) {
					die($e->getMessage());
				}
			}
			return $pdo;
		}
	}
 ?>	