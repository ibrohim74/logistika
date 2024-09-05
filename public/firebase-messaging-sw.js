// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
    apiKey: "AIzaSyDeIEPtY0Gvm82PU3pAtS657IayNRi0xk0",
    authDomain: "logistika-741fe.firebaseapp.com",
    projectId: "logistika-741fe",
    storageBucket: "logistika-741fe.appspot.com",
    messagingSenderId: "1078879511736",
    appId: "1:1078879511736:web:eea5143be6fb8b9d2d804d",
    measurementId: "G-KTPHXW54Q5"
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log(
        '[firebase-messaging-sw.js] Received background message ',
        payload
    );
    // Customize notification here
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body:  payload.notification.body,
        icon:  payload.notification.image
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});