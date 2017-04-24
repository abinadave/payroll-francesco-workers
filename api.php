<?php
	require 'Slim/Slim/Slim.php';
    require 'class/class.functions.php';
    
	\Slim\Slim::registerAutoloader();
	$app = new \Slim\Slim();

	$app->get('/', function(){
		echo "Good";
	});

	$app->post('/debt', function() use ($app){
		echo "Good";
	});
	$app->get('/picture', function() use ($app){
		include_once 'class/class.database.php';
		$handler = Database::connect();
		$sql = "SELECT * FROM pictures ORDER BY id DESC";
		$query = $handler->query($sql);
		$rows = $query->fetchAll(PDO::FETCH_OBJ);
		echo json_encode($rows);
	});	
   
   	$app->delete('/picture/:id', function($id) use ($app){
   		include_once 'class/class.database.php';
		$handler = Database::connect();
		$sql = "SELECT * FROM pictures WHERE id = ?";
		$query = $handler->prepare($sql);
		$query->execute(array(
			$id
		));
		if ($query->rowCount() > 0) {
			$row = $query->fetch(PDO::FETCH_OBJ);
			$sql = "DELETE FROM pictures WHERE id = ?";
			$query = $handler->prepare($sql);
			$rs = $query->execute(array(
				$id
			));
			$url = 'assets/pictures/' . $row->fullname . '.' . $row->ext;
			unlink($url);
			echo json_encode(array('result' => $rs));
		}		
   	});

    $app->get('/limit_absent', function() use ($app){
    	echo "Good thing";
    });

	$app->post('/employee', function() use ($app){
		echo json_encode(array('success' => true));
	});

	$app->get('/payrollemps/partial', function() use ($app){
		include_once 'class/class.database.php';
		$handler = Database::connect();
		$sql = "SELECT * FROM payrollemps WHERE payroll_id IN (SELECT id FROM payrolls)";
		$query = $handler->query($sql);
		$rows = $query->fetchAll(PDO::FETCH_OBJ);
		echo json_encode($rows);
	});

	$app->get('/removed_overtime', function() use ($app){
		$model = new Fn();
		$rows = $model::select('removed_overtimes');
		echo json_encode($rows);
	});

	$app->get('/overtime_payrollemps', function() use ($app){
		$model = new Fn();
		$rows = $model::select('overtime_payrollemps');
		echo json_encode($rows);
	});

	$app->get('/get/:table', function($tbl) use ($app){
		$model = new Fn();
		$resp = $model::select($tbl);
		echo json_encode($resp);
	});

	$app->get('/get_order_by/:table/:index/:type', function($tbl, $index, $type) use ($app){
		$model = new Fn();
		$resp = $model::fetchOrderBy(array(
			'table' => $tbl,
			'index' => $index,
			'type'  => $type
		));
		echo json_encode($resp);
	});

	$app->post('/recycle_employees', function() use ($app){
		$model = new Fn();
		$form = json_decode($app->request()->getBody(), true);
		$id = $form['emp_id'];
		unset($form['emp_id']);
		$form['id'] = $id;
		$resp = $model::save($form);
		echo json_encode($form);
	});

	$app->post('/picture', function() use ($app){
		$model = new Fn();
		$form = json_decode($app->request()->getBody(), true);
		$resp = $model::save($form);
		echo json_encode($resp);
	});

	$app->put('/picture/:id', function($id) use ($app){
		$model = new Fn();
		$form = json_decode($app->request()->getBody(), true);
		$rs = $model::update(array(
			'table'  => 'pictures',
			'values' => array('source' => $form['source']),
			'prop'   => 'id',
			'value'  => $id
		));
		echo json_encode(array('success' => ($rs === 1) ? true : false));
	});

	$app->run();
?>
