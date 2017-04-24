<?php 
	if (isset($_POST['id']) &&
		isset($_POST['rand'])) {
		$id = stripcslashes($_POST['id']);
		$rand = stripcslashes($_POST['rand']);
		$dir = '../../images/accounts/account' . '-' . $id . '-' . $rand . '.png';
		if (file_exists($dir)) {
			if(unlink($dir)){
				echo "Successfully delete";
			}else {
				echo "Cant delete file";
			}
		}else {
			echo "Cant find file $dir";
		}
	}
?>