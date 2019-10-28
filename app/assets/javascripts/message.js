$(function(){
  let buildMessageHTML = function(message) {
    if (message.content && message.image.url) {
      var html = '<div class="massage" data-id=' + message.id + '>' +
        '<div class="massage__top">' +
          '<div class="massage__top__name">' +
            message.user_name +
          '</div>' +
          '<div class="massage__top__day-time">' +
            message.created_at +
          '</div>' +
        '</div>' +
        '<div class="lower-message">' +
          '<p class="lower-message__content">' +
            message.content +
          '</p>' +
          '<img src="' + message.image.url + '" class="lower-message__image" >' +
        '</div>' +
      '</div>'
    } else if (message.content) {
      var html = '<div class="massage" data-id=' + message.id + '>' +
      '<div class="massage__top">' +
        '<div class="massage__top__name">' +
          message.user_name +
        '</div>' +
        '<div class="massage__top__day-time">' +
          message.created_at +
        '</div>' +
      '</div>' +
      '<div class="lower-message">' +
        '<p class="lower-message__content">' +
          message.content +
        '</p>' +
      '</div>' +
    '</div>'
    } else if (message.image.url) {
      var html = '<div class="massage" data-id=' + message.id + '>' +
      '<div class="massage__top">' +
        '<div class="massage__top__name">' +
          message.user_name +
        '</div>' +
        '<div class="massage__top__day-time">' +
          message.created_at +
        '</div>' +
      '</div>' +
      '<div class="lower-message">' +
        '<img src="' + message.image.url + '" class="lower-message__image" >' +
      '</div>' +
    '</div>'
    };
    return html;
  };

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    let formData = new FormData(this);
    let url = $(this).attr('action');

    $.ajax({
      type: 'POST',
      url: url,
      data: formData ,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(message){
       let html = buildMessageHTML(message);
       $('.massages').append(html)
       $('.form__message').val('')
       $('.massages').animate({scrollTop: $('.massages')[0].scrollHeight}, 'fast');
    })
    .fail(function(){
      alert('メッセージを入力してください。')
    })
    .always(function(data){
      $('.form__submit').prop('disabled', false);
    })
  })


  var reloadMessages = function () {
    if (window.location.href.match(/\/groups\/\d+\/messages/)){
      var last_message_id = $('.message:last').data("message-id"); 
      
      $.ajax({
        url: "api/messages", 
        type: 'get', 
        dataType: 'json', 
        data: {last_id: last_message_id} 
      })
      .done(function (messages) { 
        var insertHTML = '';
        messages.forEach(function (message) {
          insertHTML = buildMessageHTML(message); 
          $('.massages').append(insertHTML);
        })
        $('.massages').animate({scrollTop: $('.massages')[0].scrollHeight}, 'fast');
      })
      .fail(function () {
        alert('自動更新に失敗しました');
      });
    }
  };
  setInterval(reloadMessages, 5000);
  });
