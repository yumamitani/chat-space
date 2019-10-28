$(function(){
  let buildMessageHTML = function(message) {

    image = (message.image.url) ? `<img class= "lower-message__image" src=${message.image.url} >` : "";
    
      let html = `<div class="massage" data-id="${message.id}">
      <div class="massage__top">
          <div class="massage__top__name">
            ${message.user_name}
          </div>
          <div class="massage__top__day-time">
            ${message.created_at}
          </div>
        </div>
        <div class="lower-message">
          <p class="lower-message__content">
            ${message.content}
          </p>
          ${image} 
        </div>
      </div>`
     return html;
  }

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
        let insertHTML = '';
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
