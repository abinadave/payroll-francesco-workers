<?php 
	if (isset($_POST)) {
		# code...
		$table = $_POST['table'];
		$values = $_POST['values'];
		$where = $_POST['where'];
		$where_value = $_POST['where_value'];
		unset($_POST['table']);
		include_once '../../class/medoo.min.php';
		$database = new Medoo(); 
		$database->update($table, $values, [
			$where => $where_value
		]);

		echo "<pre>", print_r($_POST) ,"</pre>";
	}
?>