import http from "../http-common";


const create = data => {
  return http.post("/pdfcv/add", data);
};


export default {

  create
};
