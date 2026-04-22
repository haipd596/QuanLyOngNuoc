import styled from "styled-components";

export const Section = styled.section`
  border-top: 1px solid var(--border-secondary);
  background-color: var(--bg-surface);
  padding: 3rem 1.5rem;
`;

export const Container = styled.div`
  max-width: 1120px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const BadgeItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  cursor: default;

  transition: all 0.3s ease;
`;

export const IconWrapper = styled.div`
  width: 7rem;
  height: 7rem;
  border-radius: 50%;
  color: var(--primary);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
`;

export const BadgeContent = styled.div``;

export const BadgeTitle = styled.h4`
  font-weight: 700;
  font-size: 2rem;
  color: var(--primary);
  margin: 0;
`;

export const BadgeDescription = styled.p`
  font-size: 1.5rem;
  color: var(--text-secondary);
  margin: 0;
`;