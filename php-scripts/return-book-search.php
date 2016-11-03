<?php

  require_once "mysqli_connect.php";

  $search_term = $_POST['search'];
  $book_table = "book_details";
  $issue_table = "issued_books";
  $array = [];

  $sub_query = "SELECT book_no FROM $book_table WHERE title LIKE '%$search_term%'";
  $query = "SELECT key_value FROM $issue_table
            WHERE username LIKE '%$search_term%' OR book_no IN ($sub_query)";
  $result = mysqli_query($dbc, $query);

  while ($row = mysqli_fetch_assoc($result)) {
    $array[] = $row['key_value'];
  }
  echo json_encode($array);

 ?>
