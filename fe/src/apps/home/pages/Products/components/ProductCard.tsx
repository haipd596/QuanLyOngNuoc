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
} from "../styled";

type Props = {
  product: ISanPham;
  onAddToCart: (product: ISanPham) => void;
  isLoading: boolean;
};

const formatPrice = (value: string) =>
  `${Number(value).toLocaleString("vi-VN")}đ`;

const ProductCard = ({ product, onAddToCart, isLoading }: Props) => {
  const mainImage =
    product.images?.find((i) => i.isMain)?.imageUrl ||
    product.images?.[0]?.imageUrl ||
    "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=700&q=80";

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

      <ProductFooter>
        <AddToCartButton
          type="primary"
          icon={<ShoppingCartOutlined />}
          loading={isLoading}
          disabled={isLoading}
          onClick={() => onAddToCart(product)}
        >
          Thêm vào giỏ
        </AddToCartButton>
      </ProductFooter>
    </ProductCardWrapper>
  );
};

export default ProductCard;
