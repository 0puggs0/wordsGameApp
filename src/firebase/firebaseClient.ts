import messaging from "@react-native-firebase/messaging";
import { baseUrl } from "../constants/api";
import { Storage } from "../utils/storage";
let token: string;
const requestUserPermission = async () => {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  if (enabled) {
    token = (await messaging().getToken()).toString();
  } else {
    console.log("REQUEST PERMISSION DENIED");
  }
};
export const getNewFCMToken = async () => {
  const userToken = Storage.get("token");
  try {
    await requestUserPermission();
    console.log("Token:", token);
    const headers = {
      "Content-Type": "application/json",
      Authorization: "",
    };
    if (userToken) {
      headers.Authorization = userToken;
    }
    const response = await fetch(`${baseUrl}/five_letters/set-fcm-token`, {
      headers: headers,
      method: "POST",
      body: JSON.stringify({
        token: token,
      }),
    });
    console.log(await response.json());
  } catch (error) {
    console.error("Error getting new FCM token:", error);
  }
};
