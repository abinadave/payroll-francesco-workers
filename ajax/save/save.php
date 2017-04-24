<?php 
	if (isset($_POST)) {
		$table = $_POST['table'];
		unset($_POST['table']);
		include_once '../../class/medoo.min.php';
		$database = new Medoo();
		$last_user_id = $database->insert($table, $_POST);
		#echo last_insert_id;
		$_POST['id'] = $last_user_id;
		echo json_encode($_POST);
	}
?>