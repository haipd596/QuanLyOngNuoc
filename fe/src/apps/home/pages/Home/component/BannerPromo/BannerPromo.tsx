import {
  Section,
  BannerWrapper,
  BannerContent,
  BannerTitle,
  BannerDesc,
  BannerButton,
  BannerImageWrapper,
  BannerImage,
  OverlayPattern,
} from "./styled";

const BannerPromo = () => {
  return (
    <Section>
      <BannerWrapper>
        <OverlayPattern />

        <BannerContent>
          <BannerTitle>
            ƯU ĐÃI LỚN MÙA XÂY DỰNG
          </BannerTitle>
            <BannerDesc>
            Giảm đến 30% cho các đơn hàng dự án trên 50 triệu đồng.<br />
            Miễn phí vận chuyển nội thành.<br />
            Chương trình áp dụng cho tất cả các sản phẩm xây dựng, từ ống nước, thiết bị điện, phụ kiện cho đến vật liệu xây dựng lớn.<br />
            Hãy tận dụng cơ hội này để nâng cấp dự án của bạn với chi phí tiết kiệm và nhận hỗ trợ vận chuyển nhanh chóng, an toàn.<br />
            Khuyến mãi chỉ diễn ra trong thời gian có hạn, đừng bỏ lỡ!
            </BannerDesc>
          <BannerButton>Nhận báo giá ngay</BannerButton>
        </BannerContent>

        <BannerImageWrapper>
          <BannerImage
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCUyfZ865srjVoFSCmuQE5CevdzFQyZ_QtkeiJ7K0G5po18PamCioypECXsT-f1tAVRj3ldPFDnsZEuIhAR4N6dJvZCUacSjOxAvldejxIQxE5Vv-cXLG2Qyn2IPbqrsnUMyOshVXMeSH9hF1iLUnmDoPha8JOA_Co9biKz-8hjx20-Wyrc_Gz5JY0qy_waxhjAKK-Bd6e5FRX-rZ16eB1IMc2fcVro0ZVPHLqXHi_fe9mp3_dAC6Q2Js6DWubMinn26npW3--gBWs"
            alt="Construction deal"
          />
        </BannerImageWrapper>
      </BannerWrapper>
    </Section>
  );
};

export default BannerPromo;