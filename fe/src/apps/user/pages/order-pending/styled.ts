import { Button, Card, Layout, Steps, Tag, Timeline } from "antd";
import styled from "styled-components";

const { Content } = Layout;

export const HistoryViewport = styled.div`
  width: 80%;
  margin: 0 auto;
`;

export const HistoryLayout = styled(Layout)`
  min-height: 100vh;
  background: #fff;
`;

export const HistoryContent = styled(Content)`
  padding: 3rem 0 3rem 2rem;
  background: #fff;
`;

export const HistoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

export const HeaderRow = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
`;

export const HeaderText = styled.div`
  margin: 0 0 0.5rem;
  color: #0b2e59;
  font-size: 3rem;
  font-weight: 900;
  line-height: 1.05;
`;

export const OrderTitle = styled.h1`
  margin: 0 0 0.45rem;
  color: #0b2e59;
  font-size: 2.9rem;
  font-weight: 900;
`;

export const OrderSubtext = styled.p`
  margin: 0;
  color: #6d7f96;
  font-size: 1.05rem;
`;

export const HeaderActions = styled.div`
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
`;

export const ActionButton = styled(Button)`
  padding: 1rem 1.3rem;
  border-radius: 12px;
  font-size: 1.2rem;
  font-weight: 700;
`;

export const SupportButton = styled(ActionButton)`
  background: #0b2e59 !important;
  border-color: #0b2e59 !important;
  color: #fff !important;
`;

export const MainCard = styled(Card)`
  border-radius: 20px;
  border: 1px solid #edf1f6;
  box-shadow: 0 14px 32px rgba(15, 43, 77, 0.05);

  .ant-card-body {
    padding: 1.5rem;
  }
`;

export const SectionHeading = styled.h3`
  margin: 0 0 1.25rem;
  color: #0b2e59;
  font-size: 1.8rem;
  font-weight: 800;
`;

export const DeliverySteps = styled(Steps)`
  .ant-steps-item-title {
    font-size: 1.2rem !important;
    font-weight: 700;
  }

  .ant-steps-item-description {
    font-size: 1rem !important;
  }

  .ant-steps-item-process .ant-steps-item-icon,
  .ant-steps-item-finish .ant-steps-item-icon {
    background: #b5620d !important;
    border-color: #b5620d !important;
  }

  .ant-steps-item-finish .ant-steps-item-tail::after,
  .ant-steps-item-process .ant-steps-item-tail::after {
    background-color: #b5620d !important;
  }

  .ant-steps-item-finish .ant-steps-item-title,
  .ant-steps-item-process .ant-steps-item-title {
    color: #0b2e59 !important;
  }
`;

export const HistoryGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1.65fr) 320px;
  gap: 1.25rem;
  margin-top: 1.5rem;
`;

export const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const ProductsCard = styled(Card)`
  border-radius: 18px;
  border: 1px solid #edf1f6;
  
  .ant-card-body {
    padding: 1rem;
  }
`;

export const ProductList = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ProductRow = styled.div`
  display: grid;
  grid-template-columns: 84px minmax(0, 1fr) auto;
  gap: 1rem;
  align-items: center;
  padding: 1rem 0;

  & + & {
    border-top: 1px solid #edf1f6;
  }
`;

export const ProductImage = styled.img`
  width: 84px;
  height: 84px;
  object-fit: cover;
  border-radius: 12px;
`;

export const ProductName = styled.h4`
  margin: 0 0 0.3rem;
  color: #0b2e59;
  font-size: 1.4rem;
  font-weight: 800;
`;

export const ProductCode = styled.p`
  margin: 0 0 0.6rem;
  color: #6d7f96;
  font-size: 1.3rem;
`;

export const QuantityTag = styled(Tag)`
  margin: 0;
  border-radius: 999px;
  padding-inline: 0.7rem;
  color: #6d7f96;
  background: #f4f7fb;
  border: 0;
  font-size: 0.88rem;
`;

