<?php 
	if (isset($_POST)) {
		# code...
		include_once '../../class/class.presents.php';
		$presents = new Presents();
		$ids = $_POST['values'];
		$a = count($ids);
		$b = 0;

		foreach ($ids as $key => $id) {
			$result = $presents::delete($id);
			if ($result) {
				++$b;
			}
		}

		if ($a == $b) {
			echo true;
		}
		
	}
?>