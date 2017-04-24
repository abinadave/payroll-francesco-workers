<?php 
	if (isset($_POST['id']) && isset($_POST['presence_id'])) {
		# code...
		$_POST['value'] = 0;
		include_once '../../class/class.presents.php';
		$presents = new Presents();
		$rs = $presents::save($_POST, $_POST['presence_id']);
		if ($rs) {
			echo true;
		}
	}
?>