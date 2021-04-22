import http from "../http-common";

const getAll = () => {
  return http.get("/folder");
};

const get = id => {
  return http.get(`/folder/${id}`);
};

const create = data => {
  return http.post("/folder/add", data);
};

const update = (id, data) => {
  return http.put(`/folder/${id}`, data);
};

const remove = id => {
  return http.delete(`/folder/${id}`);
};

const removeAll = () => {
  return http.delete(`/folder`);
};

const findByTitle = title => {
  return http.get(`/folder?title=${title}`);
};

export default {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByTitle
};
