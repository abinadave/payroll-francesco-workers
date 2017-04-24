<?php
session_start(); 
	if (isset($_POST['get_session'])) {
		if (isset($_SESSION['id'])) {
			echo $_SESSION['id'];
		}
	}
?>