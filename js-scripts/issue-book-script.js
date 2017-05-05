$(function() {
  var book_id = '';

/**************************************
******** Catalogue Creation ***********
***************************************/
  $.ajax({

    type: 'POST',
    url: '../php-scripts/issue-book-creation.php',
    success: function(response) {

      $('.catalogue').append(response);

    }

  });


/*************************************
********* Search on typing ***********
**************************************/

  $(".search-bar").on('keyup',function() {

    var before = $(this).val(); //store value
    setTimeout(function() {
      after = $(".search-bar").val();
      if (before != after) { //compare with new value
        return ;
      }
      else{

        $.ajax({

          type: 'POST',
          url: '../php-scripts/catalogue-search.php',
          data: {search: after},
          dataType: 'json',
          success: function(result) {
            $('.book-card').each(function() {
              var id = $(this).attr('id');
              if ($.inArray(id, result) !== -1) {
                $(this).css({
                  //if value is in the result array expand the card
                  'margin-top' : '5px',
                  'margin-bottom' : '5px',
                  'height' : '200px',
                  'padding' : '10px',
                  'opacity' : '1'
                });
              }
              else {
                $(this).css({
                  //if value is not in result array then collapse the card
                  'margin-top' : '0',
                  'margin-bottom' : '0',
                  'height' : '0',
                  'padding-top' : '0',
                  'padding-bottom' : '0',
                  'opacity' : '0'
                });
              }
            });
          }

        });

      }
    }, 500);
  });



/**************************************
********** Create Modal ***************
***************************************/

  $('.catalogue').on('click', '.book-card', function() {
      var data = $(this).attr('id');
      book_id = parseInt(data);

      $.ajax({
        type: 'POST',
        data: {id : data},
        url: '../php-scripts/modal-creation.php',
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


/*********************************
***** Search username in modal ***
**********************************/

  $('.modal').on('keyup','.user-name-search',function() {

    var before = $('.user-name-search').val();
    setTimeout(function() {
      var after = $('.user-name-search').val();
      if (before != after) {
        return;
      }
      else {
        $.ajax({
          type: 'POST',
          data: { data : after },
          dataType: 'json',
          url: "../php-scripts/username_search.php",
          success: function (response) {

            $('.user li').each(function() {
              var value = $(this).html();
              if ($.inArray(value, response) !== -1) {
                $(this).css({
                  'height' : '30px',
                  'margin-top' : '1px',
                  'padding-left' : '5px',
                  'padding-top' : '5px',
                  'border' : '1px solid #1abc9c',
                  'opacity' : '1'
                });
              }
              else {
                $(this).css({
                  'height' : '0',
                  'margin-top' : '0',
                  'padding-left' : '0',
                  'padding-top' : '0',
                  'border' : 'none',
                  'opacity' : '0'
                });
              }
            });

          }
        });
      }
    }, 500);

  });

//on clicking the username
  $(".modal").on('click', '.user li', function() {
    var value = $(this).html();
    $('.user-name-search').val(value);
    $('.user li').each(function() {
      $(this).css({
        'height' : '0',
        'margin-top' : '0',
        'padding-left' : '0',
        'padding-top' : '0',
        'border' : 'none',
        'opacity' : '0'
      });
    });
  });

/***********************************
**** Insert issue data in DB *******
************************************/

  $('.modal').on('click','.button', function() {
    var data = $('.user-name-search').val();
    $.ajax({
      type: 'POST',
      data: { user : data , book_no : book_id},
      url: "../php-scripts/issued-book-insert.php",
      success: function(response) {
        if (response == "noUser") {
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
