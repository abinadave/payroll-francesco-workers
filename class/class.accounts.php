<?php
session_start(); 
	/**
	* 
	*/
	include_once 'class.database.php';
	if (!function_exists('password_hash')) { include 'password_compat/lib/password.php'; }

	class Accounts extends Database
	{
		public static $handler, $id;
		function __construct()
		{
			self::$handler = Database::connect();
		}

		public static function save($data){
			self::generateId();
			$pass = self::sanitize($data['password']);
			$sql = "INSERT INTO accounts SET
				id = ?, firstname = ?, middlename = ?, lastname = ?, usertype = ?, contact = ?,
				email = ?, gender = ?, address = ?, username = ?, password = ?, rand = ?";
			$query = self::$handler->prepare($sql);
			$query->execute(array(
				self::$id,
				$data['firstname'],
				$data['middlename'],
				$data['lastname'],
				$data['usertype'],
				$data['contact'],
				$data['email'],
				$data['gender'],
				$data['address'],
				$data['username'],
				$pass,
				0
			));

			if ($query) {
				$response = array();
				$response['id'] = self::$id;
				$response['password'] = $pass;
				return $response;
			}

		}

		public static function saveDebt($data){
			$sql = "INSERT INTO debts SET id = ?, fullname = ?, value = ?, date = ?";
			$query = self::$handler->prepare($sql);
			$query->execute(array($data['id'], $data['fullname'], $data['value'], $data['date']));
			if ($query) {
				return true;
			}
		}

		public static function generateId(){
			
			$done = false;

			while (!$done) {
				$id = rand(10000,99999);
				$sql = "SELECT * FROM accounts WHERE id = ?";
				$query = self::$handler->prepare($sql);
				$query->execute(array($id));
				if ($query->rowCount() > 0) {
					$done = false;
				}else {
					$done = true;
					self::$id = $id;
				}
			}	
		}

		public static function createId(){
			$id = 0;
			$done = false;
			while (!$done) {
				$id = rand(10000,99999);
				$sql = "SELECT * FROM accounts WHERE id = ?";
				$query = self::$handler->prepare($sql);
				$query->execute(array($id));
				if ($query->rowCount() > 0) {
					$done = false;
				}else {
					$done = true;
					$id = $id;
				}
			}	
			return $id;
		}

	    public static function sanitize($password){
			$options = [
			    'cost' => 11,
			    'salt' => mcrypt_create_iv(22, MCRYPT_DEV_URANDOM),
			];
			return password_hash($password, PASSWORD_BCRYPT, $options);
	    }

	    public static function verify($data){
	    	$done = 0; $json = array();
	    	$sql = "SELECT * FROM accounts WHERE username = ?";
		   	$query = self::$handler->prepare($sql);
		   	$query->execute(array($data['username']));

		   	if ($query->rowCount() > 0) {
		   		$row = $query->fetch(PDO::FETCH_ASSOC);
		   		if(password_verify($data['password'], $row['password'])){
		   			$done = true;
		   			self::setSessions($row['id'], $row['usertype']);
		   			self::updateStatus(1, $row['id']);
		   			$json = $row;
		   			$json['success'] = true;
		   		}else {
		   			$json['success'] = false;
		   		}
		   	}

		   	return $json;
	    }

	    public static function setSessions($id, $usertype){
	    	$_SESSION['id'] = $id;
	    	$_SESSION['usertype'] = $usertype;
	   
	    }

	    public static function changePassword($post, $model){
	    	if (password_verify(self::sanitize($post['current_password']), $model['password'])) {
	    		return array('success' => true);
	    	}else {
	    		return array('success' => false, 'errors' => ['password does not match']);
	    	}
	    }

	    public static function updatePassword($row, $post){
	    	if (!password_verify($post['current'], $row['password'])) {
				return array('errors' => ['password does not match in the database.'], 'success' => false);
			}else {
				$sql = "UPDATE accounts SET password = ? WHERE id = ?";
				$query = self::$handler->prepare($sql);
				$rs = $query->execute(array(self::sanitize($post['new']), $row['id']));
				return array('success' => $rs, 'message' => 'Successfully updated password.');
			}	
	    }

	    public static function getJSON(){
	    	$sql = "SELECT * FROM accounts";
	    	$query = self::$handler->prepare($sql);
	    	$query->execute();
	    	if ($query) {
	    		$json = $query->fetchAll(PDO::FETCH_OBJ);
	    		return $json;
	    	}
	    }

	    public static function getDebts(){
	    	$sql = "SELECT * FROM debts";
	    	$query = self::$handler->prepare($sql);
	    	$query->execute();
	    	if ($query) {
	    		$json = $query->fetchAll(PDO::FETCH_OBJ);
	    		return $json;
	    	}
	    }

	    public static function updateStatus($status, $id){
	    	$sql = "UPDATE accounts SET status = ? WHERE id = ?";
	    	$query = self::$handler->prepare($sql);
	    	$query->execute(array($status, $id));
	    }

	    public static function updateDebts($data){
	    	$total = 0.0;
	    	$debt = self::getEmployeeBackAccount($data['id']);
	    	$total = $data['value'] + $debt;
	    	$sql = "UPDATE debts SET value = ?, date = ? WHERE id = ?";
	    	$query = self::$handler->prepare($sql);
	    	$query->execute(array($total, $data['date'], $data['id']));
	    	if ($query) {
	    		return $total;
	    	}else {
	    		return false;
	    	}
	    }

	    public static function getEmployeeBackAccount($id){
	    	$sql = "SELECT value FROM debts WHERE id = ?";
	    	$query = self::$handler->prepare($sql);
	    	$query->execute(array($id));
	    	$row = $query->fetch(PDO::FETCH_BOTH);
	    	return $row[0];
	    }

	    public static function getFirstname(){
	    	$sql = "SELECT firstname FROM accounts WHERE id = ?";
	    	$query = self::$handler->prepare($sql);
	    	$query->execute(array($_SESSION['id']));
	    	if ($query) {
	    		$row = $query->fetch();
	    		return $row[0];
	    	}else {
	    		return 'unknown name';
	    	}
	    }

	    public static function getOnlineUsers(){
	    	$sql = "SELECT * FROM accounts WHERE status = ? AND id <> ?";
	    	$query = self::$handler->prepare($sql);
	    	$query->execute(array(1, $_SESSION['id']));
	    	if ($query->rowCount() > 0) {
	    		$json = $query->fetchAll(PDO::FETCH_ASSOC);
	    		$numOfRows = $query->rowCount();
		    		?>
		    			<script type="text/javascript">
		    			var row = <?php echo $numOfRows ?>;
		    			$('#online-user-num').text(row);
		    			</script>
		    		<?php
	    		return $json;
	    	}else {
	    			?>
		    			<script type="text/javascript">
		    			$('#online-user-num').text('0');
		    			</script>
		    		<?php
	    		return false;
	    	}
	    }

	    public static function updatePhoto($id, $rand){
	    	$sql = "UPDATE accounts SET rand = ? WHERE id = ?";
	    	$query = self::$handler->prepare($sql);
	    	$query->execute(array($rand, $id));
	    	if ($query) {
	    		return true;
	    	}else {
	    		return false;
	    	}
	    }

	    public static function updateRiceAllowance($price){
	    	$sql = "UPDATE bugas SET presyo = ?";
	    	$query = self::$handler->prepare($sql);
	    	$query->execute(array($price));
	    	if ($query) {
	    		return true;
	    	}else {
	    		return false;
	    	}
	    }

	    public static function getPrice(){
	    	$sql = "SELECT * FROM bugas";
	    	$query = self::$handler->prepare($sql);
	    	$query->execute();
	    	if ($query) {
	    		$row = $query->fetch(PDO::FETCH_BOTH);
	    		echo $row[0];
	    	}
	    }


	 
	}
?>