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

  $('.modal').on('click', function(e){
    e.stopPropagation();
  });

  $('.modal-header i.icon-remove').on('click', function(e){
    $(this).parents('.modal').addClass('hide');
  });

  $('a.hideaway').on('click', function(e){
    var targetId = e.target.getAttribute('name'),
        hideableElement = $('#' + targetId).first(),
        totalHeight = 0;

    if( hideableElement.toggleClass('x-show').hasClass('x-show') ){
      hideableElement.children().each(function(){
        totalHeight = totalHeight + $(this).height();
      });

      hideableElement.height(totalHeight);
    } else {
      hideableElement.height(0);
    }

  });

});

