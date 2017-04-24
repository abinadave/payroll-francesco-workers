<?php 
	if (isset($_POST['filename']) && isset($_POST['id'])) {
	 	$name = stripcslashes($_POST['filename']);
	 	$id = stripcslashes($_POST['id']);
	 	$rand = rand(10000,99999);
	 	$old = "../../images/accounts/$name";
		$new = '../../images/accounts/account-' . $id . '-'. $rand . '.png';
	 	if(rename($old, $new)){
	 		include_once '../../class/class.accounts.php';
	 		$accounts = new Accounts();
	 		if($accounts::updatePhoto($id, $rand)){ 
	 			?>

	 				<script type="text/javascript">
	 					var id = <?php echo $id ?>;
	 					var random = <?php echo $rand ?>;
	 					var acc = accounts.get(id);
	 					acc.set({rand: random.toString()});
	 				</script>

                <?php 

                
            }

	 	}else {
	 		echo "Cant find photo";
	 	}

	}
?>