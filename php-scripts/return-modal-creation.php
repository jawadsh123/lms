<?php

  require_once 'mysqli_connect.php';

  $id = $_POST['id'];
  $table_1 = 'issued_books';
  $table_2 = "book_details";

  $query_1 = "SELECT * FROM $table_1 WHERE key_value = $id";
  $result_1 = mysqli_query($dbc, $query_1);

  $row_1 = mysqli_fetch_assoc($result_1);
  $book = $row_1['book_no'];

  $query_2 = "SELECT * FROM $table_2 WHERE book_no = $book";
  $result_2 = mysqli_query($dbc, $query_2);
  $row_2 = mysqli_fetch_assoc($result_2);

  $date = explode(" ", $row_1['time_stamp']);

  $str = <<<EOD
  <div class="flex-box-1">
      <img src="$row_2[cover_path]" alt="Image Unavailable" class="book-cover"/>
      <span><b>$row_2[no_of_copies]</b> Books Available</span>
  </div>

  <div class="flex-box-2">
    <span class="title">$row_2[title]</span>
    <span class="summary"><b>Summary</b> :<br> $row_2[description]</span>
    <span class="author"><span>
      Author : - $row_2[author]
    </span></span>
    <div class="extra-details">
      <span class="borrower">Borrower: <span>$row_1[username]</span></span><br>
      <span class="date">Issue Date: <span>$date[0]</span></span>
    </div>

  </div>

  <div class="button">
    <span>Return</span>
  </div>

  <div class="error">
    <span>Error</span>
  </div>
  <div class="success">
    <span>Success</span>
  </div>

  <div class="close">
    <img src="../images/band-aid.png" />
  </div>
EOD;

  echo $str;


 ?>
