import { Spin, Empty } from 'antd';
import { ProductsGrid, EmptyState } from '../styled';
import ProductCard from './ProductCard';
import { ISanPham } from '../services';

type Props = {
  products: ISanPham[];
  onAddToCart: (product: ISanPham) => void;
  loading?: boolean;
  isAdding?: boolean;
  pendingProductId?: string | null;
};

const ProductGrid = ({
  products,
  onAddToCart,
  loading,
  isAdding,
  pendingProductId,
}: Props) => {
  if (loading) {
    return (
      <EmptyState>
        <Spin />
      </EmptyState>
    );
  }

  if (!products.length) {
    return (
      <EmptyState>
        <Empty description="Không tìm thấy sản phẩm" />
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
          isLoading={Boolean(isAdding && pendingProductId === p.id)}
        />
      ))}
    </ProductsGrid>
  );
};

export default ProductGrid;
