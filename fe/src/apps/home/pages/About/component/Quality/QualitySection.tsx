import { Row, Col } from "antd";
import {
  Section,
  SectionTitle,
  FeatureItem,
  IconBox,
  IconPlaceholder,
  FeatureText,
  FeatureTitle,
  FeatureDesc,
} from "./styled";

import icon1 from "@assets/images/icon1.png";
import icon2 from "@assets/images/icon2.png";
import icon3 from "@assets/images/icon3.png";
import icon4 from "@assets/images/icon4.png";
import icon5 from "@assets/images/icon5.png";
import icon6 from "@assets/images/icon6.png";

const features = {
  left: [
    {
      icon: icon1,
      title: "Nguyên liệu nhập khẩu cao cấp",
      desc: "Ống Việt Úc sử dụng 100% hạt nhựa nguyên sinh trong các sản phẩm. Chúng tôi cam kết sản phẩm luôn đạt chất lượng sử dụng cao nhất.",
    },
    {
      icon: icon2,
      title: "Quy trình sản xuất hiện đại",
      desc: "Các nhà máy của Ống Việt Úc sử dụng dây chuyền sản xuất công nghệ cao tiên tiến, sử dụng quy trình hiện đại, vượt trội.",
    },
    {
      icon: icon3,
      title: "An toàn, thân thiện với môi trường",
      desc: "Sản phẩm của chúng tôi đảm bảo sạch, thân thiện, không nhiễm độc nhựa, phù hợp với các mục đích dân dụng và nông nghiệp.",
    },
  ],
  right: [
    {
      icon: icon4,
      title: "Sản phẩm đa dạng",
      desc: "Ống Việt Úc có hệ thống sản phẩm đa dạng, áp dụng được trong nhiều mục đích từ dân dụng tới công trình.",
    },
    {
      icon: icon5,
      title: "Hoạt động tốt trong mọi thời tiết",
      desc: "Các sản phẩm Ống Việt Úc bền bỉ, có thể sử dụng lâu dài trong các mục đích ngoài trời.",
    },
    {
      icon: icon6,
      title: "Bền bỉ, chống cháy, chống hóa chất",
      desc: "Sản phẩm của chúng tôi hoạt động tốt trong nhiều điều kiện phức tạp, đặc biệt là với ngành công nghiệp hóa chất.",
    },
  ],
};

const QualitySection = () => (
  <Section>
    <SectionTitle>Chất lượng của Ống Việt Úc</SectionTitle>

    <Row gutter={[32, 0]} align="middle">
      <Col xs={24} md={12}>
        {features.left.map((item) => (
          <FeatureItem key={item.title}>
            {item.icon ? (
              <IconBox>
                <img src={item.icon} alt={item.title} />
              </IconBox>
            ) : (
              <IconPlaceholder />
            )}
            <FeatureText>
              <FeatureTitle>{item.title}</FeatureTitle>
              <FeatureDesc>{item.desc}</FeatureDesc>
            </FeatureText>
          </FeatureItem>
        ))}
      </Col>

      <Col xs={24} md={12}>
        {features.right.map((item) => (
          <FeatureItem key={item.title} $reverse>
            {item.icon ? (
              <IconBox>
                <img src={item.icon} alt={item.title} />
              </IconBox>
            ) : (
              <IconPlaceholder />
            )}
            <FeatureText>
              <FeatureTitle>{item.title}</FeatureTitle>
              <FeatureDesc>{item.desc}</FeatureDesc>
            </FeatureText>
          </FeatureItem>
        ))}
      </Col>
    </Row>
  </Section>
);

export default QualitySection;