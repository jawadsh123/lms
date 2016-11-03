<?php

  require_once "mysqli_connect.php";

  $data = $_POST['data'];

  $query = "SELECT * FROM user_details WHERE username LIKE '%$data%'";
  $result = mysqli_query($dbc, $query);
  $array = array();

  while ($row = mysqli_fetch_assoc($result)) {
    $array[] = $row['username'];
  }

  if ($data == ''){
    $array = array();
  }

  echo json_encode($array);

 ?>
