<?php 
	if (isset($_POST['values'])) {
		# code...
		#echo "<pre>", print_r($_POST) ,"</pre>";
		$models = $_POST['values'];

		include_once '../../class/class.presences.php';
		$presences = new Presences();
		$id = $presences::save($models);
		if (is_numeric($id)) {
			echo $id;
		}

	}
?>