<?php 
	if (isset($_POST['name'])) {
		$name = stripcslashes($_POST['name']);
		$to_remove = '../../images/employees/' . $name;
		if (file_exists($to_remove)) {
			if(unlink($to_remove)){
				echo "Successfully removed";
			}else {
				echo "Cannot remove that file";
			}
		}else {
			echo "Cant find file $to_remove";
		}
		
	}
?>