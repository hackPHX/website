$(function(){
  $(document).ready(function() {
    var text = ">> are you ready to hack?";
    var intervalId;
    var consoletext = $('.consoletext').first();
    var flasher = $('.flasher').first();
    var type = function() {
      var currentText = consoletext.text();
      var currentIdx  = currentText.length;

      var nextChar = text[currentIdx++];
      if(nextChar) {
        consoletext.append(nextChar);
      }
    };
    var flash = function() {
      flasher.toggle();
    };

    setInterval(type, 250);
    setInterval(flash, 200);
  });

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

});
