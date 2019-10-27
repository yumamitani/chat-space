$(function(){
  function buildMessage(message){
    let img = message.image ? `<img src= ${ message.image }>` : "";
    let html =`<div class="massage">

      <div class="massage__top">

        <div class="massage__top__name">
        ${message.user_name}
        </div>

        <div class="massage__top__day-time">
          ${message.created_at}
        </div>

      </div>

      <div class="massage__text">
        <p class="lower-message__content">
          ${message.content}
        </p>
        <p class="lower-message__image">
           ${img}
           </p>
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
       let html = buildMessage(message);
       $('.massages').append(html)
       $('.form__message').val('')
       $('.form__mask').val('')
       $('.massages').animate({scrollTop: $('.massages')[0].scrollHeight}, 'fast');
    })
    .fail(function(){
      alert('メッセージを入力してください。')
    })
    .always(function(data){
      $('.form__submit').prop('disabled', false);
    })
  })
});