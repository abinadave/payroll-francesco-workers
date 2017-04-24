<?php
session_start();
	if (isset($_POST['session_destroy'])) {
		include_once '../../class/class.accounts.php';
		$accounts = new Accounts();
		$accounts::updateStatus(0, $_SESSION['id']);
		session_destroy();
		$_SESSION = [];
	}
?>