<?php
session_start();
$usernamelogin = $_POST['username'];
$userEmail = $_POST['email'];
$userMessage = $_POST['message'];
$userPhone = $_POST['phone'];

    $_SESSION['In']=$usernamelogin;
    $_SESSION['In2']=$userEmail;
    $_SESSION['In3']=$userMessage;
    $_SESSION['In4']=$userPhone;

   echo '<script type="text/javascript"> window.open("form-to-email.php","_self");</script>';

?>
