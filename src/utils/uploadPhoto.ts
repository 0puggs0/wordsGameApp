import * as ImagePicker from "expo-image-picker";
import { baseUrl } from "../constants/api";
import { Storage } from "./storage";

const createFormData = (uri: string) => {
  const fileName = uri.split("/").pop();
  const fileType = fileName?.split(".").pop();
  const formData = new FormData();

  //@ts-ignore P
  formData.append("file", {
    uri,
    name: fileName,
    type: `image/${fileType}`,
  });
  return formData;
};
export class FileService {
  static async upload(photo: ImagePicker.ImagePickerSuccessResult) {
    const token = Storage.get("token");
    const headers = {
      Authorization: "",
      "Content-Type": "multipart/form-data",
    };
    if (token) {
      headers.Authorization = token;
    }
    const response = await fetch(`${baseUrl}/five_letters/upload-photo`, {
      method: "POST",
      body: createFormData(photo.assets[0].uri),
      headers: headers,
    });
    console.log(await response.json());
    if (response.ok) {
      return true;
    }
  }
}
