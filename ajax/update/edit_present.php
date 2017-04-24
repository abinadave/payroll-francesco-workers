<?php 
	if (isset($_POST)) {
		include '../../class/class.presents.php';
		$class = new Presents();
		$model = $_POST['values'];
		$rs = $class::update($model);
		echo $rs;
	}
?>