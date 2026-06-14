export const ROLE_ADMIN = "ADMIN";
export const ROLE_SELLER = "SELLER";
export const ROLE_CUSTOMER = "CUSTOMER";

export type AppRole = typeof ROLE_ADMIN | typeof ROLE_SELLER | typeof ROLE_CUSTOMER | string;

export const canUseCart = (role?: AppRole | null) =>
  String(role || "").toUpperCase() === ROLE_CUSTOMER;
