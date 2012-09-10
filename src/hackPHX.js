$(function(){

  $('html').on('click', function(e){
    $('.modal').addClass('hide');
  });

  $('a').on('click', function(e){
    e.stopPropagation();

    var href = $(this).attr('href');
    if(href.substring(0, 1) === '#'){
      e.preventDefault();
      $('.modal').addClass('hide');
      $(href).removeClass('hide');
    }

  });

  $('.modal-header i.icon-remove').on('click', function(e){
    $(this).parents('.modal').addClass('hide');
  });

});
