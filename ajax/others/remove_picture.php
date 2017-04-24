<?php 
	if (isset($_POST['file'])) {
		$fileDir = "../../assets/pictures/" . $_POST['file'];

		if (file_exists($fileDir)) {
			unlink($fileDir);
		}else {
			echo json_encode(array('response' =>'file does not exist'));
		}
		
	}
?>