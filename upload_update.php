<?php 

	$path = 'images/employees/'. $_GET['qqfile'];

	$input = fopen("php://input", "r");
	$temp = tmpfile();
	$realSize = stream_copy_to_stream($input, $temp);
	fclose($input);

	$target = fopen($path, "w");
	fseek($temp, 0, SEEK_SET);
	stream_copy_to_stream($temp, $target);
	fclose($target);

	$result = array('success' => true);
	echo json_encode($result);
	
?>
