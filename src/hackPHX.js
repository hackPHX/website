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

  $('.email-subscribe').on('click', function(e){
    $('.loading').removeClass('hide');

    var email = $('.email').val();
    var fname = $('.first-name').val();
    var lname = $('.last-name').val();

    $.ajax({
      url: window.location.protocol + '//' + window.location.hostname + ':8080',
      data: {
        email: email,
        firstName: fname,
        lastName: lname
      },
      dataType: 'jsonp',
      success: function(response){
        $('.loading').addClass('hide');

        if(response && response.error){
          $('.response').removeClass('alert-success').addClass('alert alert-error');
          $('.response').html(response.error);
        } else if(response && response.success){
          $('.response').removeClass('alert-error').addClass('alert alert-success');
          $('.response').html(response.success);
        }
      }
    });
  });

});
