import { CheckCircleOutlined } from "@ant-design/icons";
import { BenefitCard, BenefitLink, BenefitText, BenefitTitle } from "../styled";

interface BenefitSectionProps {
  points: number;
}

const BenefitSection = ({ points }: BenefitSectionProps) => {
  return (
    <BenefitCard bordered={false}>
      <BenefitTitle>Ưu đãi khách hàng thân thiết</BenefitTitle>
      <BenefitText>
        Hoàn thành đơn hàng này để tích lũy thêm {points.toLocaleString('vi-VN')} điểm thành
        viên.
      </BenefitText>
      <BenefitLink href="#">
        Xem hạng thành viên <CheckCircleOutlined />
      </BenefitLink>
    </BenefitCard>
  );
};

export default BenefitSection;
