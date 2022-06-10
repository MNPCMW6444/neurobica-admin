import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";
import Axios from "axios";
import domain from "./domain";

const firebaseConfig = {
  apiKey: "AIzaSyAsDaTlSLrVbHM8M1MkVgG7Dle_9866CCE",
  authDomain: "neurobica-admin.firebaseapp.com",
  projectId: "neurobica-admin",
  storageBucket: "neurobica-admin.appspot.com",
  messagingSenderId: "406250116393",
  appId: "1:406250116393:web:de865ac78ec5d0360f9338",
  measurementId: "G-T8PLVEN74G",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Cloud Messaging and get a reference to the service
const messaging = getMessaging(app);

export function requestPermission() {
  console.log("Requesting permission...");
  Notification.requestPermission().then((permission) => {
    if (permission === "granted") {
      console.log("Notification permission granted.");
      getToken(messaging, {
        vapidKey:
          "BNK3QHhftQUAFZSq04afuON_WAKuF-g9wPRdGp8N6s63UtZDBs12OorqmhlhpkBnwqZ2eQLBvbcbwKVCkzskxAg",
      }).then((currentToken) => {
        if (currentToken) {
          console.log(currentToken);
          Axios.post(domain + "/notify", { token2: currentToken });
        } else {
          // Show permission request UI
          console.log(
            "No registration token available. Request permission to generate one."
          );
          // ...
        }
      });
    }
  });
}
