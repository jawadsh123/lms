<?php

  require_once 'mysqli_connect.php';

  $id = $_POST['id'];
  $table_name = 'book_details';

  $query = "SELECT * FROM $table_name WHERE book_no = $id";
  $result = mysqli_query($dbc, $query);

  $row = mysqli_fetch_assoc($result);

  $str = <<<EOD
  <div class="flex-box-1">
      <img src="$row[cover_path]" alt="Image Unavailable" class="book-cover"/>
      <span><b>$row[no_of_copies]</b> Books Available</span>
  </div>

  <div class="flex-box-2">
    <span class="title">$row[title]</span>
    <span class="summary"><b>Summary</b> :<br> $row[description]</span>
    <span class="author"><span>
      Author : - $row[author]
    </span></span>
    <div class="extra-details">
      <span class="category">Category: <span>$row[category]</span></span>
      <span class="edition">Edition: <span>$row[edition]</span></span><br>
      <span class="isbn">ISBN No: <span>$row[isbn_no]</span></span>
    </div>

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
