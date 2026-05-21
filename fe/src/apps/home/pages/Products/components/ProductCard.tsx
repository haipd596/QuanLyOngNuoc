import { ShoppingCartOutlined } from "@ant-design/icons";

import { ISanPham } from "../services";
import {
  AddToCartButton,
  ProductCardWrapper,
  ProductDescription,
  ProductFooter,
  ProductImage,
  ProductName,
  ProductPrice,
  ProductStock,
} from "../styled";

type Props = {
  product: ISanPham;
  onAddToCart: (product: ISanPham) => void;
  isLoading: boolean;
};

const formatPrice = (value: string) =>
  `${Number(value).toLocaleString("vi-VN")}đ`;

const ProductCard = ({ product, onAddToCart, isLoading }: Props) => {
  const resolveImageUrl = (imageUrl?: string) => {
    if (!imageUrl) {
      return "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=700&q=80";
    }
    if (/^https?:\/\//i.test(imageUrl)) return imageUrl;
    const baseUrl = import.meta.env.VITE_API_URL as string | undefined;
    if (!baseUrl) return imageUrl;
    try {
      const origin = new URL(baseUrl).origin;
      return `${origin}${imageUrl.startsWith("/") ? "" : "/"}${imageUrl}`;
    } catch {
      return imageUrl;
    }
  };
  const inStock = Number(product.stockQuantity || 0) > 0;
  const mainImage = resolveImageUrl(product.images?.[0]?.imageUrl);

  return (
    <ProductCardWrapper
      hoverable
      cover={<ProductImage src={mainImage} alt={product.name} />}
    >
      <ProductName title={product.name}>{product.name}</ProductName>

      <ProductDescription title={product.description || ""}>
        {product.description || "Chưa có mô tả chi tiết"}
      </ProductDescription>

      <ProductPrice>{formatPrice(product.salePrice)}</ProductPrice>
      <ProductStock inStock={inStock}>{inStock ? "Còn hàng" : "Hết hàng"}</ProductStock>

      <ProductFooter>
        <AddToCartButton
          type="primary"
          icon={<ShoppingCartOutlined />}
          loading={isLoading}
          disabled={isLoading || !inStock}
          onClick={() => onAddToCart(product)}
        >
          Thêm vào giỏ
        </AddToCartButton>
      </ProductFooter>
    </ProductCardWrapper>
  );
};

export default ProductCard;
