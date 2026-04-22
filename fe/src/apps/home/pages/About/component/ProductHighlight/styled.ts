import styled from "styled-components";
import { Button } from "antd";

export const Section = styled.section`
  padding: 64px 48px;
  background: #fff;
  max-width: 80%;
  margin: 0 auto;
`;

export const Inner = styled.div`
  display: flex;
  align-items: center;
  gap: 64px;

  & + & {
    margin-top: 64px;
  }

  @media (max-width: 900px) {
    flex-direction: column;
    gap: 40px;

    & + & {
      margin-top: 40px;
    }
  }
`;

export const ImageCollage = styled.div`
  position: relative;
  flex-shrink: 0;
  width: 800px;
  height: 550px;

  @media (max-width: 900px) {
    width: 100%;
    height: 520px;
  }
`;

export const CollageBackground = styled.div`
  position: absolute;
  inset: 0;
  background: #fdf3e3;
  border-radius: 12px;
  transform: translate(-16px, 16px);
`;

export const CollageGrid = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr;
  gap: 0;
  border-radius: 8px;
  overflow: hidden;
`;

export const CollageImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

export const CollagePlaceholder = styled.div`
  width: 100%;
  height: 100%;
  background: #e0dbd3;
`;

export const Content = styled.div`
  flex: 1;
`;

export const Title = styled.h2`
  font-size: 2.8rem;
  font-weight: 700;
  color: var(--primary);
  margin: 0 0 16px;
`;

export const Desc = styled.p`
  font-size: 1.76rem;
  line-height: 1.8;
  color: #555;
  margin: 0 0 20px;
`;

export const BulletList = styled.ul`
  list-style: disc;
  padding-left: 20px;
  margin: 0 0 28px;

  li {
    font-size: 1.76rem;
    line-height: 2;
    color: #444;
  }
`;

export const LearnMoreBtn = styled(Button)`
  background: var(--primary) !important;
  border-color: var(--primary) !important;
  color: #fff !important;
  border-radius: 24px !important;
  padding: 0 28px !important;
  height: 40px !important;
  font-size: 1.6rem !important;
  font-weight: 500 !important;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  transition: all 0.3s ease;

  &:hover {
    background: var(--primary) !important;
    border-color: var(--primary) !important;
    transform: scale(1.05);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }
`;
