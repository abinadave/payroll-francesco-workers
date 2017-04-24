<?php 
	include '../../class/class.accounts.php';
	$accounts = new Accounts();
	$json = $accounts::getDebts();
	echo json_encode($json);
?>