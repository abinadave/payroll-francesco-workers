<?php 
	if (isset($_POST['value'])) {
		
		include_once '../../class/class.database.php';
		$handler = Database::connect();
		$json = array();
		$sql = "UPDATE debts SET value = ? WHERE id = ?";
		$query = $handler->prepare($sql);
		$query->execute(array(
			$_POST['value'],
			$_POST['id']
		));

		if ($_POST['value'] == 0) {
			$sql = "DELETE FROM debts WHERE id = ?";
			$query = $handler->prepare($sql);
			$query->execute(array($_POST['id']));
			$json['deleted'] = true;
		}else {
			$json['deleted'] = false;
		}

		if ($query) {
			$json['success'] = true;
			echo json_encode($json);
		}else {
			$json['success'] = false;
			echo json_encode($json);
		}

	}
?>