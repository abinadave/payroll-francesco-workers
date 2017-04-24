<?php 
	if (isset($_POST['date_from']) &&
		isset($_POST['date_to']) &&
		isset($_POST['total']) &&
		isset($_POST['advances_total']) &&
		isset($_POST['sss_total']) &&
		isset($_POST['phil_total']) &&
		isset($_POST['net']) &&
		isset($_POST['date']) &&
		isset($_POST['time'])) {
		# code...

		#echo "<pre>", print_r($_POST) ,"<pre>";

		include_once '../../class/class.payrolls.php';
		$payrolls = new Payrolls();
		$data = $payrolls::save($_POST);

		echo $data['id'];

		if ($data['id'] > 0) {
			$_POST['id'] = $data['id'];
			$_POST['personnel'] = $data['personnel'];
			?>
				<script>
					var json = <?php echo json_encode($_POST) ?>;
					payrolls.function.saveModel(json, 0);
				</script>
			<?php
		}
	}
?>