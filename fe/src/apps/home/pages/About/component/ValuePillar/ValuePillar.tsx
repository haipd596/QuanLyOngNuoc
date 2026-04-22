import { CardDesc, CardImage, CardTitle, Grid, PillarCardBody, Section, StyledCard } from "./styled";
import img1 from "@assets/images/img1.png"
import img2 from "@assets/images/img2.png"
import img3 from "@assets/images/img3.png"

const pillars = [
  {
    title: "Trí tuệ",
    image: img1,
    description:
      "Ống Việt Úc đề cao tri thức, sáng tạo, đổi mới. Với đội ngũ trẻ trung, giàu kinh nghiệm, chúng tôi tự tin đem tới những sản phẩm có chất lượng tốt nhất tới tay khách hàng.",
  },
  {
    title: "Trách nhiệm",
    image: img2,
    description:
      "Ống Việt Úc tự hào là đơn vị uy tín, đảm bảo chất lượng ổn định. Chúng tôi có chính sách chăm sóc khách hàng, đổi trả và bảo hành tận tâm, cam kết duy trì sự hài lòng của khách hàng.",
  },
  {
    title: "An toàn",
    image: img3,
    description:
      "Ống Việt Úc sử dụng nguyên vật liệu an toàn, thân thiện với môi trường. Sản phẩm không độc hại với người sản xuất và người sử dụng.",
  },
];


const ValuePillars = () => (
  <Section>
    <Grid>
      {pillars.map((item) => (
        <StyledCard key={item.title} cover={<CardImage src={item.image} alt={item.title} />}>
          <PillarCardBody>
            <CardTitle>{item.title}</CardTitle>
            <CardDesc>{item.description}</CardDesc>
          </PillarCardBody>
        </StyledCard>
      ))}
    </Grid>
  </Section>
);

export default ValuePillars;