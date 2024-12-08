import { baseUrl } from "../constants/api";
interface Headers {
  "Content-Type": string;
  Authorization: string;
}
export const fetchData = async (
  url: string,
  headers: Headers,
  token: string | undefined
) => {
  const currentHeaders = { ...headers };
  if (token) {
    currentHeaders.Authorization = token;
  }
  const response = await fetch(`${baseUrl}/${url}`, {
    headers: currentHeaders,
  });
  return response.json();
};
