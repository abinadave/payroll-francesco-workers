<?php 
	include_once '../../class/class.accounts.php';
	$accounts = new Accounts();
	$price = $accounts::getPrice();
	echo $price;
?>