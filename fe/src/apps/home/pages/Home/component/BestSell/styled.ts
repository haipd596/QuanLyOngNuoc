import styled from "styled-components";
import { Card as AntCard } from "antd";

/* ===== Section ===== */
export const Section = styled.section`
  padding: 6rem 0;
  background: #fff;
`;

export const Container = styled.div`
  max-width: 90%;
  margin: 0 auto;
  padding: 0 1.5rem;
`;

/* ===== Header ===== */
export const Header = styled.div`
  text-align: center;
  margin-bottom: 4rem;
`;

export const Tag = styled.span`
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--secondary);
`;

export const Title = styled.h2`
  font-size: 3rem;
  font-weight: 900;
  color: var(--primary);
  margin-top: 0.5rem;
`;

/* ===== Grid ===== */
export const Grid = styled.div`
  display: grid;
  gap: 2rem;

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

/* ===== Card (Antd override) ===== */
export const Card = styled(AntCard)`
  border-radius: 0.75rem !important;
  overflow: hidden;
  cursor: pointer;
  border: none !important;

  .ant-card-body {
    padding: 1rem 1.25rem;
  }

  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12);
    transform: translateY(-4px);
  }

  .ant-card-cover img {
    transition: transform 0.5s ease;
  }

  &:hover .ant-card-cover img {
    transform: scale(1.1);
  }
`;

/* ===== Image wrapper ===== */
export const ImageBox = styled.div`
  position: relative;
  width: 100%;
  height: 220px;
  background: var(--bg-secondary);
  overflow: hidden;

  img {
    position: absolute;   
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;    
    transition: transform 0.5s ease;
  }
`;

/* ===== Badge ===== */
export const Badge = styled.span`
  position: absolute;
  top: 1rem;
  left: 1rem;

  font-size: 0.65rem;
  font-weight: 700;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;

  background: var(--primary);
  color: var(--white);
`;

/* ===== Content ===== */
export const Content = styled.div``;

export const Rating = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-secondary);
  margin-bottom: 0.5rem;
`;

export const ProductTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 0.25rem;

  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const Stock = styled.p`
  font-size: 1.25rem;
  margin-bottom: 1rem;
  color: var(--text-secondary);
`;

export const StockStatus = styled.span<{ status: "in" | "out" }>`
  font-weight: 700;
  color: ${({ status }) =>
    status === "in" ? "var(--text-success)" : "var(--text-error)"};
`;

/* ===== Footer ===== */
export const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Price = styled.span`
  font-size: 1.75rem;
  font-weight: 900;
  color: var(--secondary);
`;

export const CartButton = styled.button<{ disabled?: boolean }>`
  width: 40px;
  height: 40px;
  border-radius: 0.5rem;
  border: none;

  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;

  background: ${({ disabled }) =>
    disabled ? "var(--bg-disabled)" : "var(--secondary)"};

  color: var(--white);

  transition: all 0.25s ease;

  &:hover {
    ${({ disabled }) =>
      !disabled &&
      `
      background: var(--primary);
      transform: scale(1.05);
    `}
  }
`;