<?php 
	include_once '../../class/class.usertypes.php';
	$usertypes = new Usertypes();
	echo json_decode($usertypes::getJSON());
?>