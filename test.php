<?php 
	$password = 'francescotacloban';
	include 'class/class.accounts.php';
	$accounts = new Accounts;
	$newPass = $accounts::sanitize($password);
	echo $newPass;
 ?>