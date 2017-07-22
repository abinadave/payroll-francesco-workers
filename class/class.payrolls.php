<?php
session_start();
	/**
	* 
	*/
	include_once 'class.database.php';
	class Payrolls extends Database
	{
		public static $handler;
		function __construct()
		{
			self::$handler = Database::connect();
		}

		public static function save($data){
			$data['id'] = self::generatePayrollId();
			$sql = "INSERT INTO payrolls SET id = ?, location = ?, location_id = ?, date_from = ?, date_to = ?, total = ?, advances_total = ?, sss_total = ?, phil_total = ?, rice_allowance_total = ?, net = ?, date = ?, true_date = ?, time = ?, personnel = ?";
			$query = self::$handler->prepare($sql);
			$query->execute(array( $data['id'], $data['location'], $data['location_id'], $data['date_from'], $data['date_to'], $data['total'], $data['advances_total'], $data['sss_total'], $data['phil_total'], $data['rice_allowance_total'], $data['net'], $data['date'], $data['true_date'], $data['time'], $_SESSION['id']));
			$response = [];
			$response['id'] = $data['id'];
			$response['personnel'] = $_SESSION['id'];
			return $response;
		}

		private static function generatePayrollId(){
			$id = rand(1, 9999999); $done = false;
			while (!$done) {
				$sql = "SELECT * FROM payrollemps WHERE payroll_id = ?";
				$query = self::$handler->prepare($sql);
				$query->execute(array($id));
				if (!$query->rowCount()) {
					$done = true;
				}
			}
			return $id;
		}

		public static function savePayroll($data){
			$sql = "INSERT INTO payrolls SET id = ?, location = ?, location_id = ?, date_from = ?, date_to = ?, total = ?, advances_total = ?, sss_total = ?, phil_total = ?, rice_allowance_total = ?, net = ?, date = ?, time = ?, personnel = ?";
			$query = self::$handler->prepare($sql);
			$query->execute(array( $data['id'], $data['location'], $data['location_id'], $data['date_from'], $data['date_to'], $data['total'], $data['advances_total'], $data['sss_total'], $data['phil_total'], $data['rice_allowance_total'], $data['net'], $data['date'], $data['time'], $_SESSION['id']));
			$response = [];
			$response['id'] = self::$handler->lastInsertId();
			$response['personnel'] = $_SESSION['id'];
			return $response;
		}

		public static function getJSON(){
			if (isset($_SESSION['id'])) {
				$sql = "SELECT * FROM payrolls";
				$query = self::$handler->prepare($sql);
				$query->execute();
				if ($query) {
					$json = $query->fetchAll(PDO::FETCH_OBJ);
					return $json;
				}
			}
		}

		public static function savePayrollEmps($model, $data){
			$sql = "INSERT INTO payrollemps SET payroll_id = ?, emp = ?, position = ?, num_of_days = ?, rpd = ?, advances = ?, sss = ?, phil = ?, rice_allowance = ?, has_allowance = ?, total = ?, net = ?, ot_hrs = ?, ot_mins = ?, undertime = ?";
			$query = self::$handler->prepare($sql);
			$query->execute(array( $model['payroll_id'], $model['id'], $data['position'], $model['num_of_days'], $data['rpd'], $model['advances'], $model['sss'], $model['phil'], $data['rice_allowance'], $data['has_allowance'], $data['total'], $data['net'], $data['ot_hrs'], $data['ot_mins'], $data['undertime'] ));
			if ($query) {
				return true;
			}
		}

		public static function getPayrollEmps(){
			if (isset($_SESSION['id'])) {
				$sql = "SELECT * FROM payrollemps";
				$query = self::$handler->prepare($sql);
				$query->execute();
				if ($query) {
					# code...
					$json = $query->fetchAll(PDO::FETCH_OBJ);
					return $json;
				}
			}
		}

		public static function updatePayrollEmps($data){
			$sql = "UPDATE payrollemps SET num_of_days = ?, advances = ?, sss = ?, phil = ?, nhl = ?, net = ? WHERE payroll_id = ? AND emp = ?";
			$query = self::$handler->prepare($sql);
			$query->execute(array($data['num_of_days'], $data['advances'], $data['sss'], $data['phil'], $data['nhl'], $data['net'], $data['payroll_id'], $data['emp']));
			if ($query) {
				return true;
			}else {
				return false;
			}

		}

		public static function updatePayrolls($data){
			$sql = "UPDATE payrolls SET advances_total = ?, sss_total = ?, phil_total = ?, rice_allowance_total = ?, net = ? WHERE id = ?";
			$query = self::$handler->prepare($sql);
			$query->execute(array($data['advances_total'], $data['sss_total'], $data['phil_total'], $data['rice_allowance_total'], $data['net'], $data['id']));
			if ($query) {
				return true;
			}else {
				return false;
			}
		}

		public static function updateHasAllowance($data){
			// $rice_allowance = self::getRiceAllowance($data);
			$sql = "UPDATE payrollemps SET has_allowance = ? WHERE payroll_id = ? AND emp = ?";
			$query = self::$handler->prepare($sql);
			$query->execute(array(
				$data['has'],
				$data['payroll_id'],
				$data['emp']
			));
			if ($query) {
				return array('has' => $data['has'], 'success' => true);
			}else {
				return false;
			}
		}

		public static function getRiceAllowance($data){
			$total = 0.0;
			if ($data['has'] == 1) {
				$total = $data['num_of_days'] * $data['rice'];
				return $total;
			}else {
				return 0;
			}
		}

		public static function updateRiceAllowance($data){
			$sql = "UPDATE payrollemps SET rice_allowance = ? WHERE emp = ? AND payroll_id = ?";
			$query = self::$handler->prepare($sql);
			$query->execute(array($data['rice_allowance'], $data['emp'], $data['payroll_id']));
			if ($query) {
				return true;
			}
		}

		public static function delete($data){
			$sql = "DELETE FROM payrolls WHERE id = ?";
			$query = self::$handler->prepare($sql);
			$query->execute(array($data['id']));
			return ($query) ? true : false;
		}

		public static function saveRemovedPayrolls($data){
			$sql = "INSERT INTO removed_payrolls SET id = ?, location = ?, location_id = ?, date_from = ?, date_to = ?, total = ?, advances_total = ?, sss_total = ?, phil_total = ?, rice_allowance_total = ?, net = ?, date = ?, time = ?, personnel = ?";
			$query = self::$handler->prepare($sql);
			$query->execute(array( $data['id'], $data['location'], 
				$data['location_id'], $data['date_from'], 
				$data['date_to'], $data['total'], 
				$data['advances_total'], 
				$data['sss_total'], $data['phil_total'], 
				$data['rice_allowance_total'], 
				$data['net'], $data['date'], 
				$data['time'], $_SESSION['id']));
			return ($query) ? true : false;
		}

		public static function deleteRemovedPayroll($data){
			$sql = "DELETE FROM removed_payrolls WHERE id = ?";
			$query = self::$handler->prepare($sql);
			$query->execute(array($data['id']));
			return ($query) ? true : false;
		}

	}
?>