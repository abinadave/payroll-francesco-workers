<?php 
	if (isset($_POST['username']) &&
		isset($_POST['password'])) {
	   	include_once '../../class/class.accounts.php';
	   	$accounts = new Accounts();
	   	$json = $accounts::verify($_POST); 
	   	if ($json) {
	   		?>
	   			<script>

	   			var json = <?php echo json_encode($json) ?>;
	   			
	   			$.each(json, function(index, val) {
	   				 sessionStorage.setItem(index, val);
	   			});

	   			setTimeout(function() {
	   				 window.location = '.';
	   			}, 500)
	   			
	   			</script>
	   		<?php
	   	}else {
	   		include_once '../../class/class.employees.php';
			$emp = new Employees();
			$json = $emp::verify_employee($_POST);
			if ($json['result']) {
				?>
					<script type="text/javascript">
					var json = <?php echo json_encode($json) ?>;
					
					$.each(json, function(index, val) {
						sessionStorage.setItem(index, val);
					});

						setTimeout(function() {
							window.location = 'viewsalary.php'; 
						}, 500);

					</script>
				<?php
				
			}else {
				 echo'<div class="alert alert-danger" role="alert" style="margin-top:5px;">
        			  	<strong>Incorrect!</strong> Username Or Password .
      				  </div><script type="text/javascript">$("#btn-login").prop("disabled", false);$("#btn-login").text("Login");</script>';
				exit();
			}
	   	}
	}
?>