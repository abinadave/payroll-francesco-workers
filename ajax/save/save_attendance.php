<?php 
	if (isset($_POST)) {
		# code...
		
		include '../../class/class.database.php';
		$handler = Database::connect();
		$sql = "INSERT INTO presents SET id = ?, value = ?, presence_id = ?";
		$query = $handler->prepare($sql);
		$query->execute(array($_POST['id'], $_POST['value'], $_POST['presence_id']));
		if ($query) {
			echo true;
		}
	}
?>