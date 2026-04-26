import { serviceBadges } from "../../home.data";
import {
  BadgeContent,
  BadgeDescription,
  BadgeItem,
  BadgeTitle,
  Container,
  IconWrapper,
  Section,
} from "./styled";

const Badge = () => {
  return (
    <Section>
      <Container>
        {serviceBadges.map((badge) => {
          const Icon = badge.icon;

          return (
            <BadgeItem key={badge.title}>
              <IconWrapper>
                <Icon size={28} />
              </IconWrapper>
              <BadgeContent>
                <BadgeTitle>{badge.title}</BadgeTitle>
                <BadgeDescription>{badge.description}</BadgeDescription>
              </BadgeContent>
            </BadgeItem>
          );
        })}
      </Container>
    </Section>
  );
};

export default Badge;
