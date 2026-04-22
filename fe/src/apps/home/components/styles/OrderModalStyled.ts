import { Button, Card, Typography } from "antd";
import styled from "styled-components";

const { Text, Title } = Typography;

export const OrderModalBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.4rem;
`;

export const OrderList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const OrderItemCard = styled(Card)`
  && {
    border-color: #efe4cf;
    border-radius: 16px;
    background:
      linear-gradient(180deg, rgba(255, 251, 243, 0.9), rgba(255, 255, 255, 0.98));
    box-shadow: none;
  }

  .ant-card-body {
    padding: 1.2rem 1.4rem;
  }
`;

export const ItemTopRow = styled.div`
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto;
  gap: 1.25rem;
  align-items: start;

  @media (max-width: 640px) {
    grid-template-columns: auto minmax(0, 1fr);
  }
`;

export const ProductImage = styled.img`
  width: 108px;
  min-width: 108px;
  max-width: 108px;
  height: 108px;
  object-fit: cover;
  border-radius: 14px;
  border: 1px solid #ead7b0;
  background: #fff;
  display: block;
  flex-shrink: 0;
`;

export const ItemName = styled(Title)`
  && {
    margin: 0 !important;
    font-size: 1.77rem;
    line-height: 1.35;
    color: #1f1f1f;
  }
`;

export const ItemMeta = styled(Text)`
  && {
    font-size: 1.5rem;
    color: #7b6e5b;
  }
`;

export const ItemPrice = styled(Text)`
  && {
    font-size: 1.72rem;
    font-weight: 700;
    color: var(--primary);
  }
`;

export const RemoveItemButton = styled(Button)`
  && {
    width: 2.8rem;
    min-width: 2.8rem;
    height: 2.8rem;
    padding: 0;
    border-radius: 999px;
    border: 1px solid #ead7b0;
    background: #fff;
    color: #8a5a2b;
    box-shadow: none;
  }
`;

export const QuantitySection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.6rem;

  @media (max-width: 640px) {
    grid-column: 1 / -1;
    align-items: flex-end;
  }
`;

export const QuantityControl = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.35rem;
  border-radius: 999px;
  background: #fff7e8;
  border: 1px solid #f1deba;
`;

export const QuantityButton = styled(Button)`
  && {
    width: 2.4rem;
    min-width: 2.4rem;
    height: 2.4rem;
    padding: 0;
    border-radius: 999px;
    font-size: 1.8rem;
    font-weight: 700;
    border: none;
    box-shadow: none;
  }
`;

export const QuantityValue = styled(Text)`
  && {
    min-width: 2.2rem;
    text-align: center;
    font-size: 1.72rem;
    font-weight: 700;
    color: #2a241b;
  }
`;

export const ItemTotal = styled(Text)`
  && {
    font-size: 1.68rem;
    font-weight: 700;
    color: #172033;
  }
`;

export const ItemDivider = styled.div`
  width: 100%;
  height: 1px;
  margin: 1rem 0 0.9rem;
  background: #eadfcb;
`;

export const ItemTotalRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.8rem;
`;

export const ItemTotalLabel = styled(Text)`
  && {
    font-size: 1.42rem;
    color: #7b6e5b;
  }
`;

export const SummaryCard = styled(Card)`
  && {
    border-color: #f0ddb7;
    border-radius: 16px;
    background: #fff8ea;
    box-shadow: none;
  }

  .ant-card-body {
    padding: 1.2rem 1.4rem;
  }
`;

export const SummaryLabel = styled(Text)`
  && {
    font-size: 1.62rem;
    color: #5f5240;
  }
`;

export const SummaryValue = styled(Text)`
  && {
    font-size: 1.62rem;
    color: #5f5240;
  }
`;

export const SummaryTotal = styled(Text)`
  && {
    font-size: 1.92rem;
    font-weight: 700;
    color: #1b1812;
  }
`;

export const EmptyText = styled(Text)`
  && {
    display: block;
    padding: 1.6rem 1.2rem;
    text-align: center;
    border-radius: 16px;
    background: #fffaf0;
    color: #7b6e5b;
    font-size: 1.58rem;
  }
`;

export const CheckoutButton = styled(Button)`
  && {
    width: 100%;
    height: 4.5rem;
    border-radius: 16px;
    font-size: 1.7rem;
    font-weight: 700;
    box-shadow: none;
    color: #fff;
    background-color: var(--primary);
    border: none;

    transition: all 0.2s ease;

    &:hover,
    &:focus {
      background-color: var(--primary) !important; // 👈 giữ nguyên màu
      color: #fff !important;
      transform: translateY(-2px);                // 👈 hiệu ứng nổi lên
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15); // 👈 đổ bóng
    }

    &:active {
      transform: scale(0.98); // 👈 bấm xuống
      box-shadow: none;
    }
  }
`;
