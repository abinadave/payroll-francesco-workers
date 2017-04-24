<?php 
	
	$file = '../../class/class.positions.php';
	if (file_exists($file)) {
		include_once $file;
		if (class_exists('Positions')) {
			$Positions = new Positions();
			$json = $Positions::get_positions();
			echo json_encode($json);
		}
	}
	
?>