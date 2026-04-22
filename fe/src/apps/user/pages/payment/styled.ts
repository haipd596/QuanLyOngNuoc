import { Button, Card, Layout, Radio } from "antd";
import styled from "styled-components";

const { Content } = Layout;

export const PaymentViewport = styled.div`
  width: 76%;
  margin: 0 auto;
`;

export const PaymentContent = styled(Content)`
  padding: 2rem 0 3rem;
  background: #fff;
`;

export const PaymentHeader = styled.div`
  margin-bottom: 1.75rem;
`;

export const PaymentTitle = styled.h1`
  margin: 0 0 0.4rem;
  color: #0b2e59;
  font-size: 2.9rem;
  font-weight: 900;
  line-height: 1.05;
`;

export const PaymentDescription = styled.p`
  margin: 0;
  color: #667991;
  font-size: 1.2rem;
`;

export const PaymentGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1.45fr) minmax(320px, 0.95fr);
  gap: 1.75rem;
`;

export const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const SectionTitle = styled.h2`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  margin: 0 0 0.95rem;
  color: #0b2e59;
  font-size: 1.7rem;
  font-weight: 900;
`;

export const StepBadge = styled.span`
  width: 28px;
  height: 28px;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: #0b2e59;
  color: #fff;
  font-size: 0.95rem;
  font-weight: 800;
`;

export const SectionCard = styled(Card)`
  border-radius: 18px;
  border: 1px solid #edf1f6;
  background: #f7f8fa;
  box-shadow: none;

  .ant-card-body {
    padding: 1.35rem;
  }
`;

export const StyledForm = styled.div`
  .ant-form-item {
    margin-bottom: 1rem;
  }

  .ant-form-item-explain,
  .ant-form-item-extra {
    margin-top: 0.35rem;
  }

  .ant-form-item-label > label {
    color: #7e8ea5;
    font-size: 1.5rem;
    font-weight: 800;
    letter-spacing: 0.05em;
    text-transform: uppercase;
  }

  .ant-input-affix-wrapper,
  .ant-select-selector,
  .ant-picker,
  .ant-input-textarea textarea {
    border-radius: 12px !important;
    border: 1px solid #eef2f6 !important;
    box-shadow: none !important;
    font-size: 1.3rem;
  }

  .ant-input-affix-wrapper,
  .ant-picker {
    min-height: 46px;
  }

  .ant-input-affix-wrapper {
    width: 100%;
  }

  .ant-select-selector {
    min-height: 46px !important;
    padding-inline: 0.85rem !important;
    display: flex;
    align-items: center;
  }

  .ant-input-affix-wrapper,
  .ant-picker {
    padding-inline: 0.85rem;
  }

  .ant-input-textarea textarea {
    min-height: 88px;
    padding: 0.85rem;
  }

  .ant-input {
    width: 100%;
    min-height: 46px;
    padding-inline: 0.85rem;
    border-radius: 12px !important;
    border: 1px solid #eef2f6 !important;
    box-shadow: none !important;
    font-size: 1.3rem;
  }

  .ant-input-affix-wrapper > input.ant-input {
    min-height: auto;
    padding: 0 !important;
    border: 0 !important;
    background: transparent !important;
    box-shadow: none !important;
    border-radius: 0 !important;
  }

  .ant-input,
  .ant-select,
  .ant-picker {
    width: 100%;
  }
`;

export const ShippingGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
`;

export const ShippingOption = styled.label`
  display: flex;
  align-items: flex-start;
  gap: 0.85rem;
  padding: 1rem 1.1rem;
  border: 1px solid #edf1f6;
  border-radius: 16px;
  background: #fff;
  cursor: pointer;
`;

export const ShippingText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
`;

export const ShippingTitle = styled.p`
  margin: 0;
  color: #0b2e59;
  font-size: 1.5rem;
  font-weight: 800;
`;

export const ShippingSubText = styled.p`
  margin: 0;
  color: #7e8ea5;
  font-size: 1.4rem;
`;

export const ShippingPrice = styled.span`
  margin-left: auto;
  color: #b5620d;
  font-size: 1.2rem;
  font-weight: 900;
`;

export const SummaryCard = styled(Card)`
  border-radius: 18px;
  border: 1px solid #edf1f6;

  .ant-card-body {
    padding: 1.4rem;
  }
`;

export const SummaryTitle = styled.h3`
  margin: 0 0 1.2rem;
  color: #0b2e59;
  font-size: 1.7rem;
  font-weight: 800;
`;

export const SummaryItem = styled.div`
  display: grid;
  grid-template-columns: 60px minmax(0, 1fr) auto;
  gap: 2rem;
  align-items: center;
  margin-bottom: 0.95rem;
`;

export const SummaryItemContent = styled.div`
  min-width: 0;
`;

export const SummaryImage = styled.img`
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 10px;
`;

export const SummaryItemTitle = styled.p`
  margin: 0 0 0.25rem;
  color: #0b2e59;
  font-size: 1.5rem;
  font-weight: 700;
`;

export const SummaryItemPrice = styled.p`
  margin: 0;
  color: #0b2e59;
  font-size: 1.3rem;
  font-weight: 800;
`;

export const SummaryItemQuantity = styled.span`
  color: #7e8ea5;
  font-size: 1.3rem;
  font-weight: 800;
  white-space: nowrap;
`;

export const PriceRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin: 0.8rem 0;
  color: #6f8198;
  font-size: 1.3rem;
`;

export const TotalRow = styled(PriceRow)`
  margin-top: 1.25rem;
  color: #0b2e59;
  font-size: 1.4rem;
  font-weight: 800;
`;

export const TotalPrice = styled.span`
  color: #b5620d;
  font-size: 2.1rem;
  font-weight: 900;
`;

export const PaymentMethodCard = styled(Card)`
  border-radius: 18px;
  border: 1px solid #edf1f6;

  .ant-card-body {
    padding: 1.4rem;
  }
`;

export const StyledRadioGroup = styled(Radio.Group)`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  width: 100%;
`;

export const PaymentOption = styled(Radio)`
  width: 100%;
  margin-inline-start: 0 !important;
  padding: 1rem 1rem;
  border: 1px solid #edf1f6;
  border-radius: 14px;
  background: #fff;

  .ant-radio {
    top: 0.2rem;
  }

  .ant-radio + span {
    padding-inline-start: 0.9rem;
    color: #0b2e59;
    font-size: 1.4rem;
    font-weight: 700;
  }
`;

export const SubmitButton = styled(Button)`
  height: 52px;
  margin-top: 1.2rem;
  border: 0;
  border-radius: 14px;
  background: #0b2e59 !important;
  color: #fff !important;
  font-size: 1.5rem;
  font-weight: 800;
  box-shadow: 0 14px 24px rgba(11, 46, 89, 0.18);
`;

export const SecurityNote = styled.p`
  margin: 1rem 0 0;
  color: #7e8ea5;
  font-size: 1rem;
  text-align: center;
`;
