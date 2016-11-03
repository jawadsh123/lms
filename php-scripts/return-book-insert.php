<?php

  require_once "mysqli_connect.php";
  $data = $_POST['id'];
  $table_1 = "issued_books";
  $table_2 = "book_details";

  $query_1 = "SELECT book_no FROM $table_1 WHERE key_value = $data";
  $query_2 = "UPDATE $table_2 SET no_of_copies = no_of_copies+1 WHERE book_no in ($query_1)";
  $query_3 = "DELETE FROM $table_1 WHERE key_value = $data";

  $result_1 = mysqli_query($dbc, $query_2);
  $result_2 = mysqli_query($dbc, $query_3);

  if($result_1 and $result_2)
  {
    echo "success";
  }
  else {
    echo "noSuccess";
  }

 ?>
