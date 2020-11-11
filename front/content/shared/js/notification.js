const btnNotificacao = $("#input-pushNotification");
let inscrito = false;

const serverKey = `BNQ0_qbJqQ-luwUm_Xr-W2a74oxFU6wjkvuFHt3tWKFohqbv19-S1KHjKtOeOW2GFghjgJzqNz8dA1Ihp9phS6Q`;
const config = {
  apiKey: "AIzaSyC55889Yccw1hPFi2-evrKMOvRfUR6og6M",
  authDomain: "mubble-forms.firebaseapp.com",
  databaseURL: "https://mubble-forms.firebaseio.com",
  projectId: "mubble-forms",
  storageBucket: "mubble-forms.appspot.com",
  messagingSenderId: "970978067999"
};
firebase.initializeApp(config);

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

// Chave pública do firebase cloud messaging
messaging.usePublicVapidKey(serverKey);

function inicializar() {
  let currentToken = localStorage.getItem(`tokenPushNotification`);
  inscrito = !(currentToken === null);
  btnNotificacao.change(function () {
    reqNotificacao();
    $("#input-pushNotification").closest("div").addClass("open");
  });
  changeIconPushNotification(inscrito);
}

function reqNotificacao() {
  if(!inscrito) {
    messaging
      .requestPermission()
      .then(function () {
        return messaging.getToken();
      })
      .then(function(token) {
        changeIconPushNotification("Notificações ativadas");
        btnNotificacao[0].checked = true;
        enviarToken(token);
      })
      .catch(function (err) {
        changeIconPushNotification("Notificações desativadas");
        btnNotificacao[0].checked = false;
        toastr.error('Erro ao ativar as notificações.');
      });
  } else {
    removerInscricao();
    btnNotificacao[0].checked = false;
  }
}

function enviarToken(token) {
  localStorage.setItem('tokenPushNotification', token);
  console.log(token);
  let data = {
    token: token
  };
  $.ajax({
    url: configSistema.servidor + '/client/forms/push-notification/add-token-web',
    headers: {
      'X-Token': AdminData.getXToken(),
      'FormToken': AdminData.getFormToken(),
      'Content-Type':'application/json'
    },
    method: 'POST',
    data: JSON.stringify(data),
    success: function () {
      btnNotificacao.button("reset");
      toastr.success('Notificações ativadas com sucesso!');
      inscrito = true;
      changeIconPushNotification("Notificações ativadas");
    },
    error: function () {
      btnNotificacao.button("reset");
      toastr.error('Erro ao ativar as notificações.');
      inscrito = false;
      changeIconPushNotification("Notificações desativadas");
    }
  });
}

function removerInscricao() {
  btnNotificacao.button(`loading`);
  messaging.deleteToken(localStorage.getItem(`tokenPushNotification`))
    .then(() => {
      btnNotificacao.button(`reset`);
      localStorage.removeItem(`tokenPushNotification`);
      toastr.success(`Notificações desativadas`);
      inscrito = false;
      changeIconPushNotification("Notificações desativadas");
    })
    .catch(function (err) {
      btnNotificacao.button(`reset`);
      console.log(err.message);
      toastr.error(`Erro ao desativar as notificações.`);
    });
}

//function atualizarBtnNotificacao() {
//    if(!inscrito) {
//        btnNotificacao.removeClass(`btn-danger`);
//        btnNotificacao.addClass(`btn-info`);
//
//        let icon = `<i class="far fa-bell"></i>`;
//        // O setTimeout força a atualização do down, pois o código está sendo executado de forma async
//        setTimeout(function() {
//            btnNotificacao.html(icon + ` Receber notificações`);
//        }, 0);
//    } else {
//        btnNotificacao.addClass(`btn-danger`);
//        btnNotificacao.removeClass(`btn-info`);
//
//        let icon = "<i class='far fa-bell-slash'></i>";
//        // O setTimeout força a atualização do down, pois o código está sendo executado de forma async
//        setTimeout(function() {
//            btnNotificacao.html(icon + ` Parar de receber notificações`);
//        }, 0);
//    }
//}

function changeIconPushNotification(text) {
  if (typeof(text) === "boolean") {
    if (text === true) {
      changeIconPushNotification("Notificações ativadas");
      btnNotificacao[0].checked = true;
    } else {
      changeIconPushNotification("Notificações desativadas");
    }
  } else {
    $("#label-pushNotification").text(text);
  }
}

/**
 * Atualização de token
 */
messaging.onTokenRefresh(function() {
  messaging.getToken().then(function(novoToken) {
    enviarToken(novoToken);
  }).catch(function(err) {
    // Erro ao obter um novo token
  });
});

$(document).ready(function () {
  "use strict";
  if ('serviceWorker' in navigator && 'PushManager' in window) {
    inicializar();
  } else {
    btnNotificacao.addClass(`none`);
  }
});