import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging/sw";
import { onBackgroundMessage } from "firebase/messaging/sw";

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
const firebaseApp = initializeApp({
  apiKey: "AIzaSyAsDaTlSLrVbHM8M1MkVgG7Dle_9866CCE",
  authDomain: "neurobica-admin.firebaseapp.com",
  projectId: "neurobica-admin",
  storageBucket: "neurobica-admin.appspot.com",
  messagingSenderId: "406250116393",
  appId: "1:406250116393:web:de865ac78ec5d0360f9338",
  measurementId: "G-T8PLVEN74G",
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = getMessaging(firebaseApp);

onBackgroundMessage(messaging, (payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  // Customize notification here
  const notificationTitle = "Background Message Title";
  const notificationOptions = {
    body: "Background Message body.",
    icon: "/firebase-logo.png",
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
