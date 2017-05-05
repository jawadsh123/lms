<?php

  require_once "mysqli_connect.php";

  $table_name = "book_details";
  $search_term = $_POST['search'];

  $query = "SELECT book_no FROM $table_name WHERE title LIKE '%$search_term%' OR author LIKE '%$search_term%'";
  $result = mysqli_query($dbc, $query);
  $array = array();

  while ($row = mysqli_fetch_assoc($result)) {
    $array[] = $row['book_no'];
  }

  echo json_encode($array);

 ?>
