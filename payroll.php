<?php 
date_default_timezone_set('Asia/Manila');
session_start();
  if (!isset($_SESSION['id'])) {
      header('Location: index.php');
  }
?>

<!DOCTYPE html>
<html>
<head>
	<title>Payroll</title>
  <script src="js/libs/pubnub/pubnub-3.7.1.min.js"></script>
  <link rel="stylesheet" type="text/css" href="js/libs/jquery-ui/jquery-ui.min.css">
  <script data-main="js/main" src="js/require-jquery.js"></script>
  <link href="assets/css/style.css" rel="stylesheet" />
  <link rel="shortcut icon" href="bootstrap/images/ez.png"> 
  <link rel="stylesheet" type="text/css" href="js/libs/choosenJS/chosen.min.css"> 
  <link rel="shortcut icon" href="images/favico.jpg" />
</head>
<body>

<!-- Static navbar -->
    <div class="navbar navbar-inverse navbar-fixed-top" role="navigation" id="navigation">
      
    </div>

<div id="main"></div>
<div id="placeholder"></div>

<div id="placeholder-modal-create-project"></div>
<div id="placeholder-modal-upload-account-photo"></div>
<div id="placeholder-modal-add-new-emp-in-attendance"></div>
<div id="div-payrollemps-removed"></div>
<div id="output-get-session"></div>

<link href="bootstrap/bootstrap/css/bootstrap.css" rel="stylesheet">
<link href="bootstrap/css/navbar-fixed-top.css" rel="stylesheet">
<link rel="shortcut icon" href="bootstrap/images/ez.png"> 
<link href="bootstrap/css/flat-ui.css" rel="stylesheet">
<link rel="stylesheet" type="text/css" href="bootstrap/css/style.css">
<link rel="stylesheet" href="bootstrap/font-awesome-4.3.0/css/font-awesome.min.css">
<script src="bootstrap/js/bootstrap.min.js"></script>
<script src="js/script.js"></script>
</body>
</html>