export const ProductPriceWrap = styled.div`
  text-align: right;
`;

export const ProductPrice = styled.p`
  margin: 0 0 0.65rem;
  color: #0b2e59;
  font-size: 1.15rem;
  font-weight: 900;
`;

export const JourneyCard = styled(Card)`
  border-radius: 18px;
  border: 1px solid #edf1f6;

  .ant-card-body {
    padding: 1.2rem 1.25rem 1rem;
  }
`;

export const JourneyTimeline = styled(Timeline)`
  .ant-timeline-item-content {
    padding-bottom: 1.2rem;
  }

  .ant-timeline-item-head {
    width: 12px;
    height: 12px;
  }
`;

export const TimelineTime = styled.p`
  margin: 0 0 0.2rem;
  color: #8e9db1;
  font-size: 1rem;
  font-weight: 700;
  text-transform: uppercase;
`;

export const TimelineTitle = styled.p`
  margin: 0 0 0.2rem;
  color: #0b2e59;
  font-size: 1.2rem;
  font-weight: 800;
`;

export const TimelineText = styled.p`
  margin: 0;
  color: #5f728a;
  font-size: 1.2rem;
  line-height: 1.55;
`;

export const InfoCard = styled(Card)`
  border-radius: 18px;
  border: 1px solid #edf1f6;

  .ant-card-body {
    padding: 1.25rem;
  }
`;

export const InfoTitle = styled.h4`
  margin: 0 0 1rem;
  color: #0b2e59;
  font-size: 1.5rem;
  font-weight: 800;
`;

export const InfoLabel = styled.p`
  margin: 0 0 0.2rem;
  color: #8e9db1;
  font-size: 1rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

export const InfoText = styled.p`
  margin: 0 0 0.6rem;
  color: #0b2e59;
  font-size: 1.3rem;
  line-height: 1.6;
`;

export const NoteText = styled.p`
  margin: 0;
  color: #b5620d;
  font-size: 1.2rem;
  font-style: italic;
  line-height: 1.6;
`;

export const PaymentCard = styled(Card)`
  border-radius: 18px;
  border: 0;
  background: #0b2e59;
  box-shadow: 0 18px 36px rgba(11, 46, 89, 0.18);

  .ant-card-body {
    padding: 1.25rem;
  }
`;

export const PaymentTitle = styled.h4`
  margin: 0 0 1rem;
  color: #fff;
  font-size: 1.5rem;
  font-weight: 800;
`;

export const PaymentRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 0.75rem;
  margin-bottom: 1rem;
  color: rgba(255, 255, 255, 0.8);
  font-size: 1.3rem;
`;

export const PaymentTotal = styled(PaymentRow)`
  margin-top: 1rem;
  margin-bottom: 0;
  padding-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.12);
  color: #fff;
  align-items: flex-end;
`;

export const PaymentTotalValue = styled.span`
  font-size: 1.9rem;
  font-weight: 900;
  line-height: 1;
`;

export const PaidTag = styled.p`
  margin: 0.25rem 0 0;
  color: #8fb7ff;
  font-size: 0.72rem;
  font-weight: 700;
  text-align: right;
  text-transform: uppercase;
`;

export const BenefitCard = styled(Card)`
  border-radius: 18px;
  border: 1px solid #edf1f6;
  background: linear-gradient(180deg, #f6f7f9 0%, #f0f2f6 100%);

  .ant-card-body {
    padding: 1.2rem 1.25rem;
  }
`;

export const BenefitTitle = styled.h4`
  margin: 0 0 0.7rem;
  color: #0b2e59;
  font-size: 1.5rem;
  font-weight: 800;
`;

export const BenefitText = styled.p`
  margin: 0 0 0.8rem;
  color: #5f728a;
  font-size: 1.2rem;
  line-height: 1.6;
`;

export const BenefitLink = styled.a`
  color: #b5620d;
  font-size: 1.2rem;
  font-weight: 800;
  text-decoration: none;
`;
