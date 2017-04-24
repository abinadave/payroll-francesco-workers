<?php  
	if (isset($_POST['partial'])) {
		$number = $_POST['partial'];
		include_once '../../class/class.database.php';
		$handler = Database::connect();
		$sql = "SELECT * FROM userlogs ORDER BY id DESC LIMIT $number,50";
		$query = $handler->query($sql);
		$rows = $query->fetchAll(PDO::FETCH_OBJ);
		echo json_encode($rows);
	}
?>