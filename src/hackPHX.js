$(function(){

  var text = "are you ready to hack?";
  var consoletext = $('.consoletext').first();
  var flasher = $('.flasher').first();

  var cursor = (function(){
    return _.throttle(function(idx){
      if(idx < text.length){
        flasher.toggle();
        cursor(idx + 1);
      }
    }, 200);
  }());

  var recurse = (function(){
    return _.throttle(function(idx){
      if(idx < text.length){
        consoletext.append(text[idx]);
        recurse(idx + 1);
      } else {
        flasher.hide();
      }
    }, 250);
  }());

  recurse(0);
  cursor(0);

  $('.collapser').on('click', function(e){
    $('.collapser i').addClass('icon-caret-right');
    $('.collapsible').removeClass('in');
    $(this).find('i').removeClass('icon-caret-right').addClass('icon-caret-down');
    $(this).next('.collapsible').addClass('in');
  });

});
