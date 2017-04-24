<?php 
	if (isset($_POST['models']) && isset($_POST['response'])) {
		$json = $_POST['models'];
		$id = $_POST['response'];
		$lengthA = count($json);
		$lengthB = 0;

		include_once '../../class/class.presents.php';
		$presents = new Presents();
		
		foreach ($json as $key => $model) {
			$rs = $presents::save($model, $id);
			if ($rs) {
				++$lengthB;
			}
		}

		if ($lengthB == $lengthA) {
			echo true;
		}

	}
?>