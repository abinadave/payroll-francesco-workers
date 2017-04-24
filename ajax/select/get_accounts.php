<?php 
	include_once '../../class/class.accounts.php';
	$accounts = new Accounts();
	$json = $accounts::getJSON();
	echo json_encode($json);
?>