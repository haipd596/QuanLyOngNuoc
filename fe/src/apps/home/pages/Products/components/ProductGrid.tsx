import { Empty, Spin } from "antd";
import { ISanPham } from "../services";
import { EmptyState, ProductsGrid } from "../styled";
import ProductCard from "./ProductCard";

type Props = {
  products: ISanPham[];
  onAddToCart: (product: ISanPham) => void;
  onViewDetails?: (product: ISanPham) => void;
  loading?: boolean;
  isAdding?: boolean;
  pendingProductId?: string | null;
  canAddToCart?: boolean;
};

const ProductGrid = ({
  products,
  onAddToCart,
  onViewDetails,
  loading,
  isAdding,
  pendingProductId,
  canAddToCart = true,
}: Props) => {
  if (loading) {
    return (
      <EmptyState>
        <Spin tip="Đang tải sản phẩm" />
      </EmptyState>
    );
  }

  if (!products.length) {
    return (
      <EmptyState>
        <Empty description="Không tìm thấy sản phẩm phù hợp" />
      </EmptyState>
    );
  }

  return (
    <ProductsGrid>
      {products.map((p) => (
        <ProductCard
          key={p.id}
          product={p}
          onAddToCart={onAddToCart}
          onViewDetails={onViewDetails}
          isLoading={Boolean(isAdding && pendingProductId === p.id)}
          canAddToCart={canAddToCart}
        />
      ))}
    </ProductsGrid>
  );
};

export default ProductGrid;
