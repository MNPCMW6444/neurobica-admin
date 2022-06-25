import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
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

const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);

export const fetchToken = async (setTokenFound, setmes, tok) => {
  return getToken(messaging, {
    vapidKey:
      "BNK3QHhftQUAFZSq04afuON_WAKuF-g9wPRdGp8N6s63UtZDBs12OorqmhlhpkBnwqZ2eQLBvbcbwKVCkzskxAg",
  })
    .then(async (currentToken) => {
      if (currentToken) {
        console.log("current token for client: ", currentToken);
        const res = await Axios.post(domain + "/notify", {
          tok: tok,
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
            "Failed to register this device to notifications (Error code 1(token is empty), yes yes i made different error codes)"
          )
        );
        setTokenFound(true);
        // Track the token -> client mapping, by sending to backend server
        // show on the UI that permission is secured
      } else {
        console.log(
          "No registration token available. Request permission to generate one."
        );
        setTokenFound(false);
        setmes(
          "Failed to register this device to notifications (Error code 3(no token), yes yes i made different error codes)"
        );
        // shows on the UI that permission is required
      }
    })
    .catch((err) => {
      console.log("An error occurred while retrieving token. ", err);
      setmes(
        "Failed to register this device to notifications (Error code 4(Premission not granted, ), yes yes i made different error codes) SO ACTUALLY...  " +
          err
      );
      // catch error while creating client token
    });
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });
