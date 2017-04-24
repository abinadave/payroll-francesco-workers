<?php 
	if (isset($_POST['id']) &&
		isset($_POST['text']) &&
		isset($_POST['date'])) {

		include '../../class/class.chats.php';
		$chats = new Chats();
		$result = $chats::save($_POST);
		if ($result) {
			echo true;
		}
	}
?>