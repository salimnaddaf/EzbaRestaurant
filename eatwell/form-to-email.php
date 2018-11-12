<?php
  $to = "yourname@yourwebsite.com";
  $headers = "From: $email_from \r\n";
  $headers .= "Reply-To: $visitor_email \r\n";
  mail($to,$visitor_email,$email_body,$headers);
 ?>
