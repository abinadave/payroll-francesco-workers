<?php 
	if (isset($_POST['pid'])) {
		$id = stripcslashes($_POST['pid']);
		
		include '../../class/class.projects.php';
		$projects = new Projects();
		$result = $projects::remove($id);
	}	
?>