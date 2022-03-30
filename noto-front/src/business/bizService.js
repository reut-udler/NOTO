import http from "../services/httpService";
import { apiUrl } from "../config.json";

export function getAllBizCards() {
  return http.get(`${apiUrl}/biz`);
}

const config = {
  headers: {
    "Content-Type": "multipart/form-data",
  },
};

export function createBiz(data) {
  return http.post(`${apiUrl}/biz`, data, config);
}

export function findBizName(bizName) {
  return http.get(`${apiUrl}/biz/${bizName}`);
}

export function findBizCategory(bizCategory) {
  return http.get(`${apiUrl}/biz/category/${bizCategory}`);
}

export function addFavorites(_id) {
  return http.patch(`${apiUrl}/users/favorites`, _id);
}

export function showBizImage(bizId) {
  return http.get(`${apiUrl}/biz/${bizId}/bizImage`);
}

/////////////////////
export function getMyBizCards(owner) {
  return http.get(`${apiUrl}/biz/myBiz/${owner}`);
}

const bizService = {
  getAllBizCards,
  createBiz,
  findBizName,
  findBizCategory,
  addFavorites,
  showBizImage,
  getMyBizCards,
};

export default bizService;
