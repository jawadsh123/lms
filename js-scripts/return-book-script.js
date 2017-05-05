$(function() {

var global_book_id = '';

/**************************************
******** Catalogue Creation ***********
***************************************/
  $.ajax({

    type: 'POST',
    url: '../php-scripts/return-book-creation.php',
    success: function(response) {

      $('.catalogue').append(response);

    }

  });

/****************************************
********* Catalogue Search **************
*****************************************/

  $('.search-bar').on('keyup',function() {
    var before = $('.search-bar').val();
    setTimeout(function() {
      var after = $('.search-bar').val();
      if (before != after) {
        return;
      }
      else {
        $.ajax({
          type: 'POST',
          dataType: 'json',
          data: { search : after },
          url: "../php-scripts/return-book-search.php",
          success: function(response) {
            display_search(response);
          },
          error: function(xmlhttp) {
            console.log(xmlhttp.responseText);
          }
        });
      }
    }, 500);
  });

  function display_search(array) {
    $('.book-card').each(function() {
      var id = $(this).attr('id');
      if ($.inArray(id, array) !== -1) {
        $(this).css({
          'margin' : '5px',
          'padding' : '10px',
          'height' : '150px',
          'border-width' : '1px',
          'opacity' : '1'
        });
      }
      else {
        $(this).css({
          'margin-top' : '0',
          'padding-top' : '0',
          'margin-bottom' : '0',
          'padding-bottom' : '0',
          'border-bottom' : '0',
          'border-top' : '0',
          'height' : '0',
          'opacity' : '0'
        });
      }
    });
  }


/**************************************
********** Create Modal ***************
***************************************/

  $('.catalogue').on('click', '.book-card', function() {
      var data = $(this).attr('id');
      book_id = parseInt(data);
      global_book_id = book_id;

      $.ajax({
        type: 'POST',
        data: {id : data},
        url: '../php-scripts/return-modal-creation.php',
        success: function (response) {
          console.log(response);
          $('.modal').css({
            'top' : '50%'
          });
          $('.overlay').css({
            'opacity' : '0.5',
            'z-index' : '0',
            'pointer-events' : 'auto'
          });
          $('.modal').append(response);
        }
      });
  });

//close modal on clicking X
  $('.modal').on('click', '.close', function() {

    $('.modal').css({
      'top' : '200%'
    });
    $('.overlay').css({
      'opacity' : '0',
      'pointer-events' : 'none'
    });

    setTimeout(function() {
      $('.modal').empty();
    }, 300);

  });


/***********************************
**** Insert return data in DB *******
************************************/

  $('.modal').on('click','.button', function() {
    $.ajax({
      type: 'POST',
      data: { id : global_book_id },
      url: "../php-scripts/return-book-insert.php",
      success: function(response) {
        console.log(response);
        if (response == "noSuccess") {
          $('.error').css({'height' : '50px', 'opacity' : '1'});
          setTimeout(function() {
            $('.error').css({'height' : '0', 'opacity' : '0'});
          }, 1500);
        }
        else {
          $('.success').css({'height' : '50px', 'opacity' : '1'});
          setTimeout(function() {
            $('.success').css({'height' : '0', 'opacity' : '0'});
            $('.close').click();
          }, 1500);
        }
      }
    });
  });


});
