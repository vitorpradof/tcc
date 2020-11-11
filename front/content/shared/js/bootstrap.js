// Salvar o token do formulário e a chave de acesso
document.addEventListener('DOMContentLoaded', function() {
  if($(`.form-token`).length > 0 && $(`.access-key`).length > 0) {
    FormData.setFormToken($(`.form-token`).data(`formToken`));
    FormData.setAccessKey($(`.access-key`).data(`accessKey`));
    FormData.setSendForm($(`.send-form`).data('sendForm'));
  }

  // Desativar o autocomplete
  $('input').attr('autocomplete','off');

  // Configuração das notificações
  toastr.options = {
    "closeButton": false,
    "debug": false,
    "newestOnTop": false,
    "progressBar": true,
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
  };
});

function tooltip(){
  $( document ).ready(function() {
    $('[data-toggle="tooltip"]').tooltip({'placement': 'top'});
  });
}