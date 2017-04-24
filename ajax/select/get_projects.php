<?php 

	include '../../class/class.projects.php';
	$projects = new Projects();
	$json = $projects::getJSON();
	echo json_encode($json);
?>