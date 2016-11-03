<?php

  require_once "mysqli_connect.php";
  $data = $_POST['user'];
  $book_id = $_POST['book_no'];
  $select_table = "user_details";
  $insert_table = "issued_books";
  $update_table = "book_details";

  $select_query = "SELECT COUNT(username) AS count FROM $select_table WHERE username = '$data'";
  $result_select = mysqli_query($dbc, $select_query);

  $row = mysqli_fetch_assoc($result_select);

  if ($row['count'] == '0') {
    echo 'noUser';
    exit();
  }
  else {
    $insert_query = "INSERT INTO $insert_table (username, book_no)
                      VALUES ('$data', $book_id)";
    $result = mysqli_query($dbc, $insert_query);
    $update_query = "UPDATE $update_table SET no_of_copies = no_of_copies-1
                     WHERE book_no = '$book_id' AND no_of_copies > 0";
    $result = mysqli_query($dbc, $update_query);                 
  }

 ?>
