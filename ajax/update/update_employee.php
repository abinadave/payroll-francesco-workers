<?php 
	if (isset($_POST['firstname']) &&
		isset($_POST['middlename']) &&
		isset($_POST['lastname']) &&
		isset($_POST['position']) &&
		isset($_POST['location']) &&
		isset($_POST['gender']) &&
		isset($_POST['rpd']) &&
		isset($_POST['pid']) &&
		isset($_POST['rice_allowance'])) {

		#echo "<pre>", print_r($_POST) ,"</pre>";

		include_once '../../class/validator/Validator.php';
		$v = new Valitron\Validator($_POST);
		$v->rule('required', ['firstname', 'middlename', 'lastname','position','location','gender','rpd','rice_allowance']);
		$v->rule('numeric', ['rpd']);
		if ($v->validate()) {
			include_once '../../class/class.employees.php';
			$employees = new Employees();
			$result = $employees::update($_POST);
			if ($result) {
				?>
					<script type="text/javascript">
							var json = <?php echo json_encode($_POST) ?>;
							employees.function.updateModel(json);
							router.alertify_success('Employee Successfully updated');
					</script>
				<?php
			}
		}else {
			print_r($v->errors());
		}
	}
?>