import { Section, Avatar, AvatarPlaceholder, QuoteText, Author } from "./styled";

import ava from "@assets/images/ava.png";

const avatarImg = ava; 

const Quote = () => (
  <Section>
    {avatarImg ? (
      <Avatar src={avatarImg} alt="Nguyễn Thị Thu Thảo" />
    ) : (
      <AvatarPlaceholder />
    )}

    <QuoteText>
      "Trải qua hơn 20 năm hình thành và phát triển, chúng tôi luôn mong muốn
      đem đến cho quý khách hàng hệ thống sản phẩm chất lượng cao, tiêu chuẩn
      vượt trội, an toàn với môi trường. Chúng tôi rất hân hạnh được là một
      phần trong các hệ thống nông nghiệp, công nghiệp, dân dụng trên toàn
      quốc và quốc tế."
    </QuoteText>

    <Author>Mrs. Nguyễn Thị Thu Thảo – Phó giám Đốc</Author>
  </Section>
);

export default Quote;