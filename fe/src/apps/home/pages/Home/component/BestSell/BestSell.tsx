import { ShoppingCartOutlined, StarFilled } from "@ant-design/icons";
import { featuredProducts } from "../../home.data";
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
          {featuredProducts.map((item) => (
            <Card
              key={item.name}
              cover={
                <ImageBox>
                  <img src={item.image} alt={item.name} />
                  {item.badge && <Badge>{item.badge}</Badge>}
                </ImageBox>
              }
            >
              <Content>
                <Rating>
                  <StarFilled /> {item.rating}
                </Rating>

                <ProductTitle>{item.name}</ProductTitle>

                <Stock>
                  Kho hàng:{" "}
                  <StockStatus status={item.stock}>
                    {item.stock === "in" ? "Còn hàng" : "Tạm hết"}
                  </StockStatus>
                </Stock>

                <Footer>
                  <Price>{item.price}</Price>

                  <CartButton disabled={item.stock === "out"} aria-label="Thêm vào giỏ">
                    <ShoppingCartOutlined />
                  </CartButton>
                </Footer>
              </Content>
            </Card>
          ))}
        </Grid>
      </Container>
    </Section>
  );
};

export default BestSell;
