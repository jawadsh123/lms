$(function () {

  var formOffset = $('.header').offset().top;
  console.log(formOffset);

  $('.overlay').css({
    'top' : formOffset - 5 +'px'
  });

  $(".signup").click(function() {

    $(".first-wave").addClass("moveFirst");
    $(".second-wave").addClass("moveSecond");
    $(".slide-container").addClass("moveLeft");
    setTimeout(function() {
      $(".first-wave").removeClass("moveFirst");
      $(".second-wave").removeClass("moveSecond");
    }, 1400);
    $('.overlay').css({
      'height' : '450px'
    });

  });

  $('.back').click(function() {

    $(".first-wave").addClass("moveFirst-2");
    $(".second-wave").addClass("moveSecond-2");
    $(".slide-container").removeClass("moveLeft");
    setTimeout(function() {
      $(".first-wave").removeClass("moveFirst-2");
      $(".second-wave").removeClass("moveSecond-2");
    }, 1400);
    $('.overlay').css({
      'height' : '400px'
    });

  });


//Login for alert
  $("#login-btn").click(function functionName() {

    var username = $('#username').val();
    var password = $('#password-1').val();
    var flag = 0;

    if(username == ''){
      $('#username').addClass('warning');
      flag = 1;
    }
    if(password == ''){
      $('#password-1').addClass('warning');
      flag = 1;
    }


    if(flag == 0){

      var data = $("#loginForm").serialize();

      $.ajax({

        type: 'POST',
        url: 'php-scripts/login.php',
        data: data,
        success: function(response)
        {
          console.log(response);
          if (response == "allowed") {
            $(".text-ip").addClass("success");
            setTimeout(function() {
              window.location.replace("html/homepage.html");
            }, 1000);
          } else if (response == "not allowed") {
            $(".disclaimer").addClass("isActive");
          }
        }

      });
    }

  });

  $('#username, #password-1, #logon').click(function() {
    $('#username, #password-1').removeClass('warning success');
    $('.disclaimer').removeClass('isActive');
  });


//Sigup form alert
  $("#signup-btn").click(function functionName() {

    var name = $('#name').val();
    var password = $('#password-2').val();
    var college_id = $('#college_id').val();
    var flag = 0;

    if(name == ''){
      $('#name').addClass('warning');
      flag = 1;
    }
    if(password == ''){
      $('#password-2').addClass('warning');
      flag = 1;
    }
    if(college_id == ''){
      $('#college_id').addClass('warning');
      flag = 1;
    }


    if (flag == 0){

      data = $("#signupForm").serialize();

      $.ajax({
        type: 'POST',
        url: 'php-scripts/signup.php',
        data: data,
        success: function(response) {
          if (response == "data added") {
            $(".text-ip").addClass("success");
            setTimeout(function() {
              location.reload();
            }, 1000);
          } else {
            $(".disclaimer").addClass("isActive");
          }
        }
      });

    }

  });

  $('#name, #password-2, #college_id, #back-bt').click(function() {
    $('#name, #password-2, #college_id').removeClass('warning success');
    $('.disclaimer').removeClass('isActive');
  });

});
