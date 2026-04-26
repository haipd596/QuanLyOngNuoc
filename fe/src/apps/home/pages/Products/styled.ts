import { Button, Card, Radio } from "antd";
import styled from "styled-components";

export const PageIntro = styled.div`
  margin-bottom: 28px;

  span {
    display: block;
    color: var(--secondary);
    font-size: 14px;
    font-weight: 800;
    text-transform: uppercase;
    margin-bottom: 8px;
  }

  h1 {
    margin: 0;
    color: var(--primary);
    font-size: 34px;
    font-weight: 900;
  }

  p {
    max-width: 720px;
    margin: 10px 0 0;
    color: var(--text-secondary);
    font-size: 16px;
    line-height: 1.7;
  }
`;

export const CategoryPanel = styled.aside`
  position: sticky;
  top: 104px;
  border: 1px solid var(--border-secondary);
  border-radius: 8px;
  background: #fff;
  padding: 16px;
  box-shadow: 0 12px 32px rgba(15, 23, 42, 0.06);

  @media (max-width: 767px) {
    position: static;
  }
`;

export const CategoryTitle = styled.h3`
  font-size: 15px;
  font-weight: 900;
  margin: 0 0 12px;
  color: var(--primary);
  text-transform: uppercase;
`;

export const CategoryList = styled(Radio.Group)`
  display: grid !important;
  gap: 8px;
  width: 100%;
`;

export const CategoryItem = styled(Radio.Button)`
  width: 100% !important;
  height: auto !important;
  min-height: 40px;
  border-radius: 8px !important;
  border-left-width: 1px !important;
  padding: 8px 14px !important;
  font-size: 14px;
  text-align: left;
  transition: all 0.2s ease;

  &::before {
    display: none !important;
  }

  &:not(.ant-radio-button-wrapper-checked) {
    color: var(--text-primary);
    border-color: var(--border-secondary);

    &:hover {
      color: var(--primary);
      border-color: var(--primary);
      background: var(--bg-surface-low);
    }
  }

  &.ant-radio-button-wrapper-checked {
    background-color: var(--primary) !important;
    border-color: var(--primary) !important;
    color: #fff !important;
    font-weight: 800;
    box-shadow: 0 8px 18px rgba(11, 79, 138, 0.18);
  }
`;

export const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
  gap: 20px;

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
  }
`;

export const ProductsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  margin-bottom: 20px;

  @media (max-width: 720px) {
    align-items: stretch;
    flex-direction: column;
  }
`;

export const ProductsTitle = styled.h2`
  margin: 0;
  color: var(--primary);
  font-size: 24px;
  font-weight: 900;
`;

export const FilterWrapper = styled.div`
  display: flex;
  gap: 12px;

  @media (max-width: 720px) {
    width: 100%;

    .ant-input-search {
      width: 100% !important;
    }
  }
`;

export const ProductCardWrapper = styled(Card)`
  width: 100%;
  border-radius: 8px !important;
  border: 1px solid var(--border-secondary) !important;
  box-shadow: none !important;
  overflow: hidden;
  transition: box-shadow 0.25s ease, transform 0.25s ease;

  &:hover {
    box-shadow: 0 16px 34px rgba(15, 23, 42, 0.12) !important;
    transform: translateY(-3px);
  }

  .ant-card-body {
    min-height: 190px;
    padding: 14px !important;
    display: flex;
    flex-direction: column;
  }

  .ant-card-cover img {
    border-radius: 0;
  }
`;

export const ProductImage = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
  background-color: var(--bg-surface-low);
`;

export const ProductName = styled.h4`
  font-size: 15px;
  font-weight: 800;
  margin: 0 0 7px;
  color: var(--text-primary);
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  min-height: 42px;
  line-height: 1.4;
`;

export const ProductDescription = styled.p`
  font-size: 13px;
  color: var(--text-secondary);
  margin: 0 0 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const ProductPrice = styled.div`
  font-size: 18px;
  font-weight: 900;
  color: var(--secondary);
  margin: auto 0 12px;
`;

export const ProductFooter = styled.div`
  display: flex;
  margin-top: auto;
`;

export const AddToCartButton = styled(Button)`
  flex: 1;
  min-height: 40px;
  border-radius: 8px !important;
  font-weight: 800;

  &.ant-btn-primary {
    background-color: var(--primary) !important;
    border-color: var(--primary) !important;
    color: #fff !important;

    &:hover {
      background-color: #073e70 !important;
      border-color: #073e70 !important;
    }
  }
`;

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 360px;
  border: 1px dashed var(--border-primary);
  border-radius: 8px;
  color: var(--text-secondary);
  background: var(--bg-surface-low);
`;
