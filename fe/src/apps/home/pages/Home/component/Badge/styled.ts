import styled from "styled-components";

export const Section = styled.section`
  border-top: 1px solid var(--border-secondary);
  background-color: var(--bg-surface-low);
  padding: 34px 24px;
`;

export const Container = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 20px;

  @media (max-width: 860px) {
    grid-template-columns: 1fr;
  }
`;

export const BadgeItem = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  background: #fff;
  border: 1px solid var(--border-secondary);
  border-radius: 8px;
  padding: 18px;
`;

export const IconWrapper = styled.div`
  width: 52px;
  height: 52px;
  border-radius: 8px;
  color: var(--primary);
  background: rgba(11, 79, 138, 0.08);
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
`;

export const BadgeContent = styled.div`
  min-width: 0;
`;

export const BadgeTitle = styled.h4`
  font-weight: 800;
  font-size: 17px;
  color: var(--primary);
  margin: 0 0 4px;
`;

export const BadgeDescription = styled.p`
  font-size: 14px;
  color: var(--text-secondary);
  margin: 0;
  line-height: 1.5;
`;
