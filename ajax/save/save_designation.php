<?php 
	if (isset($_POST['name'])) {
		$name = stripcslashes(trim($_POST['name']));

		include_once '../../class/class.positions.php';
		$positions = new Positions();
		$id = $positions::save($_POST);
		$_POST['id'] = $id;
		?>
			<script>
				var json = <?php echo json_encode($_POST) ?>;
				positions.add(json);
				
			</script>
		<?php
	}
?>