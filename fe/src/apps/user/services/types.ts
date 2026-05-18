export interface IUserRole {
  name: string;
}

export interface IUserMe {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  roleId: string;
  role: IUserRole;
  status: string;
  createdAt: string;
}

export interface IMyOrderItem {
  id: string;
  productId: string;
  quantity: number;
  unitPrice: string;
  subtotal: string;
  product?: {
    id: string;
    sku: string;
    name: string;
    images?: Array<{ imageUrl: string; isMain: boolean }>;
  };
}

export interface IMyOrder {
  id: string;
  orderCode: string;
  orderStatus: string;
  paymentStatus: string;
  paymentMethod: string;
  shippingMethod: string;
  totalAmount: string;
  discountAmount: string;
  shippingFee: string;
  finalAmount: string;
  note?: string | null;
  guestName?: string | null;
  guestPhone?: string | null;
  guestAddress?: string | null;
  createdAt: string;
  customer?: {
    fullName?: string | null;
    phone?: string | null;
    address?: string | null;
  } | null;
  items: IMyOrderItem[];
}

export interface IMyCheckoutPayload {
  fullName: string;
  phone: string;
  email?: string;
  address: string;
  shippingMethod?: string;
  paymentMethod?: string;
  discountAmount?: number;
  shippingFee?: number;
  note?: string;
  items: Array<{
    productId: string;
    quantity: number;
  }>;
}
