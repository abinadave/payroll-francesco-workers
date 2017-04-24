<?php 
	if (isset($_POST)) {
		include_once '../../class/validator/Validator.php';
		$v = new Valitron\Validator($_POST);
		$v->rule('required', ['firstname','middlename','lastname','usertype','contact','email','gender','address','username','password']);
		$v->rule('email','email');
		$v->rule('numeric','contact');
		$v->rule('alphaNum', ['username','password']);
		$valid = false;
		if ($v->validate()) {
			$valid = true;
			include_once '../../class/class.accounts.php';
			$accounts = new Accounts();
			$response = $accounts::save($_POST);
			$_POST['id'] = $response['id'];
			unset($_POST['password']);
			$_POST['password'] = $response['password'];
			?>
				<script>
					var json = <?php echo json_encode($_POST) ?>;
					accounts.function.saveModel(json, 0);
				</script>
			<?php
		}else {
			$valid = false;
			?><div class="alert alert-danger alert-dismissable" style="width: 300px; margin: 70px 0 0 0; font-size: 15px"> <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>
			<?php
				
				foreach ($v->errors() as $key => $error) {
					foreach ($error as $key => $value) {
						echo $value . "<br/>";
					}
				}

			?></div><?php
		}
	}
?>