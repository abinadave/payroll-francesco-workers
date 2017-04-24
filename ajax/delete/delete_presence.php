<?php 
	if (isset($_POST['id'])) {
		
		$id = stripcslashes($_POST['id']);
		include_once '../../class/class.presences.php';
		$presences = new Presences();
		$rs = $presences::remove($id);
		if ($rs) {
			echo true;
		}
	}
?>