<?php 
	include_once '../../class/class.presents.php';
	$presents = new Presents();
	echo json_encode($presents::getJSON());
?>