<?php 
	if (isset($_POST)) {
		include_once '../../class/class.accounts.php';
		$accounts = new Accounts();
		$json = $accounts::getOnlineUsers();
		if (!$json) {
			echo "<span class='text-danger'>No active users.</span>";
		}else {
			foreach ($json as $key => $users) {
				?>
					<div class="chat-box-online-left">
		                <img style="min-height: 35px; min-width: 40px" src="images/accounts/account-<?php echo $users['id']; ?>-<?php echo $users['rand']; ?>.png" alt="bootstrap Chat box user image" class="img-circle" />
		                - <a href="#show-chatbox/<?php echo $users['id']; ?>" class="text-info"><?php echo ucfirst($users['firstname']) .' '.ucfirst($users['lastname']);  ?></a>
		                <br />
		               
		            </div>
	            <?php
			}
		}
		
	}
?>