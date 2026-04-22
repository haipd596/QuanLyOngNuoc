// ─── IMAGE ─────────────────────────────────────
export interface IProductImage {
  id: string;
  productId: string;
  imageUrl: string;
  isMain: boolean;
  createdAt: string;
}

// ─── PRODUCT ───────────────────────────────────
export interface ICartProduct {
  id: string;
  sku: string;
  name: string;
  slug: string;

  categoryId: string;
  supplierId: string;

  unit: string;

  importPrice: string;
  salePrice: string;

  stockQuantity: number;
  minStockLevel: number;

  description: string | null;
  status: string;

  createdAt: string;
  updatedAt: string;

  images: IProductImage[];
}

// ─── CART ITEM ─────────────────────────────────
export interface ICartItem {
  id: string;
  cartId: string;
  productId: string;

  quantity: number;

  createdAt: string;
  updatedAt: string;

  product: ICartProduct;
}

// ─── CART ──────────────────────────────────────
export interface ICart {
  id: string;
  userId: string;

  createdAt: string;
  updatedAt: string;

  items: ICartItem[];
}

export interface ICartCount {
  count: number;
}

export interface IUpdateCartItemPayload {
  quantity: number;
}
