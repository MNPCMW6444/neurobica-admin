// Scripts for firebase and firebase messaging
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js"
);

import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseApp = initializeApp({
  apiKey: "AIzaSyAsDaTlSLrVbHM8M1MkVgG7Dle_9866CCE",
  authDomain: "neurobica-admin.firebaseapp.com",
  projectId: "neurobica-admin",
  storageBucket: "neurobica-admin.appspot.com",
  messagingSenderId: "406250116393",
  appId: "1:406250116393:web:de865ac78ec5d0360f9338",
  measurementId: "G-T8PLVEN74G",
});
firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log("Received background message ", payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
