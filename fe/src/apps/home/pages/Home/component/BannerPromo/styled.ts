import styled from "styled-components";

export const Section = styled.section`
  max-width: 1280px;
  margin: 0 auto 64px;
  padding: 0 24px;
`;

export const BannerWrapper = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) 420px;
  overflow: hidden;
  border-radius: 8px;
  background: var(--primary);
  min-height: 330px;
  box-shadow: 0 24px 52px rgba(15, 23, 42, 0.16);

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

export const BannerContent = styled.div`
  padding: 44px;
  color: #fff;

  @media (max-width: 620px) {
    padding: 28px;
  }
`;

export const BannerTitle = styled.h2`
  max-width: 640px;
  font-size: 34px;
  font-weight: 900;
  line-height: 1.18;
  color: #fff;
  margin: 0;
`;

export const BannerDesc = styled.p`
  max-width: 680px;
  margin: 16px 0 0;
  font-size: 16px;
  color: rgba(255, 255, 255, 0.86);
  line-height: 1.7;
`;

export const HighlightList = styled.ul`
  display: grid;
  gap: 8px;
  margin: 20px 0 0;
  padding-left: 20px;
  color: #fff;
  font-size: 15px;
`;

export const BannerButton = styled.button`
  margin-top: 26px;
  min-height: 44px;
  padding: 0 20px;
  font-weight: 800;
  color: var(--primary);
  background: #fff;
  border-radius: 8px;
  border: none;
  cursor: pointer;

  &:hover {
    background: #f3f8fc;
  }
`;

export const BannerImageWrapper = styled.div`
  min-height: 100%;
`;

export const BannerImage = styled.img`
  width: 100%;
  height: 100%;
  min-height: 300px;
  object-fit: cover;
`;
