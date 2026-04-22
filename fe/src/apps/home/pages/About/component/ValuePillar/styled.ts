import { Card } from "antd";
import styled from "styled-components";

export const Section = styled.section`
  padding: 64px 6px;
  max-width: 95%;
  margin: 0 auto;
  background: #fff;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
  max-width: 80%;
  margin: 0 auto;

  @media (max-width: 1000px) {
    grid-template-columns: 1fr;
  }
`;

export const StyledCard = styled(Card)`
  border: none !important;
  border-radius: 0 !important;
  box-shadow: none !important;
  background: transparent !important;

  &&& .ant-card-body {
    padding: 0 !important;
  }
`;

export const CardImage = styled.img`
  width: 100%;
  height: 350px;
  object-fit: cover;
  border-radius: 8px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  }
`;

export const PillarCardBody = styled.div`
  padding: 22px 12px 0;
  text-align: center;
`;

export const CardTitle = styled.h3`
  font-size: 24px;
  font-weight: 700;
  color: var(--primary);
  margin: 0 0 12px;
`;

export const CardDesc = styled.p`
  font-size: 16px;
  line-height: 1.85;
  color: #333;
  margin: 0;
`;
