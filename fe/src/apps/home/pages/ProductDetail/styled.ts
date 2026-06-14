import { Button, Card, InputNumber, Tag } from "antd";
import styled from "styled-components";

export const PageShell = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 32px 24px 72px;
`;

export const DetailGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1.02fr) minmax(360px, 0.98fr);
  gap: 32px;
  align-items: start;

  @media (max-width: 960px) {
    grid-template-columns: 1fr;
  }
`;

export const GalleryPanel = styled.div`
  display: grid;
  gap: 14px;
`;

export const MainImageBox = styled.div`
  width: 100%;
  aspect-ratio: 1.1;
  border: 1px solid var(--border-secondary);
  border-radius: 8px;
  overflow: hidden;
  background: var(--bg-surface-low);
`;

export const MainImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

export const ThumbGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 10px;

  @media (max-width: 560px) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
`;

export const ThumbButton = styled.button<{ $active?: boolean }>`
  border: 2px solid ${({ $active }) => ($active ? "var(--primary)" : "var(--border-secondary)")};
  border-radius: 8px;
  padding: 0;
  aspect-ratio: 1;
  background: #fff;
  overflow: hidden;
  cursor: pointer;
  transition: border-color 0.2s ease, transform 0.2s ease;

  &:hover {
    border-color: var(--primary);
    transform: translateY(-1px);
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
`;

export const InfoPanel = styled.div`
  display: grid;
  gap: 18px;
`;

export const EyebrowRow = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
`;

export const ProductTitle = styled.h1`
  margin: 0;
  color: var(--primary);
  font-size: clamp(28px, 4vw, 42px);
  line-height: 1.16;
  font-weight: 900;
`;

export const ShortDescription = styled.p`
  margin: 0;
  color: var(--text-secondary);
  font-size: 16px;
  line-height: 1.7;
`;

export const PriceBlock = styled.div`
  display: flex;
  align-items: baseline;
  gap: 12px;
  flex-wrap: wrap;
`;

export const Price = styled.div`
  color: var(--secondary);
  font-size: 34px;
  font-weight: 900;
`;

export const UnitText = styled.span`
  color: var(--text-secondary);
  font-size: 15px;
  font-weight: 700;
`;

export const MetaGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
  }
`;

export const MetaItem = styled.div`
  border: 1px solid var(--border-secondary);
  border-radius: 8px;
  padding: 13px 14px;
  background: #fff;

  span {
    display: block;
    color: var(--text-secondary);
    font-size: 12px;
    font-weight: 800;
    text-transform: uppercase;
    margin-bottom: 5px;
  }

  strong {
    color: var(--text-primary);
    font-size: 15px;
  }
`;

export const PurchaseCard = styled(Card)`
  border-radius: 8px !important;
  border-color: var(--border-secondary) !important;
  box-shadow: 0 16px 34px rgba(15, 23, 42, 0.08);

  .ant-card-body {
    display: grid;
    gap: 16px;
  }
`;

export const QuantityRow = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  flex-wrap: wrap;

  span {
    color: var(--text-primary);
    font-weight: 800;
  }
`;

export const QuantityInput = styled(InputNumber)`
  width: 128px;
  height: 40px;

  .ant-input-number-input {
    height: 38px;
    font-weight: 800;
  }
`;

export const AddButton = styled(Button)`
  min-height: 44px;
  border-radius: 8px !important;
  font-weight: 900;

  &.ant-btn-primary {
    background-color: var(--primary) !important;
    border-color: var(--primary) !important;
  }
`;

export const SectionCard = styled(Card)`
  margin-top: 24px;
  border-radius: 8px !important;
  border-color: var(--border-secondary) !important;

  .ant-card-head-title {
    color: var(--primary);
    font-weight: 900;
  }
`;

export const DetailText = styled.div`
  color: var(--text-primary);
  font-size: 15px;
  line-height: 1.8;
  white-space: pre-line;
`;

export const SpecGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;

  @media (max-width: 820px) {
    grid-template-columns: 1fr;
  }

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
  }
`;

export const PolicyGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;

  @media (max-width: 820px) {
    grid-template-columns: 1fr;
  }
`;

export const PolicyItem = styled.div`
  border: 1px solid var(--border-secondary);
  border-radius: 8px;
  padding: 16px;
  background: var(--bg-surface-low);

  strong {
    display: block;
    color: var(--primary);
    margin-bottom: 6px;
  }

  span {
    color: var(--text-secondary);
    line-height: 1.6;
  }
`;

export const StockTag = styled(Tag)<{ $inStock?: boolean }>`
  margin: 0;
  border-radius: 999px;
  font-weight: 800;
  border: none;
  color: ${({ $inStock }) => ($inStock ? "#117a34" : "#a61b1b")} !important;
  background: ${({ $inStock }) => ($inStock ? "#e8f7ee" : "#fdecec")} !important;
`;

export const RelatedHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-top: 34px;
  margin-bottom: 16px;

  h2 {
    margin: 0;
    color: var(--primary);
    font-size: 24px;
    font-weight: 900;
  }
`;
