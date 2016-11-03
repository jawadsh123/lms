
$(function() {

/**************************************
******** Catalogue Creation ***********
***************************************/

  $.ajax({

    type: 'POST',
    url: '../php-scripts/catalogue-creation.php',
    success: function(response_html) {
      $(".catalogue").append(response_html);
    }

  });



/*************************************
********* Search on typing ***********
**************************************/
  $(".search-bar").on('keyup',function() {

    var before = $(this).val();
    setTimeout(function() {
      after = $(".search-bar").val();
      if (before != after) {
        return ;
      }
      else{

        $.ajax({

          type: 'POST',
          url: '../php-scripts/catalogue-search.php',
          data: {search: after},
          dataType: 'json',
          success: function(result) {
            console.log(result);
            $('.book-card').each(function() {

              var id = $(this).attr('id');
              if ($.inArray(id, result) !== -1) {
                $(this).css({
                  'margin-left' : '15px',
                  'margin-right' : '15px',
                  'width' : '300px',
                  'opacity' : '1'
                });
              }
              else {
                $(this).css({
                  'margin-left' : '0',
                  'margin-right' : '0',
                  'width' : '0',
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
        url: '../php-scripts/catalogue-modal-creation.php',
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



});
