<?php 
	if (isset($_POST['value'])) {
		$ca = $_POST['value'];
		$emp_id = $_POST['emp_id'];
		$date = $_POST['date'];
		$resp = array();
		$error = '';
		if (is_numeric($ca)) {
			include '../../class/class.database.php';
			$handler = Database::connect();
			$sql = "SELECT * FROM debts WHERE emp_id = ?";
			$query = $handler->prepare($sql);
			$query->execute(array($emp_id));
			if ($query->rowCount()) {
				$sql = "SELECT * FROM debts WHERE emp_id = ?";
				$query = $handler->prepare($sql);
				$query->execute(array($emp_id));
				$row = $query->fetch(PDO::FETCH_OBJ);
				$newValue = $row->value + $ca;
				$sql = "UPDATE debts SET value = ? WHERE emp_id = ?";
				$query = $handler->prepare($sql);
				$rs = $query->execute(array($newValue, $emp_id));
				$row->value += $ca;
				echo json_encode(array(
					'type' => 'updated',
					'data' => $row
				));
			}else {
				$sql = "INSERT INTO debts (value, date, emp_id) VALUES(?,?,?)";
				$query = $handler->prepare($sql);
				$id = $query->execute(array(
					$ca,
					$date,
					$emp_id
				));
				$id = $handler->lastInsertId();
				echo json_encode(array(
					'type' => 'save',
					'data' => array(
							'id' => $id,
							'date' => $date,
							'value' => $ca, 
							'emp_id' => $emp_id
						)
					));
			}
			
		}
	}
?>