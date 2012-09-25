$(function(){

  $('.collapser').on('click', function(e){
    $('.collapser i').addClass('icon-caret-right');
    $('.collapsible').removeClass('in');
    $(this).find('i').removeClass('icon-caret-right').addClass('icon-caret-down');
    $(this).next('.collapsible').addClass('in');
  });

});
