import styled from 'styled-components';
import { Card, Button, Radio } from 'antd';

// ─── Layout ───────────────────────────────────────────────────────────────────

export const ProductsContainer = styled.div`
  display: flex;
  gap: 24px;
  padding: 24px;
  max-width: 85%;
  margin: 0 auto;
  min-height: calc(100vh - 300px);

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 16px;
    gap: 16px;
  }
`;

// ─── Sidebar ──────────────────────────────────────────────────────────────────

export const CategoriesSidebar = styled.div`
  width: 220px;
  flex-shrink: 0;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const CategoryTitle = styled.h3`
  font-size: 15px;
  font-weight: 600;
  margin-bottom: 12px;
  color: var(--primary, #1890ff);
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

export const CategoryList = styled(Radio.Group)`
  display: flex !important;
  flex-direction: column;
  gap: 6px;
  width: 100%;
`;

export const CategoryItem = styled(Radio.Button)`
  width: 100% !important;
  border-radius: 6px !important;
  border-left-width: 1px !important; /* reset Ant Design's left-border quirk on Radio.Button groups */
  height: auto !important;
  padding:6px 14px !important;
  font-size: 14px;
  text-align: left;
  transition: all 0.2s ease;

  /* Override default Ant Radio.Button group connected borders */
  &::before {
    display: none !important;
  }

  &:not(.ant-radio-button-wrapper-checked) {
    color: #333;
    border-color: #d9d9d9;

    &:hover {
      color: var(--primary, #1890ff);
      border-color: var(--primary, #1890ff);
    }
  }

  &.ant-radio-button-wrapper-checked {
    background-color: var(--primary, #1890ff) !important;
    border-color: var(--primary, #1890ff) !important;
    color: #fff !important;
    font-weight: 600;
    box-shadow: 0 2px 8px color-mix(in srgb, var(--primary, #1890ff) 35%, transparent);
  }
`;

// ─── Products Content ─────────────────────────────────────────────────────────

export const ProductsContent = styled.div`
  flex: 1;
  min-width: 0;
`;

export const ProductsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  gap: 16px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const ProductsTitle = styled.h1`
  font-size: 22px;
  font-weight: 700;
  margin: 0;
  color: #111;
`;

export const FilterWrapper = styled.div`
  display: flex;
  gap: 12px;

  @media (max-width: 768px) {
    width: 100%;

    .ant-input-affix-wrapper {
      width: 100% !important;
    }
  }
`;

// ─── Product Grid ─────────────────────────────────────────────────────────────

export const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 16px;
  }

  @media (max-width: 480px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }
`;

// ─── Product Card ─────────────────────────────────────────────────────────────

export const ProductCardWrapper = styled(Card)`
  width: 100%;
  border-radius: 10px !important;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08) !important;
  overflow: hidden;
  transition: box-shadow 0.25s ease, transform 0.25s ease;

  &:hover {
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.13) !important;
    transform: translateY(-3px);
  }

  .ant-card-body {
    padding: 14px !important;
    display: flex;
    flex-direction: column;
  }

  /* Remove default cover padding/margin if any */
  .ant-card-cover img {
    border-radius: 0;
  }
`;

export const ProductImage = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
  background-color: #f0f0f0;
`;

export const ProductName = styled.h4`
  font-size: 14px;
  font-weight: 600;
  margin: 0 0 6px 0;
  color: #111;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  min-height: 40px;
  line-height: 1.4;
`;

export const ProductDescription = styled.p`
  font-size: 12px;
  color: #888;
  margin: 0 0 8px 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const ProductPrice = styled.div`
  font-size: 16px;
  font-weight: 700;
  color: var(--primary, #1890ff);
  margin: auto 0 12px 0;
`;

export const ProductFooter = styled.div`
  display: flex;
  margin-top: auto;
`;

export const AddToCartButton = styled(Button)`
  flex: 1;
  border-color: var(--primary, #1890ff) !important;
  color: var(--primary, #1890ff) !important;
  border-radius: 6px !important;
  font-weight: 500;
  transition: all 0.2s ease;

  &:hover {
    background-color: var(--primary, #1890ff) !important;
    color: #fff !important;
  }

  /* When type="primary" is passed, keep solid style */
  &.ant-btn-primary {
    background-color: var(--primary, #1890ff) !important;
    border-color: var(--primary, #1890ff) !important;
    color: #fff !important;

    &:hover {
      filter: brightness(1.1);
    }
  }
`;

// ─── Empty State ──────────────────────────────────────────────────────────────

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  color: #aaa;
`;