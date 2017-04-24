<?php 
	if (isset($_POST)) {
		include_once '../../class/class.accounts.php';
		$accounts = new Accounts();
		$name = $accounts::getFirstname();
		echo ucwords($name);
	
	}
?>