<?php 
	if (isset($_POST['filename']) && isset($_POST['employee'])) {
		$employee = $_POST['employee'];
		$fullname = $employee['firstname'] . ' ' . $employee['lastname']; 
		$filename = $_POST['filename'];
		$ext = $_POST['ext'];
		$file1 = "../../assets/pictures/$filename";
		if (is_file($file1)) {
			$randomId = rand(0, 9999999);
			$newFilename = $fullname . '.' . $ext; 
			$file2 = "../../assets/pictures/$newFilename";
			rename($file1, "../../assets/pictures/". $newFilename);
			echo json_encode(array('filename' => $newFilename));
		}
		// echo $employee['firstname'];
		// print_r($_POST);
	}
?>