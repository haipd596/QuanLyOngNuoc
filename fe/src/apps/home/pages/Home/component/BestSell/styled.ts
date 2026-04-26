import { Card as AntCard } from "antd";
import styled from "styled-components";

export const Section = styled.section`
  padding: 64px 0;
  background: #fff;
`;

export const Container = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 24px;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 24px;
  margin-bottom: 28px;

  @media (max-width: 720px) {
    display: block;
  }
`;

export const Tag = styled.span`
  display: block;
  font-size: 14px;
  font-weight: 800;
  color: var(--secondary);
  text-transform: uppercase;
  margin-bottom: 8px;
`;

export const Title = styled.h2`
  font-size: 34px;
  font-weight: 900;
  color: var(--primary);
  margin: 0;
`;

export const Grid = styled.div`
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(4, minmax(0, 1fr));

  @media (max-width: 1060px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
  }
`;

export const Card = styled(AntCard)`
  border-radius: 8px !important;
  overflow: hidden;
  cursor: pointer;
  border: 1px solid var(--border-secondary) !important;
  box-shadow: none;
  transition: box-shadow 0.25s ease, transform 0.25s ease;

  .ant-card-body {
    padding: 16px;
  }

  &:hover {
    box-shadow: 0 18px 40px rgba(15, 23, 42, 0.12);
    transform: translateY(-3px);
  }
`;

export const ImageBox = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 4 / 3;
  background: var(--bg-surface-low);
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.35s ease;
  }

  ${Card}:hover & img {
    transform: scale(1.04);
  }
`;

export const Badge = styled.span`
  position: absolute;
  top: 12px;
  left: 12px;
  font-size: 12px;
  font-weight: 800;
  padding: 5px 8px;
  border-radius: 6px;
  background: var(--secondary);
  color: #fff;
`;

export const Content = styled.div``;

export const Rating = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 13px;
  font-weight: 700;
  color: #f4a100;
  margin-bottom: 8px;
`;

export const ProductTitle = styled.h3`
  min-height: 44px;
  font-size: 16px;
  font-weight: 800;
  color: var(--text-primary);
  margin: 0 0 8px;
  line-height: 1.35;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const Stock = styled.p`
  font-size: 14px;
  margin: 0 0 14px;
  color: var(--text-secondary);
`;

export const StockStatus = styled.span<{ status: "in" | "out" }>`
  font-weight: 800;
  color: ${({ status }) => (status === "in" ? "#159947" : "#c62828")};
`;

export const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Price = styled.span`
  font-size: 20px;
  font-weight: 900;
  color: var(--secondary);
`;

export const CartButton = styled.button<{ disabled?: boolean }>`
  width: 40px;
  height: 40px;
  border-radius: 8px;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  background: ${({ disabled }) => (disabled ? "#d6dce2" : "var(--primary)")};
  color: #fff;

  &:hover {
    background: ${({ disabled }) => (disabled ? "#d6dce2" : "#073e70")};
  }
`;
