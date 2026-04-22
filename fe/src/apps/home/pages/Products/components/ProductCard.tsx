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
    "https://via.placeholder.com/300x200?text=No+Image";

  return (
    <ProductCardWrapper
      hoverable
      cover={<ProductImage src={mainImage} alt={product.name} />}
    >
      <ProductName title={product.name}>{product.name}</ProductName>

      <ProductDescription title={product.description || ""}>
        {product.description || "Không có mô tả"}
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
          Thêm
        </AddToCartButton>
      </ProductFooter>
    </ProductCardWrapper>
  );
};

export default ProductCard;
