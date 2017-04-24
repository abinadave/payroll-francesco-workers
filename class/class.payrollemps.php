<?php 
	/**
	* 
	*/
	include_once 'class.database.php';
	class Payrollemps extends Database
	{
		private static $handler;
		function __construct()
		{
			self::$handler = Database::connect();
		}
		public function update($nod, $model, $id){
			$sql = "UPDATE payrollemps SET num_of_days = ? WHERE emp = ? AND payroll_id = ?";
			$query = self::$handler->prepare($sql);
			$rs = $query->execute(array(
				$nod,
				$id,
				$model['payroll_id']
			));
			echo json_encode(array('success' => true));
		}

		
	}
?>