<?php

  require_once 'mysqli_connect.php';
  $table_1 = "issued_books";
  $table_2 = "book_details";

  $issue_detail_query = "SELECT key_value, username, book_no, DATE(time_stamp) AS time_stamp FROM $table_1";
  $result = mysqli_query($dbc, $issue_detail_query);

  while ($row = mysqli_fetch_assoc($result)) {

    $book_detail_query = "SELECT * FROM $table_2 WHERE book_no = '$row[book_no]'";
    $result_2 = mysqli_query($dbc, $book_detail_query);
    $book_details = mysqli_fetch_assoc($result_2);

    $str = <<<EOD
    <div class="book-card" id="$row[key_value]">

      <img src="$book_details[cover_path]" class="book-cover"/>
      <div class="user-name-2">
        <span>&#8226 $row[username]</span>
      </div>

      <div class="title">
          <span class="name">$book_details[title]</span>
          <span class="author">- $book_details[author]</span>
      </div>

      <div class="edition">
        <span>Edition :</span>
        <span class="edition-no">$book_details[edition]</span>
      </div>

      <div class="issue-date">
        <span>Issue date: </span>
        <span class="date">$row[time_stamp]</span>
      </div>
    </div>
EOD;

  echo $str;

  };

 ?>
