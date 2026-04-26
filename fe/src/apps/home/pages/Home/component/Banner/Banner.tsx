import { ArrowRightOutlined, CheckCircleOutlined } from "@ant-design/icons";
import { heroStats } from "../../home.data";
import {
  Accent,
  Badge,
  BannerImage,
  ButtonGroup,
  Container,
  Content,
  Description,
  ImageWrapper,
  PrimaryButton,
  SecondaryButton,
  Section,
  Stat,
  Stats,
  Title,
} from "./styled";

const Banner = () => {
  return (
    <Section>
      <Container>
        <Content>
          <Badge>
            <CheckCircleOutlined /> Vật tư điện nước chính hãng
          </Badge>

          <Title>
            Giải pháp <Accent>điện nước</Accent> cho công trình và gia đình.
          </Title>

          <Description>
            Cung cấp ống nước, phụ kiện, van, máy bơm và thiết bị điện đạt
            chuẩn, có báo giá rõ ràng, giao hàng nhanh và hỗ trợ kỹ thuật cho
            từng đơn hàng.
          </Description>

          <ButtonGroup>
            <PrimaryButton>
              Xem sản phẩm <ArrowRightOutlined />
            </PrimaryButton>
            <SecondaryButton>Nhận báo giá</SecondaryButton>
          </ButtonGroup>

          <Stats>
            {heroStats.map((item) => (
              <Stat key={item.label}>
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </Stat>
            ))}
          </Stats>
        </Content>

        <ImageWrapper>
          <BannerImage
            src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1200&q=80"
            alt="Kỹ thuật viên lắp đặt hệ thống điện nước"
          />
        </ImageWrapper>
      </Container>
    </Section>
  );
};

export default Banner;
