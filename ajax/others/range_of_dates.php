<?php 

if (isset($_POST['start']) && isset($_POST['end'])) {

		$startDate = $_POST['start'];
		$endDate = $_POST['end'];

	 	$tmpDate = new DateTime($startDate);
	    $tmpEndDate = new DateTime($endDate);

	    $outArray = array();
	    do {
	        $outArray[] = $tmpDate->format('Y-m-d');
	    } while ($tmpDate->modify('+1 day') <= $tmpEndDate);

	    echo json_encode($outArray);
	  
		?>
			<script type="text/javascript">
					var json = <?php echo json_encode($outArray) ?>;
					attendances.function.catchDate(json);
			</script>
		<?php
	}
?>