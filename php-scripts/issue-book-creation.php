<?php

  require_once 'mysqli_connect.php';

  $table_name = 'book_details';
  $query = "SELECT * FROM $table_name";

  $result = mysqli_query($dbc, $query);

  while ($row = mysqli_fetch_assoc($result)) {

    $str = <<<EOD
    <div class="book-card" id="$row[book_no]">
      <img src="$row[cover_path]" class="book-cover"/>
      <div class="title">
          <span class="name">$row[title]</span>
          <span class="author">- $row[author]</span>
      </div>

      <div class="summary">
        <span>$row[description]</span>
      </div>

      <div class="no-of-books">
        <span class="number">$row[no_of_copies]</span>
        <span>Books Available</span>
      </div>
    </div>
EOD;

  echo $str;

  }

 ?>
