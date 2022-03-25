import http from "../services/httpService";
import { apiUrl } from "../config.json";
import jwtDecode from "jwt-decode";

const TOKEN_KEY = "token";
http.setDefaultCommonHeader("x-auth-token", getJwt());

export function createUser(user) {
  return http.post(`${apiUrl}/users`, user);
}

export async function login(email, password) {
  const { data } = await http.post(`${apiUrl}/auth`, { email, password });
  localStorage.setItem(TOKEN_KEY, data.token);
}

export function getCurrentUser() {
  try {
    const token = localStorage.getItem(TOKEN_KEY);
    return jwtDecode(token);
  } catch {
    return null;
  }
}

export function getJwt() {
  return localStorage.getItem(TOKEN_KEY);
}

export async function logout() {
  localStorage.removeItem(TOKEN_KEY);
}

export function getFavorites() {
  return http.get(`${apiUrl}/users/favorites`);
}

const userService = {
  createUser,
  login,
  getCurrentUser,
  getJwt,
  logout,
  getFavorites,
};

export default userService;
