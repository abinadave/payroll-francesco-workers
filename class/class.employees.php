<?php
	/**
	* 
	*/
	include_once 'class.database.php';
	class Employees extends Database
	{
		
		public static $handler;

		function __construct()
		{
			self::$handler = Database::connect();
		}
		public function updateOtherAfected($data){
			$sql = "SELECT * FROM employees WHERE firstname = ? AND lastname = ?";
			$query = self::$handler->prepare($sql);
			$query->execute(array(
				strtoupper($data['firstname']),
				strtoupper($data['lastname'])
			));
			if ($query->rowCount() > 0) {
				$rows = $query->fetchAll(PDO::FETCH_OBJ);
				foreach ($rows as $key => $emp) {
					$sql = "UPDATE employees SET firstname = ?, lastname = ? WHERE id = ?";
					$query = self::$handler->prepare($sql);
					$query->execute(array(
						strtoupper($data['firstname']),
						strtoupper($data['lastname']),
						$emp->id
					));
				}
			}
		}
		public static function save($data){
			$sql = "INSERT INTO employees SET firstname = ?, middlename = ?, lastname = ?, rpd = ?, position = ?, gender = ?, location = ?, rice_allowance = ?";
			$query = self::$handler->prepare($sql);
			$query->execute(array($data['firstname'], $data['middlename'], $data['lastname'], $data['rpd'], $data['position'], $data['gender'], $data['location'], $data['rice_allowance']));
			if ($query) {
				return self::$handler->lastInsertId();
			}else {
				return false;
			}
		}

		public static function get_employees(){
			$sql = "SELECT * FROM employees";
			$query = self::$handler->prepare($sql);
			$query->execute();
			if ($query) {
				$json = $query->fetchAll(PDO::FETCH_OBJ);
				return $json;
			}
			
		}

		public static function update($data){
			$sql = "UPDATE employees SET firstname = ?, middlename = ?, lastname = ?, rpd = ?, position = ?, gender = ?, location = ?, rice_allowance = ? WHERE id = ?";
			$query = self::$handler->prepare($sql);
			$query->execute(array($data['firstname'], $data['middlename'], $data['lastname'], $data['rpd'], $data['position'], $data['gender'], $data['location'], $data['rice_allowance'], $data['pid']));
			if ($query) {
				return true;
			}else {
				return false;
			}
		}

		public static function remove($id){
			$sql = "DELETE FROM employees WHERE id = ?";
			$query = self::$handler->prepare($sql);
			$query->execute(array($id));
			if ($query) {
				return true;
			}else {
				return false;
			}
		}

		public static function updateRand($id, $rand){
			$sql = "UPDATE employees SET rand = ? WHERE id = ?";
			$query = self::$handler->prepare($sql);
			$query->execute(array($rand, $id));
			if ($query) {
				return true;
			}else {
				return false;
			}
		}

	    public static function verify_employee($data){
	    	$sql = "SELECT * FROM employees WHERE firstname = ? and lastname = ?";
	    	$query = self::$handler->prepare($sql);
	    	$query->execute(array($data['username'], $data['password']));
	    	if($query->rowCount() > 0) {
	    		$row = $query->fetch(PDO::FETCH_ASSOC);
	    		self::setSession($row, 3);
	    		$json = array('result' => true, 'usertype' => $_SESSION['usertype']);
	    		foreach ($_SESSION as $key => $value) {
	    			$json[$key] = $value;
	    		}
	    		return $json;	
	    	}else{ 
				$json = array('result' => false, $_SESSION);
	    		return $json;		    	}
	    }

	    public static function setSession($row, $usertype){
	    	$_SESSION['usertype'] = 3;
	    	foreach ($row as $key => $value) {
	    		$_SESSION[$key] = $value;
	    	}
	    }

	}
?>