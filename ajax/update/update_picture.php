<?php 
	if (isset($_POST)) {
		$model = $_POST['model'];
		$newExt = $_POST['new_ext'];
		include_once '../../class/class.database.php';
		$handler = Database::connect();
		$sql = "UPDATE pictures SET ext = ? WHERE id = ?";
		$query = $handler->prepare($sql);
		$rs = $query->execute(array(
			$newExt,
			$model['id']
		));
		// echo json_encode(array('result' => $rs));
		$dir = '../../assets/pictures/' . $model['fullname'] . '.' . $model['ext'];
		if (file_exists($dir)) {
			$rs = unlink($dir);
			echo json_encode(array('resp' => $rs));
		}else {
			echo json_encode(array('file_not_found' => true));
		}
	}
?>