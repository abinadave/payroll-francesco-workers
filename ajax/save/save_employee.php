<?php 

	if (isset($_POST['firstname']) &&
		isset($_POST['middlename']) &&
		isset($_POST['lastname']) &&
		isset($_POST['rpd']) &&
		isset($_POST['position']) &&
		isset($_POST['gender']) &&
		isset($_POST['location']) &&
		isset($_POST['rice_allowance'])) {

		include_once '../../class/validator/Validator.php';

		$v = new Valitron\Validator($_POST); $v->rule('required', ['firstname', 'middlename','lastname','rpd','position','gender','location','rice_allowance']); $v->rule('numeric', 'rpd');
		// $v->rule('contains',';', ['firstname','middlename','lastname']); 
		if($v->validate()) {
		 	include_once '../../class/class.employees.php';
		 	$Employees = new Employees();
		 	$result = $Employees->save($_POST);

		 	if ($result > 0) {
		 		$_POST['id'] = $result;
			 		?>
			 			<script>
			 				var json = <?php echo json_encode($_POST) ?>;
			 				employees.function.saveModel(json, 0);
			 				$('#form-add-employee')[0].reset();
                   			$('#form-add-employee').find('#firstname').focus();
                   			$('#modalCreateEmployee').modal('hide');
                   			$('#modalUploadPhotoEmployee').modal({
							   backdrop: 'static',
							   keyboard: true
							});
							employees.empId = json.id;
			 			</script>
			 		<?php
		 	}else {
		 		
		 	}
		} else {
		       ?>
		       		<div class="alert alert-warning alert-dismissable" style="width: 350px; font-size: 13px; text-align: left">
                       <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>
		       <?php 

				    foreach ($v->errors() as $key => $error) {
				    	foreach ($error as $key => $value) {
				    		echo $value . "<br/>";
				    	}
				    }

			    ?>
			    	</div>
			    <?php
		}
	}
?>