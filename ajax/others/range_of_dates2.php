<?php 

if (isset($_GET['start']) && isset($_GET['end'])) {

		$startDate = $_GET['start'];
		$endDate = $_GET['end'];

	 	$tmpDate = new DateTime($startDate);
	    $tmpEndDate = new DateTime($endDate);

	    $outArray = array();
	    do {
	        $outArray[] = $tmpDate->format('Y-m-d');
	    } while ($tmpDate->modify('+1 day') <= $tmpEndDate);

	    echo json_encode($outArray);
		
	}
?>