export const ROLE_ADMIN = 'ADMIN';
export const ROLE_SELLER = 'SELLER';
export const ROLE_CUSTOMER = 'CUSTOMER';

export const INTERNAL_ROLES = [ROLE_ADMIN, ROLE_SELLER] as const;
export const PRODUCT_VIEWER_ROLES = [ROLE_ADMIN, ROLE_SELLER, ROLE_CUSTOMER] as const;
