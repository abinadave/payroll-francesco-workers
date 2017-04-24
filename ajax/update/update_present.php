<?php 
	if (isset($_POST)) {
		$collection = $_POST['models'];
		include_once '../../class/class.presents.php';
		$presents = new Presents();
		$a = count($collection);
		$b = 0;
		foreach ($collection as $key => $model) {
			$rs = $presents::update($model);
			if ($rs) {
				++$b;
			}
		}

		if ($a == $b) {
			echo true;
		}
	}
?>