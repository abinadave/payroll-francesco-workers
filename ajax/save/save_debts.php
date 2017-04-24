<?php 
	if (isset($_POST)) {
		include '../../class/class.accounts.php';
		$accounts = new Accounts();
		$result = $accounts::saveDebt($_POST);
		if ($result) {
			?>
				<script>
						var json = <?php echo json_encode($_POST) ?>;
						debts.function.saveModel(json, 0);
				</script>
			<?php
		}
	}
?>