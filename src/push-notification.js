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

export function requestPermission(setmes) {
  console.log("Requesting permission...");
  Notification.requestPermission().then((permission) => {
    if (permission === "granted") {
      console.log("Notification permission granted.");
      getToken(messaging, {
        vapidKey:
          "BNK3QHhftQUAFZSq04afuON_WAKuF-g9wPRdGp8N6s63UtZDBs12OorqmhlhpkBnwqZ2eQLBvbcbwKVCkzskxAg",
      }).then(async (currentToken) => {
        if (currentToken) {
          console.log(currentToken);
          const res = await Axios.post(domain + "/notify", {
            token2: currentToken,
          });
          setmes(
            res.data.token && res.data.token.length > 0 ? (
              <>
                <div>
                  You have {res.data.token.length} deviecs on your account:{" "}
                </div>
                {res.data.token.map((tok, i) => (
                  <>
                    <div style={{ fontSize: "13pt" }}>Device {i}: </div>
                    <div style={{ fontSize: "9pt" }}>{tok}</div>
                  </>
                ))}
              </>
            ) : (
              "Failed to register this device to notifications (Error code 1, yes yes i made different error codes)"
            )
          );
        } else {
          // Show permission request UI
          console.log(
            "Failed to register this device to notifications (Error code 2, yes yes i made different error codes)"
          );
          // ...
          setmes(
            "Failed to register this device to notifications (Error code 3, yes yes i made different error codes)"
          );
        }
      });
    }
    setmes(
      "Failed to register this device to notifications (Error code 4, yes yes i made different error codes)"
    );
  });
}
