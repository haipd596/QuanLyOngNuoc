import banner from "@assets/images/ViDoc_logo.png";
import { Wrapper, Image, Content, Title, Description, Overlay } from "./styled";

const Banner = () => {
  return (
    <Wrapper>
      <Image src={banner} alt="banner" />

      <Overlay />

      <Content>
        <Title>VỀ ĐIỆN NƯỚC ỐNG NƯỚC VIỆT</Title>

        <Description>
          Được hình thành từ 2005 bởi Công ty TNHH Anthivina, Ống Việt Úc hiện đang là đơn vị dẫn đầu trong sản xuất, phân phối các sản phẩm ống bạt, ống cao su, ống nhựa PVC phù hợp nhiều mục đích nông nghiệp và công nghiệp.
        </Description>

        <br />

        <Description>
          Ống Việt Úc tự hào là top 10 thương hiệu nổi tiếng Châu Á – Thái Bình Dương năm 2023, cam kết đem đến cho khách hàng sản phẩm với chất lượng và sự hài lòng vượt trội.
        </Description>

        <br />

        <Description>
          Công ty TNHH ANTHI VINA. GPDKKD: 4900874826 do sở KH & ĐT Tỉnh Lạng Sơn cấp ngày 15/03/2021.
        </Description>

        <br />

        <Description>
          Địa chỉ: Ngõ 238 đường Trần Quang Khải, Phường Chi Lăng, TP. Lạng Sơn.
        </Description>

        <Description>
          Điện thoại: 0888 022 656 - Email: anthivina@gmail.com
        </Description>
      </Content>
    </Wrapper>
  );
};

export default Banner;