import { useNavigate } from "@tanstack/react-router";
import {
  Section,
  Inner,
  ImageCollage,
  CollageBackground,
  CollageGrid,
  CollageImg,
  CollagePlaceholder,
  Content,
  Title,
  Desc,
  BulletList,
  LearnMoreBtn,
} from "./styled";

import product1 from "@assets/images/product1.jpg";
import product2 from "@assets/images/product2.jpg";

const image1 = product1;
const image2 = product2;

const bullets = [
  "Ống bạt cốt dù cao cấp",
  "Ống cao su bố vải, bố thép",
  "Ống nhựa PVC lưới dẻo, lõi thép",
];

const ProductHighlight = () => {
  const navigate = useNavigate();

  return (
    <Section>
      <Inner>
        <Content>
          <Title>Sản phẩm đa dạng, phù hợp mọi mục đích</Title>
          <Desc>
          Ống Việt Úc có hệ thống sản phẩm đa dạng, áp dụng được trong cả mục
          đích nông nghiệp và công nghiệp. Sản phẩm của chúng tôi được tin
          tưởng trong các dự án công trình và sản xuất lớn trên toàn quốc.
        </Desc>

        <BulletList>
          {bullets.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </BulletList>

        <LearnMoreBtn onClick={() => navigate({ to: "/path-product" })}>Tìm hiểu thêm</LearnMoreBtn>
      </Content>

      <ImageCollage>
        <CollageBackground />
        <CollageGrid>
          {image1 ? (
            <CollageImg src={image1} alt="product" />
          ) : (
            <CollagePlaceholder />
          )}
        </CollageGrid>
      </ImageCollage>
    </Inner>

      <Inner>
        <ImageCollage>
          <CollageBackground />
          <CollageGrid>
            {image2 ? (
              <CollageImg src={image2} alt="distribution" />
            ) : (
              <CollagePlaceholder />
            )}
          </CollageGrid>
        </ImageCollage>

        <Content>
          <Title>Hệ thống phân phối toàn quốc</Title>
          <Desc>
            Chúng tôi xây dựng mạng lưới phân phối rộng khắp, tiếp cận nhanh, đảm bảo hàng hóa đến khách hàng trong thời gian ngắn nhất.
          </Desc>

          <BulletList>
            <li>Kho hàng tại Hà Nội, TP.HCM, Đà Nẵng</li>
            <li>Giao hàng nhanh trong 24h khu vực nội thành</li>
            <li>Hệ thống đối tác vận chuyển uy tín</li>
          </BulletList>

          <LearnMoreBtn onClick={() => navigate({ to: "/path-distribution" })}>HỆ THỐNG PHÂN PHỐI</LearnMoreBtn>
        </Content>
      </Inner>
  </Section>
);
}
export default ProductHighlight;