import apiClient from "../utils/api-client";

export function checkoutAPI() {
  return apiClient.post("/order/checkout");
}

export function myOrderAPI(id) {
  return apiClient.get(`/order/${id}`);
}
