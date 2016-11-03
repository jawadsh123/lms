<?php

  $hostname = "mysql11.000webhost.com";
  $dbname = "a9771193_test3";
  $username = "a9771193_admin";
  $pass = "password";

  //create the connection
  $dbc = mysqli_connect($hostname, $username, $pass, $dbname);

  //check connection
  if (!$dbc){
    die("Error Occured: " . mysqli_connect_error());
  }
  else {

  }


 ?>
