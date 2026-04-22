import React, { type ReactNode } from "react";
import {
  Section,
  Container,
  BadgeItem,
  IconWrapper,
  BadgeContent,
  BadgeTitle,
  BadgeDescription,
} from "./styled";
import { MdVerified, MdLocalShipping, MdAssignmentReturn } from "react-icons/md";

interface BadgeProps {
  icon: ReactNode;
  title: string;
  description: string;
}


const badges: BadgeProps[] = [
  { icon: <MdVerified size={24} />, title: "Sản phẩm chính hãng", description: "Cam kết 100% từ nhà sản xuất" },
  { icon: <MdLocalShipping size={24} />, title: "Giao hàng thần tốc", description: "Nhận hàng trong vòng 24h" },
  { icon: <MdAssignmentReturn size={24} />, title: "Đổi trả dễ dàng", description: "Chính sách linh hoạt trong 7 ngày" },
];

const Badge: React.FC = () => {
  return (
    <Section>
      <Container>
        {badges.map((badge) => (
          <BadgeItem key={badge.title}>
            <IconWrapper className="icon-wrapper">
              <span
                className="material-symbols-outlined"
                style={{ fontVariationSettings: '"FILL" 1' }}
              >
                {badge.icon}
              </span>
            </IconWrapper>
            <BadgeContent>
              <BadgeTitle>{badge.title}</BadgeTitle>
              <BadgeDescription>{badge.description}</BadgeDescription>
            </BadgeContent>
          </BadgeItem>
        ))}
      </Container>
    </Section>
  );
};

export default Badge;