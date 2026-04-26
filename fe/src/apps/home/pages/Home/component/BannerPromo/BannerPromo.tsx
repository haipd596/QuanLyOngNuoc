import {
  BannerButton,
  BannerContent,
  BannerDesc,
  BannerImage,
  BannerImageWrapper,
  BannerTitle,
  BannerWrapper,
  HighlightList,
  Section,
} from "./styled";

const BannerPromo = () => {
  return (
    <Section>
      <BannerWrapper>
        <BannerContent>
          <BannerTitle>Ưu đãi cho đơn hàng công trình</BannerTitle>
          <BannerDesc>
            Giảm đến 30% cho đơn hàng dự án từ 50 triệu đồng, hỗ trợ giao
            nội thành và tư vấn lựa chọn vật tư theo nhu cầu thực tế.
          </BannerDesc>
          <HighlightList>
            <li>Báo giá nhanh theo số lượng</li>
            <li>Xuất hóa đơn và chứng từ đầy đủ</li>
            <li>Giao hàng tận nơi theo tiến độ thi công</li>
          </HighlightList>
          <BannerButton>Nhận báo giá ngay</BannerButton>
        </BannerContent>

        <BannerImageWrapper>
          <BannerImage
            src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1100&q=80"
            alt="Kho vật tư công trình"
          />
        </BannerImageWrapper>
      </BannerWrapper>
    </Section>
  );
};

export default BannerPromo;
