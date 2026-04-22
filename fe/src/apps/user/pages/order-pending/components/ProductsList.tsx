import {
  ProductCode,
  ProductImage,
  ProductList,
  ProductName,
  ProductPrice,
  ProductPriceWrap,
  ProductRow,
  ProductsCard,
  QuantityTag,
} from "../styled";

interface Product {
  id: string;
  image: string;
  name: string;
  code: string;
  quantity: string;
  price: string;
  warranty: string;
}

interface ProductsListProps {
  products: Product[];
  totalCount: number;
}

const ProductsList = ({ products, totalCount }: ProductsListProps) => {
  return (
    <ProductsCard bordered={false} title={`Danh sách sản phẩm (${totalCount.toString().padStart(2, "0")})`}>
      <ProductList>
        {products.map((product) => (
          <ProductRow key={product.id}>
            <ProductImage src={product.image} />
            <div>
              <ProductName>{product.name}</ProductName>
              <ProductCode>Mã SP: {product.code}</ProductCode>
              <QuantityTag>Số lượng: {product.quantity}</QuantityTag>
            </div>
            <ProductPriceWrap>
              <ProductPrice>{product.price}</ProductPrice>
            </ProductPriceWrap>
          </ProductRow>
        ))}
      </ProductList>
    </ProductsCard>
  );
};

export default ProductsList;
