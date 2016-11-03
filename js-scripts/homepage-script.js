$(function() {
  var before = 0;

  $(window).on('scroll', function() {
    var after = $('body').scrollTop();
    var div_offset = $('.first-div').offset().top - 50;
    if( before < div_offset && after >= div_offset ){
      $('.navbar').addClass('navbar-dark');
    }
    if(before > div_offset && after <= div_offset){
      $('.navbar').removeClass('navbar-dark');
    }
    before = after;
  });

});
