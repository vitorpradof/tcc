importScripts('https://www.gstatic.com/firebasejs/3.9.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/3.9.0/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in the
// messagingSenderId.
firebase.initializeApp({
    'messagingSenderId': '970978067999'
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function(payload) {
    const notificationTitle = 'Novas respostas!';
    const notificationOptions = {
        body: 'Seu formulário possui uma nova resposta!',
        icon: 'https://formstest.mubble.com.br/content/files/system/images/icon.png',
        badge: 'https://formstest.mubble.com.br/content/files/system/images/badge.png'
    };

    return self.registration.showNotification(notificationTitle,
        notificationOptions);
});

self.addEventListener('notificationclick', function(event) {
    event.notification.close();
    event.waitUntil(
        self.clients.openWindow('https://formstest.mubble.com.br')
    );
});