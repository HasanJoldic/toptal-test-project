import axios from "axios";
import store from "./store/store";

export const sendRequest = (method: string, url: string, data: any = null) => {
  return (axios as any)({
    method,
    url: "http://192.168.33.10:3000" + url,
    data,
    headers: {
      authorization: store.getState().auth.accessToken
    }
  });
};