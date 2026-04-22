export const USER_ROUTE = "/user";
export const USER_PROFILE_ROUTE = `${USER_ROUTE}/profile`;
export const USER_PAYMENT_ROUTE = `${USER_ROUTE}/payment`;
export const USER_ORDER_SUCCESS_ROUTE = `${USER_ROUTE}/order-success`;
export const USER_ORDER_PENDING_ROUTE = `${USER_ROUTE}/order-pending`;
export const USER_ORDER_HISTORY_ROUTE = `${USER_ROUTE}/order-history`;
export const USER_SAVED_ADDRESSES_ROUTE = `${USER_ROUTE}/saved-addresses`;

export const USER_MENU_KEYS = {
  PROFILE: "profile",
  ORDER_HISTORY: "order-history",
  SAVED_ADDRESSES: "saved-addresses",
  ORDER_PENDING: "order-pending",
  LOGOUT: "logout",
} as const;
