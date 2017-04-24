<?php 
	if (isset($_GET['table'])) {
		include_once '../../class/medoo.min.php';
		$database = new Medoo();
		$record = $database->get($_GET['table'], "*", [
			$_GET['prop'] => $_GET['value']
		]);
		echo json_encode($record);
	}	
?>