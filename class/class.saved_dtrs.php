<?php 
	/**
	* 
	*/
	include_once 'class.database.php';
	class Saved_dtrs extends Database
	{
		private static $handler;
		function __construct()
		{
			self::$handler = Database::connect();
		}

		public function countNumOfDays($data)
		{
			$sql = "SELECT * FROM saved_dtrs WHERE payroll_id = ?";
			$query = self::$handler->prepare($sql);
			$query->execute(array(
				$data['payroll_id']
			));
			$rows = $query->fetchAll(PDO::FETCH_OBJ);
			foreach ($rows as $key => $row) {
				$str = explode("-", $row->id);
				echo $str;
			}
		} 

		public function update($data)
		{
			$sql = "UPDATE saved_dtrs SET value = ? WHERE id = ? AND payroll_id = ?";
			$query = self::$handler->prepare($sql);
			$rs = $query->execute(array(
				$data->value,
				$data->id,
				$data->payroll_id
			));
		}

		public function fetchById($id)
		{
			$sql = "SELECT * FROM saved_dtrs WHERE payroll_id = ?";
			$query = self::$handler->prepare($sql);
			$query->execute(array(
				$id
			));
			echo json_encode($query->fetchAll(PDO::FETCH_OBJ));
		}

		public function save($data, $pid)
		{
			$a = count($data);
			$b = 0;
			foreach ($data as $key => $obj) {
				$sql = "INSERT INTO saved_dtrs SET id = ?, value = ?, payroll_id = ?";
				$query = self::$handler->prepare($sql);
				$rs = $query->execute(array(
					$obj['id'],
					$obj['value'],
					$pid
				));
				if ($rs) {
					++$b;
				}
			}
			echo json_encode(array(
				'a' => $a,
				'b' => $b
			));
		}
	}
 ?>