<?php 
	if (isset($_GET)) {
		include_once '../../class/class.database.php';
		$handler = Database::connect();
		$sql = "SELECT * FROM removed_payrolls";
		$query = $handler->query($sql);
		
		$row = $query->fetchAll(PDO::FETCH_OBJ);
		echo json_encode($row);
	}
?>