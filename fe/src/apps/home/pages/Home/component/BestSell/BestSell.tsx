import { ShoppingCartOutlined, StarFilled } from "@ant-design/icons";
import { Pagination } from "antd";
import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { formatMoney } from "@/apps/admin/pages/dashboard/utils";
import { LOCAL_STORAGE_KEYS } from "@/constants";
import { PRODUCTS_ROUTE } from "@/apps/home/constants";
import { useAddToCartAction } from "@/apps/home/pages/Products/hooks/useAction";
import { useSanPhamQuery } from "@/apps/home/pages/Products/services";
import type { ISanPham } from "@/apps/home/pages/Products/services/types";
import { lcStorage } from "@/shared/utils";
import { canUseCart } from "@/shared/utils/roleAccess";
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
  PaginationWrap,
  Price,
  ProductTitle,
  Rating,
  Section,
  Stock,
  StockStatus,
  Tag,
  Title,
} from "./styled";

const PAGE_SIZE = 4;

const BestSell = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const { addProductToCart, pendingProductId } = useAddToCartAction();
  const currentUser = lcStorage.get<{ role?: string }>(LOCAL_STORAGE_KEYS.user);
  const canAddToCart = !currentUser || canUseCart(currentUser.role);
  const { data } = useSanPhamQuery({
    Page: page,
    PageSize: PAGE_SIZE,
    Query: { HotYN: "true" },
  });
  const products = (data?.data || []) as ISanPham[];
  const total = data?.metaData?.total || 0;

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
                onClick={() => navigate({ to: `${PRODUCTS_ROUTE}/${item.id}` as any })}
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

                    {canAddToCart && (
                      <CartButton
                        disabled={!inStock || pendingProductId === item.id}
                        aria-label="Thêm vào giỏ"
                        onClick={(event) => {
                          event.stopPropagation();
                          addProductToCart(item);
                        }}
                      >
                        <ShoppingCartOutlined />
                      </CartButton>
                    )}
                  </Footer>
                </Content>
              </Card>
            );
          })}
        </Grid>

        <PaginationWrap>
          <Pagination
            current={page}
            pageSize={PAGE_SIZE}
            total={total}
            onChange={setPage}
            showSizeChanger={false}
            align="center"
          />
        </PaginationWrap>
      </Container>
    </Section>
  );
};

export default BestSell;
