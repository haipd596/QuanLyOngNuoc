import { ArrowRightOutlined } from "@ant-design/icons";
import { Accent, Badge, BannerImage, ButtonGroup, Container, Content, Description, ImageWrapper, PrimaryButton, SecondaryButton, Section, Title } from "./styled";

const Banner = () => {
  return (
    <Section>
      <Container>
        <Content>
          <Badge>CHẤT LƯỢNG CÔNG TRÌNH</Badge>

          <Title>
            GIẢI PHÁP <br />
            <Accent>BỀN VỮNG</Accent>
            <br />
            CHO MỌI NHÀ.
          </Title>

          <Description>
            Cung cấp hệ thống vật tư nước và thiết bị điện đạt chuẩn quốc tế.
            Uy tín tạo nên giá trị cốt lõi cho mọi công trình Việt.
          </Description>

          <ButtonGroup>
            <PrimaryButton>Mua ngay <ArrowRightOutlined /></PrimaryButton>
            <SecondaryButton>Xem catalog</SecondaryButton>
          </ButtonGroup>
        </Content>

        <ImageWrapper>
          <BannerImage
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDMsMxmDwzGO8pWi80httoCLUnMfjYlupWirbBu06ponzLSflu1o0ZX778uhtENogdCbEVVuxDI4Vq_4ePGaKJf6WhqGP_MszMRGvFnAukd-VsajYqSvEgA0VgiuDUj_LOjp-BgO3By_FHUTyEjGu3LgMGTPHtJ6J4OX3D-GNlTwcsdl0cLujzd1svHj8LJK2NZ3Gpg1A84Zgm1fZxyCoaDWDDRQNiqF8e48TK3YyXW7Plj3k6WJubzP2seBXYyTH1lTQHpx7qKy78"
            alt="Industrial materials"
          />
        </ImageWrapper>
      </Container>
    </Section>
  );
};

export default Banner;