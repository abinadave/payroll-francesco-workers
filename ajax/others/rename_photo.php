<?php 
	if (isset($_POST['id']) &&
		isset($_POST['name'])) {
		$id = stripcslashes($_POST['id']);
		$name = stripcslashes($_POST['name']);
		$rand = rand(1, 9000);
		$old = "../../images/employees/$name";
		$new = '../../images/employees/emp-' . $id . '-'. $rand . '.png';
		if (rename($old, $new)) {
			include_once '../../class/class.employees.php';
			$emp = new Employees();
			$result = $emp::updateRand($id, $rand);
			if ($result) {
				?>
					<script type="text/javascript">
						var emp_id = <?php echo $id ?>;
						var emp_rand = <?php echo $rand ?>;
						var new_id = emp_id.toString();
						var new_rand = emp_rand.toString();

						employees.function.removeFile(new_id, new_rand);
					</script>
				<?php
			}
		}else {
			echo "Failed !";
		}
		
	}
?>