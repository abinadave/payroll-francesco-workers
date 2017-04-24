<?php 
	if (isset($_POST['id'])) {
		$id = stripcslashes($_POST['id']);
		include_once '../../class/class.positions.php';
		$positions = new Positions();
		if($positions::remove($id)){
			echo true;
		}
	}
?>