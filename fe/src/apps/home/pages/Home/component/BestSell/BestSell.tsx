import {
  Section,
  Container,
  Header,
  Tag,
  Title,
  Grid,
  Card,
  ImageBox,
  Badge,
  Content,
  Rating,
  ProductTitle,
  Stock,
  StockStatus,
  Footer,
  Price,
  CartButton,
} from "./styled";

const products = [
  {
    name: "Ống nhựa uPVC Class 3 PN10",
    price: "45.000đ",
    rating: "4.9 (120+)",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAt5FrNXR-jeoiLtGn9v21IeROf1G_QoTJ0vHvXC1Awy1fHt-7uKFBpciKslKf0xXExpqRnJns3xS-_KH1f9eWj44MWensEyWmF0XbI71pOxrBxoLeQMJVQkSpu0buptjc6CXs-cDVGuisUBar5_0LecJGM4uzg7W1_U6nT7DBDfodBvwu3xXR_nORRWETTuXkBWBC-8a_IL8mM0B1PZpwsAaOd9eb1BVlLPUH9lfUvGKEq6H7JfJxie5jTyJ2Al_RzB044Xd00NqY",
    stock: "in",
    badge: "HOT",
  },
  {
    name: "Van Bi Đồng Miha Cao Cấp",
    price: "125.000đ",
    rating: "4.8 (85)",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD7NdPKfDtPoz85LBh8haN9fY8NYMhyY1lpODydm8LCTXk0UPlEOsC5KtC0XIko_XSbj4-9EWdFFce1k93zwBiYlfH-2DGysEfXtdoYqwyndkaudWTIkmf_D6G2_AwJJbXtg4eF7gHxwr5z_XPFkaNLNWWe5K1EnEQDIqIx76fdkC6f7DAv_B7vw1Unu7QCMLoKER_pqoe1_k97JZmAvMDUDwavzbOp-f8V8i9Jj3D0Xd85HycUkKue54xHZSwL-pmIPgAIIdZKGjY",
    stock: "in",
    badge: "-15%",
  },
  {
    name: "Công Tắc Điện Panasonic Wide",
    price: "68.000đ",
    rating: "5.0 (210)",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBIMIqAGbNRV_G0bCsLppiO3LWxodvZdtXGejnd83GmfY_RgKh60vGqDADEo_2Wg0jTWudehj5BD9c-IjlXwB9-ixm_J1neoHtJnyta-Bt86zce36NWfomJQ5N7ISI1m6yB6BCGfoAlStjioNl4MrwlNlfECqPflqLc6wqkbVx66dST__l6YPKdQ_bfUZghCdOpvEroC5S44apOFKho9IdUdlk53JHYdme2Bwp197uLEuR9eMfEERBO0kJbtGkgeCpPqyKV8QARPCw",
    stock: "in",
  },
  {
    name: "Dây Cáp Điện Cadivi 2.5mm",
    price: "310.000đ",
    rating: "4.7 (45)",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDTjqP_XxyblzgAAZH-Y0fsagTjr27gOvlO_hHIqaFElE572eCKd1bO1UA0Dufv-wk0cT8rjkHr0SdTj1fuaslTEKAFQBTSHkUtv-et2DpZ1abhAZppEZvb7Pa-ozYv111U5PhxHs471-Zo9uIZpOUQzaRdy4KoqofKWPdnOSpUmPzoBepW4D3MXYhlLk9T4z-Pj3jv_JP-yWyAKIL8GnenuhhR__-USlS-cZRrGYvootHt_OVcIHIPZUSoZqWcbET4P6v_e_LzduY",
    stock: "out",
  },
];

const BestSell = () => {
  return (
    <Section>
      <Container>
        <Header>
          <Tag>Phổ biến nhất</Tag>
          <Title>SẢN PHẨM BÁN CHẠY</Title>
        </Header>

        <Grid>
          {products.map((item, index) => (
            <Card
              key={index}
              cover={
                <ImageBox>
                  <img src={item.image} alt={item.name} />
                  {item.badge && <Badge>{item.badge}</Badge>}
                </ImageBox>
              }
            >
              <Content>
                <Rating>⭐ {item.rating}</Rating>

                <ProductTitle>{item.name}</ProductTitle>

                <Stock>
                  Kho hàng:{" "}
                  <StockStatus status={item.stock as any}>
                    {item.stock === "in" ? "Còn hàng" : "Cháy hàng"}
                  </StockStatus>
                </Stock>

                <Footer>
                  <Price>{item.price}</Price>

                  <CartButton disabled={item.stock === "out"}>
                    🛒
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