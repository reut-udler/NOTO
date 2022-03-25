import http from "../services/httpService";
import { apiUrl } from "../config.json";

export function createNewExpense(carId, expense) {
  return http.post(`${apiUrl}/cars/my-cars/${carId}/expenses`, expense);
}

export function getExpenses(_id) {
  return http.get(`${apiUrl}/cars/my-cars/${_id}/expenses`);
}

const expenseService = {
  createNewExpense,
  getExpenses,
};

export default expenseService;
