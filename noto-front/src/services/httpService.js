import axios from "axios";

export function setDefaultCommonHeader(header, value) {
  axios.defaults.headers.common[header] = value;
}

const http = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  patch: axios.patch,
  delete: axios.delete,
  setDefaultCommonHeader,
};

export default http;
