<?php

  require_once "mysqli_connect.php";

  if (!empty($_POST)) {

    $table_name = "user_details";

    $query = "SELECT * FROM $table_name WHERE username = '$_POST[username]'";
    $result = mysqli_query($dbc, $query);
    $flag = 0;

    //check if username exists in database
    if (mysqli_num_rows($result) > 0) {
      $row = mysqli_fetch_assoc($result);

      //check if entered password is same as that in database
      if ($_POST['password'] == $row['password']){
        echo "allowed";
        $flag = 1;
      }
    }
    if ($flag == 0) {
      echo "not allowed";
    }

  }

 ?>
