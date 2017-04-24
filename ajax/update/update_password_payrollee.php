<?php 
	if (isset($_POST)) {
		$errors = [];
		if (empty($_POST['current']) || empty($_POST['new'])) {
			array_push($errors, 'Cant leave empty fields.');
		}else {
			include '../../class/class.accounts.php';
			include '../../class/class.functions.php';
			$accounts = new Accounts();
			$param = array(
				'table' => 'accounts',
				'column' => '*',
				'where' => 'id',
				'value' => $_SESSION['id']
			);
			$row = Fn::get($param);
			$response = $accounts::updatePassword($row, $_POST);
			echo json_encode($response);
		}

		if (count($errors)) {
			echo json_encode(array('success' => false, 'errors' => $errors));
		}
	}
?>