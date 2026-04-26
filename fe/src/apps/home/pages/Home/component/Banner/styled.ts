import styled from "styled-components";

export const Section = styled.section`
  position: relative;
  overflow: hidden;
  background: linear-gradient(180deg, #f3f8fc 0%, #ffffff 100%);
`;

export const Container = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 72px 24px 56px;
  display: grid;
  grid-template-columns: minmax(0, 1.02fr) minmax(380px, 0.98fr);
  gap: 48px;
  align-items: center;

  @media (max-width: 960px) {
    grid-template-columns: 1fr;
    padding-top: 48px;
  }
`;

export const Content = styled.div`
  z-index: 1;
`;

export const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 9px 14px;
  background: rgba(242, 122, 26, 0.12);
  color: var(--secondary);
  font-size: 14px;
  font-weight: 800;
  border-radius: 999px;
  margin-bottom: 18px;
`;

export const Title = styled.h1`
  max-width: 720px;
  font-size: 54px;
  font-weight: 900;
  color: var(--primary);
  line-height: 1.08;
  letter-spacing: 0;
  margin: 0 0 22px;

  @media (max-width: 720px) {
    font-size: 38px;
  }
`;

export const Accent = styled.span`
  color: var(--secondary);
`;

export const Description = styled.p`
  font-size: 18px;
  color: var(--text-secondary);
  max-width: 620px;
  margin: 0 0 28px;
  line-height: 1.7;
`;

export const ButtonGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`;

export const PrimaryButton = styled.button`
  background: var(--primary);
  color: #fff;
  min-height: 46px;
  padding: 0 22px;
  border-radius: 8px;
  font-weight: 800;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  border: 1px solid var(--primary);
  cursor: pointer;
  box-shadow: 0 14px 28px rgba(11, 79, 138, 0.22);

  &:hover {
    background: #073e70;
  }
`;

export const SecondaryButton = styled.button`
  background: #fff;
  color: var(--primary);
  min-height: 46px;
  padding: 0 22px;
  border-radius: 8px;
  font-weight: 800;
  border: 1px solid var(--border-primary);
  cursor: pointer;

  &:hover {
    border-color: var(--primary);
    background: var(--bg-surface-low);
  }
`;

export const Stats = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
  margin-top: 34px;
  max-width: 620px;

  @media (max-width: 620px) {
    grid-template-columns: 1fr;
  }
`;

export const Stat = styled.div`
  border-left: 3px solid var(--secondary);
  padding-left: 14px;

  strong {
    display: block;
    color: var(--primary);
    font-size: 24px;
    line-height: 1.1;
  }

  span {
    display: block;
    color: var(--text-secondary);
    font-size: 14px;
    margin-top: 4px;
  }
`;

export const ImageWrapper = styled.div`
  position: relative;
  min-height: 380px;

  &::before {
    content: "";
    position: absolute;
    inset: 28px -14px -16px 44px;
    background: #d9edf9;
    border-radius: 8px;
  }
`;

export const BannerImage = styled.img`
  position: relative;
  width: 100%;
  height: 470px;
  border-radius: 8px;
  object-fit: cover;
  box-shadow: 0 24px 60px rgba(15, 23, 42, 0.18);

  @media (max-width: 720px) {
    height: 320px;
  }
`;
