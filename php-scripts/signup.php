<?php

  require_once "mysqli_connect.php";

  if (!empty($_POST)){

    $table_name = "user_details";

    $query = "INSERT INTO $table_name (username, college_id, password)
              VALUES ('$_POST[newUsername]', $_POST[collegeId], '$_POST[newPassword]')";

    if(mysqli_query($dbc, $query)){
      echo "data added";
    } else {
      echo "error";
    }

  }

 ?>
