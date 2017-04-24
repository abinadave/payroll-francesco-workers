<?php session_start(); if (!isset($_SESSION['id'])) { ?>
<html>
<head>
    <title>Payroll System Login page</title>
    <script src="js/libs/jquery.js"></script>
    <link href="bootstrap/bootstrap/css/bootstrap.css" rel="stylesheet">
    <link href="bootstrap/css/navbar-fixed-top.css" rel="stylesheet">
    <link rel="shortcut icon" href="images/favico.jpg">  
    <link href="bootstrap/css/flat-ui.css" rel="stylesheet">
    <script src="bootstrap/js/bootstrap.min.js"></script>
</head>
<body>
<div class="container" style="text-align:center">

    <form id="form-signin">

      <div class="login">

            <div class="login-screen" style="width: 870px">
              
              <div class="login-icon">
                  <div><img src="bootstrap/images/icons/svg/clipboard.svg" alt="Clipboard"></div>
                  <h4>Welcome to <small>Francesco Payroll System</small></h4>
              </div>

              <div class="login-form">

                <div class="form-group">
                   <input name="username" type="text" class="form-control login-field" value="" placeholder="Username" id="login-name" autofocus/>
                   <label class="login-field-icon fui-user" for="login-name"></label>
                </div>

                <div class="form-group">
                   <input name="password" type="password" class="form-control login-field" value="" placeholder="Password" id="login-pass" />
                   <label class="login-field-icon fui-lock" for="login-pass"></label>
                </div>

                <button id="btn-login" class="btn btn-block btn-info" href="#">Login</button>
                <a></a>

              </div>

              <div id="output-login" style="position: absolute"></div>
              
            </div>

        </div>

    </form>

</div>
<script type="text/javascript" src="js/script.js"></script>
</body> 
</html>
<?php  }else { ?><!DOCTYPE html>
<html>
<head>
  <title>Payroll</title>
  <script src="js/libs/pubnub/pubnub-3.7.1.min.js"></script>
  <link rel="stylesheet" type="text/css" href="js/libs/jquery-ui/jquery-ui.min.css">
  <script data-main="js/main" src="js/require-jquery.js"></script>
  <link href="assets/css/style.css" rel="stylesheet" />
  <link rel="shortcut icon" href="images/favico.jpg"> 
  <link rel="stylesheet" type="text/css" href="js/libs/choosenJS/chosen.min.css"> 
  <!-- <link rel="shortcut icon" href="images/default/favico.png" /> -->
</head>
<body>

<!-- Static navbar -->
    <div class="navbar navbar-default navbar-fixed-top" role="navigation" id="navigation">
      
    </div>

<div id="main"></div>
<div id="placeholder"></div>
<div id="placeholder-id"></div>

<div id="placeholder-modal-create-project"></div>
<div id="placeholder-modal-upload-account-photo"></div>
<div id="placeholder-modal-add-new-emp-in-attendance"></div>
<div id="div-payrollemps-removed"></div>
<div id="output-get-session"></div>

<link href="bootstrap/bootstrap/css/bootstrap.css" rel="stylesheet">
<link href="assets/css/themes/bootstrap.min.yeti.css" rel="stylesheet">
<link href="bootstrap/css/navbar-fixed-top.css" rel="stylesheet">
<link rel="shortcut icon" href="bootstrap/images/ez.png"> 
<!-- <link href="bootstrap/css/flat-ui.css" rel="stylesheet"> -->
<link rel="stylesheet" type="text/css" href="bootstrap/css/style.css">
<link rel="stylesheet" href="bootstrap/font-awesome-4.3.0/css/font-awesome.min.css">
<script src="bootstrap/js/bootstrap.min.js"></script>
<script src="js/script.js"></script>
</body>
</html> 
<?php  } ?>
