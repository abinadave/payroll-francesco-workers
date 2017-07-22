<?php
	date_default_timezone_set('Asia/Manila');
	include_once 'Slim/Slim/Slim.php';
    include_once 'class/class.functions.php';
    
	\Slim\Slim::registerAutoloader();
	$app = new \Slim\Slim();

	$app->get('/', function(){
		require 'app.php';
	});


	$app->post('/account', function() use ($app){
		$data = json_decode($app->request()->getBody());
		include_once 'class/class.database.php';
		include_once 'class/class.accounts.php';
		$accounts = new Accounts();
		$id = $accounts::createId();
		$sanitized = $accounts::sanitize($data->password);
		$handler = Database::connect();
		$sql = "INSERT INTO accounts SET id = ?, firstname = ?, middlename = ?, lastname = ?, usertype = ?, contact = ?, email = ?, gender = ?, address = ?, username = ?, password = ?";
		$query = $handler->prepare($sql);
		$rs = $query->execute(array(
			$id, $data->firstname, $data->middlename, $data->lastname, $data->usertype, $data->contact, $data->email, $data->gender, $data->address, $data->username, $sanitized
		));
		echo json_encode(array('success' => $rs));
	});

	$app->post('/payrollemp', function() use ($app){
		if (isset($_POST)) {
			$nod = $_POST['nod'];
			$id = $_POST['id'];
			$model = $_POST['model'];
			include_once 'class/class.payrollemps.php';
			$payrollemps = new Payrollemps();
			$payrollemps->update($nod, $model, $id);
		}
	});

	$app->post('/update_nod', function() use ($app){
		if (isset($_POST['id'])) {
			include_once 'class/class.saved_dtrs.php';
			$saved_dtr = new Saved_dtrs();
			$saved_dtr->countNumOfDays($_POST);
		}else {
			echo "Not found";
		}
	});

	$app->put('/saved_dtr', function() use ($app){
		$data = json_decode($app->request()->getBody());
		include_once 'class/class.saved_dtrs.php';
		$saved_dtr = new Saved_dtrs();
		$saved_dtr->update($data);
		// echo $data->id;
	});

	$app->get('/saved_dtr/:id', function($id) use ($app){
		include_once 'class/class.saved_dtrs.php';
		$saved_dtr = new Saved_dtrs();
		$saved_dtr->fetchById($id);
	});

	$app->post('/saved_dtr', function() use ($app){
		$dtrs = $_POST['dtr'];
		$pid  = $_POST['pid'];
		$file = 'class/class.saved_dtrs.php';
		if (is_file($file)) {
			include_once $file;
			$saved_dtr = new Saved_dtrs();
			$saved_dtr->save($dtrs, $pid);
		}
 	});

	$app->get('/limit_absent', function() use ($app){
		$model = new Fn();
		$model::getLimitOfAbsent();
	});

	$app->put('/limit_absent', function() use ($app){
		$model = new Fn();
		$data = json_decode($app->request()->getBody(), true);
		$rs = $model::update(array(
			'table'  => 'limit_absents',
			'values' => array('value' => $data['value']),
			'prop'   => 'id',
			'value'  => $data['id']
		));
		echo json_encode(array('success' => $rs));
	});

	$app->run();
?>
