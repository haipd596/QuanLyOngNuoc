import { ShoppingCartOutlined, StarFilled } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { formatMoney } from "@/apps/admin/pages/dashboard/utils";
import { useAddToCartAction } from "@/apps/home/pages/Products/hooks/useAction";
import { getSanPham } from "@/apps/home/pages/Products/services/api";
import type { ISanPham } from "@/apps/home/pages/Products/services/types";
import {
  Badge,
  Card,
  CartButton,
  Container,
  Content,
  Footer,
  Grid,
  Header,
  ImageBox,
  Price,
  ProductTitle,
  Rating,
  Section,
  Stock,
  StockStatus,
  Tag,
  Title,
} from "./styled";

const BestSell = () => {
  const [products, setProducts] = useState<ISanPham[]>([]);
  const { addProductToCart, pendingProductId } = useAddToCartAction();

  const resolveImageUrl = (imageUrl?: string) => {
    if (!imageUrl) return "https://via.placeholder.com/600x400?text=Khong+co+anh";
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

  useEffect(() => {
    const fetchBestSellers = async () => {
      try {
        const res = await getSanPham({
          page: 1,
          pageSize: 8,
          Query: { HotYN: "true" },
        });
        setProducts(res?.data || []);
      } catch {
        setProducts([]);
      }
    };

    void fetchBestSellers();
  }, []);

  return (
    <Section>
      <Container>
        <Header>
          <div>
            <Tag>Danh mục nổi bật</Tag>
            <Title>Sản phẩm bán chạy</Title>
          </div>
        </Header>

        <Grid>
          {products.map((item) => {
            const firstImage = resolveImageUrl(item.images?.[0]?.imageUrl);
            const inStock = item.stockQuantity > 0;

            return (
              <Card
                key={item.id}
                cover={
                  <ImageBox>
                    <img src={firstImage} alt={item.name} />
                    {item.hotYN && <Badge>Bán chạy</Badge>}
                  </ImageBox>
                }
              >
                <Content>
                  <Rating>
                    <StarFilled /> Nổi bật
                  </Rating>

                  <ProductTitle>{item.name}</ProductTitle>

                  <Stock>
                    Kho hàng:{" "}
                    <StockStatus status={inStock ? "in" : "out"}>
                      {inStock ? "Còn hàng" : "Tạm hết"}
                    </StockStatus>
                  </Stock>

                  <Footer>
                    <Price>{formatMoney(Number(item.salePrice))}</Price>

                    <CartButton
                      disabled={!inStock || pendingProductId === item.id}
                      aria-label="Thêm vào giỏ"
                      onClick={() => addProductToCart(item)}
                    >
                      <ShoppingCartOutlined />
                    </CartButton>
                  </Footer>
                </Content>
              </Card>
            );
          })}
        </Grid>
      </Container>
    </Section>
  );
};

export default BestSell;
