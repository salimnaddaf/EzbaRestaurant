<?php
session_start();
isset($_SESSION['In']);
isset($_SESSION['In2']);
isset($_SESSION['In3']);
isset($_SESSION['In4']);
?>

<?php

$name = $_SESSION['In'];
$email = $_SESSION['In2'];
$msg = $_SESSION['In3'];
$phone = $_SESSION['In4'];

  $to = "ezba@restatezba.com";
  $headers = "From: $email_from \r\n";
  $headers .= "Reply-To: $visitor_email \r\n";

  $allMsg = $name . ': ' . $msg . '                      ' . $phone;
  mail($to,$email,$allMsg);
 ?>
