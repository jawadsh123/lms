<?php

  require_once "mysqli_connect.php";

  $table_name = "book_details";
  $query = "SELECT book_no, title, author, no_of_copies, cover_path FROM $table_name";
  $result = mysqli_query($dbc, $query);

  //Iterate over each result
  while($row = mysqli_fetch_assoc($result)) {

    //The container that contains info of single book
    $str = <<<FILE
    <div class="book-card" id="$row[book_no]">
      <img src="$row[cover_path]" class="book-cover"/>
      <div class="details">
        <span class="title">$row[title]</span>
        <span class="author">- $row[author]</span>
        <span class="no-of-books">Books Available: $row[no_of_copies]</span>
      </div>
    </div>
FILE;
//delimiter should not be tabbed

    echo $str;

  }


 ?>
