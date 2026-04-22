import { Button, Card, Layout, Tag } from "antd";
import styled from "styled-components";

const { Content } = Layout;

export const SuccessViewport = styled.div`
  width: 76%;
  margin: 0 auto;
`;

export const SuccessContent = styled(Content)`
  padding: 2rem 0 3.5rem;
  background: #fff;
`;

export const SuccessHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 1rem;
  margin-bottom: 2rem;
`;

export const SuccessIcon = styled.div`
  width: 62px;
  height: 62px;
  border-radius: 999px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ff9500;
  color: #fff;
  font-size: 1.8rem;
  box-shadow: 0 18px 30px rgba(255, 149, 0, 0.18);
`;

export const SuccessTitle = styled.h1`
  margin: 0;
  color: #0b2e59;
  font-size: 3.4rem;
  font-weight: 900;
  line-height: 1.05;
`;

export const SuccessDescription = styled.p`
  margin: 0;
  max-width: 700px;
  color: #5c708b;
  font-size: 1.2rem;
  line-height: 1.75;
`;

export const SuccessGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) 320px;
  gap: 1.25rem;
`;

export const OrderCard = styled(Card)`
  border-radius: 22px;
  border: 1px solid #edf1f6;
  box-shadow: 0 14px 32px rgba(15, 43, 77, 0.05);

  .ant-card-body {
    padding: 1.6rem;
  }
`;

export const OrderMeta = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1.2rem;
  flex-wrap: wrap;
`;

export const MetaLabel = styled.p`
  margin: 0 0 0.35rem;
  color: #8e9db1;
  font-size: 1.2rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

export const MetaValue = styled.h3`
  margin: 0;
  color: #0b2e59;
  font-size: 2.2rem;
  font-weight: 900;
`;

export const DeliveryText = styled.p`
  margin: 0;
  color: #b5620d;
  font-size: 1.8rem;
  font-weight: 800;
`;

export const ProductItem = styled.div`
  display: grid;
  grid-template-columns: 72px minmax(0, 1fr) auto;
  gap: 1rem;
  align-items: center;
  padding: 1rem 0;

  & + & {
    border-top: 1px solid #edf1f6;
  }
`;

export const ProductImage = styled.img`
  width: 72px;
  height: 72px;
  object-fit: cover;
  border-radius: 12px;
`;

export const ProductName = styled.h4`
  margin: 0 0 0.25rem;
  color: #0b2e59;
  font-size: 1.7rem;
  font-weight: 800;
`;

export const ProductMeta = styled.p`
  margin: 0;
  color: #6e8098;
  font-size: 1.3rem;
`;

export const ProductPrice = styled.p`
  margin: 0;
  color: #0b2e59;
  font-size: 1.6rem;
  font-weight: 900;
  white-space: nowrap;
`;

export const MiniInfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
  margin-top: 1rem;
`;

export const MiniInfoCard = styled(Card)`
  border-radius: 18px;
  border: 1px solid #edf1f6;

  .ant-card-body {
    padding: 1.25rem;
  }
`;

export const MiniInfoTitle = styled.p`
  margin: 0 0 1rem;
  color: #8e9db1;
  font-size: 1.3rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

export const MiniInfoPrimary = styled.p`
  margin: 0 0 0.35rem;
  color: #0b2e59;
  font-size: 1.6rem;
  font-weight: 800;
`;

export const MiniInfoText = styled.p`
  margin: 0;
  color: #5f728a;
  font-size: 1.3rem;
  line-height: 1.6;
`;

export const SuccessTag = styled(Tag)`
  margin: 0.55rem 0 0;
  border: 0;
  border-radius: 999px;
  padding: 0.4rem 1.4rem;
  background: #ddf9e7;
  color: #19965d;
  font-size: 1.2rem;
  font-weight: 800;
`;

export const SummaryPanel = styled(Card)`
  border-radius: 18px;
  border: 0;
  background: #0b2e59;
  color: #fff;
  box-shadow: 0 18px 36px rgba(11, 46, 89, 0.18);

  .ant-card-body {
    padding: 1.5rem;
  }
`;

export const SummaryTitle = styled.h3`
  margin: 0 0 1.2rem;
  color: #fff;
  font-size: 2rem;
  font-weight: 800;
`;

export const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 0.85rem;
  color: rgba(255, 255, 255, 0.76);
  font-size: 1.4rem;
`;

export const SummaryTotal = styled(SummaryRow)`
  margin-top: 1rem;
  margin-bottom: 1.6rem;
  color: #fff;
  font-size: 1.4rem;
  font-weight: 800;
`;

export const SummaryTotalPrice = styled.span`
  font-size: 2rem;
  font-weight: 900;
`;

export const PrimaryAction = styled(Button)`
  height: 48px;
  border: 0;
  border-radius: 14px;
  background: #ff9500 !important;
  color: #fff !important;
  font-size: 1.5rem;
  font-weight: 800;
  box-shadow: 0 10px 20px rgba(255, 149, 0, 0.25);
  transition: all 0.25s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 16px 28px rgba(255, 149, 0, 0.35);
    background: #ffad33 !important;
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 6px 14px rgba(255, 149, 0, 0.2);
  }

  &::after {
    border-radius: 14px;
  }
`;

export const SecondaryAction = styled(Button)`
  height: 48px;
  margin-top: 0.85rem;
  border: 0;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.1) !important;
  color: #fff !important;
  font-size: 1.5rem;
  font-weight: 800;
  backdrop-filter: blur(6px);
  transition: all 0.25s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.2) !important;
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
    background: rgba(255, 255, 255, 0.15) !important;
  }

  &::after {
    border-radius: 14px;
  }
`;

export const PanelDivider = styled.div`
  height: 1px;
  margin: 1.4rem 0;
  background: rgba(255, 255, 255, 0.12);
`;

export const WarrantyNote = styled.p`
  margin: 0;
  color: rgba(255, 255, 255, 0.78);
  font-size: 1.2rem;
  line-height: 1.6;
`;

export const SupportCard = styled(Card)`
  margin-top: 1.6rem;
  border-radius: 22px;
  border: 1px solid #edf1f6;
  box-shadow: 0 14px 32px rgba(15, 43, 77, 0.05);

  .ant-card-body {
    padding: 1.9rem 2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1.5rem;
  }
`;

export const SupportText = styled.div`
  max-width: 76%;
`;

export const SupportHeading = styled.h3`
  margin: 0 0 0.6rem;
  color: #0b2e59;
  font-size: 2rem;
  font-weight: 800;
`;

export const SupportDescription = styled.p`
  margin: 0;
  color: #5f728a;
  font-size: 1.3rem;
  line-height: 1.7;
`;

export const SupportContacts = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.9rem;
  flex-wrap: wrap;
`;

export const SupportContact = styled.div`
  min-width: 220px;
  padding: 1rem 1.15rem;
  border-radius: 16px;
  border: 1px solid #edf1f6;
  background: #fff;
  display: flex;
  align-items: center;
  gap: 0.9rem;
`;

export const SupportIcon = styled.div`
  color: #b5620d;
  font-size: 1.2rem;
  line-height: 1;
`;

export const SupportContactLabel = styled.p`
  margin: 0 0 0.2rem;
  color: #8e9db1;
  font-size: 1.2rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
`;

export const SupportContactValue = styled.p`
  margin: 0;
  color: #0b2e59;
  font-size: 1.2rem;
  font-weight: 800;
`;
