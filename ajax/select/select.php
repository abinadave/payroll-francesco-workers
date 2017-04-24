<?php 
	if (isset($_GET['table'])) {
		include_once '../../class/medoo.min.php';
		$database = new Medoo();
		$datas = $database->select($_GET['table'], "*");
		echo json_encode($datas);
	}
?>