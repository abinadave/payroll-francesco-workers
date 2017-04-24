<?php 
	if (isset($_POST['location'])) {

		include_once '../../class/validator/Validator.php';
		$v = new Valitron\Validator($_POST);
		$v->rule('required', ['location']);
		if ($v->validate()) {
			include_once '../../class/class.projects.php';
			$projects = new Projects();
			$id = $projects::save($_POST);
			if ($id) {
				$_POST['id'] = $id;
				?>
					<script>
						var json = <?php echo json_encode($_POST) ?>;
						projects.function.saveModel(json, 0);
						$('#form-add-project')[0].reset();
                   		$('#form-add-project').find('#location').focus();
					</script>
				<?php
			}
		}else {
			#print_r($v->errors());	
			?>
				<div class="alert alert-danger alert-dismissable" style="font-size: 15px"> 
                    <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>
                         <?php foreach ($v->errors() as $key => $errors) {  ?>
                         	 <?php foreach($errors as $value) { ?>
                         	 	<?php echo $value . "<br/>"; ?>
                        	 <?php } ?>
                         <?php } ?>	
               </div>

			<?php
		}
	}
?>