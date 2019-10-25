$(function(){
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    // console.log(this)
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
  })
});