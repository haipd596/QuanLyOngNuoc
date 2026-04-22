import styled from "styled-components";

export const Section = styled.section`
  position: relative;
  overflow: hidden;
`;

export const Container = styled.div`
  max-width: 70%;
  margin: 0 auto;
  padding: 4rem 1.5rem;

  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
  align-items: center;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
    padding: 6rem 1.5rem;
  }
`;

export const Content = styled.div`
  z-index: 10;
`;

export const Badge = styled.span`
  display: inline-block;
  padding: 0.75rem 0.75rem;

  background: var(--secondary-container);
  color: var(--text-on-secondary);

  font-size: 1rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;

  border-radius: 9999px;
  margin-bottom: 1.5rem;
`;

export const Title = styled.h1`
  font-size: 4rem;
  font-weight: 900;
  color: var(--primary);

  line-height: 1.1;
  letter-spacing: -0.03em;
  margin-bottom: 2rem;

  @media (min-width: 768px) {
    font-size: 5rem;
  }
`;

export const Accent = styled.span`
  color: var(--secondary-container);
`;

export const Description = styled.p`
  font-size: 1.5rem;
  color: var(--text-secondary);

  max-width: 28rem;
  margin-bottom: 2.5rem;
  line-height: 1.7;
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
`;

export const PrimaryButton = styled.button`
  background: var(--primary);
  color: var(--text-on-primary);

  padding: 1rem 3rem;
  border-radius: 1.5rem;
  font-weight: 700;

  display: flex;
  align-items: center;
  gap: 0.5rem;

  border: 2px solid var(--primary);
  cursor: pointer;

  box-shadow: var(--shadow-md);
  transition: all 0.25s ease;

  &:hover {
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const SecondaryButton = styled.button`
  background: var(--bg-surface-high);
  color: var(--text-primary);

  padding: 1rem 3rem;
  border-radius: 1.5rem;
  font-weight: 700;

  border: 1px solid var(--border-primary);
  cursor: pointer;

  transition: all 0.25s ease;

  &:hover {
    background: var(--bg-surface-highest);
    border-color: var(--primary);
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const ImageWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;

  &::before {
    content: "";
    position: absolute;
    inset: -12px;

    background: rgba(253, 139, 0, 0.15);
    border-radius: 2rem;

    transform: rotate(3deg);
    transition: transform 0.7s;
    z-index: 0;
  }

  &:hover::before {
    transform: rotate(0deg);
  }
`;

export const BannerImage = styled.img`
  position: relative;
  z-index: 1;

  width: 100%;
  max-width: 600px;

  border-radius: 1.5rem;
  object-fit: cover;
  aspect-ratio: 4 / 3;

  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
`;