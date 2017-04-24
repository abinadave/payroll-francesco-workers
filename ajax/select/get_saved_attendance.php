<?php 
	include_once '../../class/class.presences.php';
	$presences = new Presences();
	echo json_encode($presences::getJSON());
?>