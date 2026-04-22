import type { IBaseFilter } from "@/shared/types";

export interface IDanhMuc {
  id: number;              
  name: string;
  slug: string;
  description: string;
  createdAt: string;
  updatedAt: string;  
}

export interface ICategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface ISupplier {
  id: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  taxCode: string;
  note: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface IProductImage {
  id: string;
  productId: string;
  imageUrl: string;
  isMain: boolean;
  createdAt: string;
}

export interface ISanPham {
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

  category: ICategory;
  supplier: ISupplier;

  images: IProductImage[];
}

export interface IAddGioHang {
  productId: string;
  quantity: number;
}

export type TFilter = { Query?: object; } & IBaseFilter