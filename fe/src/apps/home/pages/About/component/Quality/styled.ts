import styled from "styled-components";

export const Section = styled.section`
  padding: 16px 48px;
  background: #fff;
  max-width: 65%;
  margin: 0 auto;
`;

export const SectionTitle = styled.h2`
  text-align: center;
  font-size: 36px;
  font-weight: 700;
  color: var(--primary);
  letter-spacing: 1px;
  text-transform: uppercase;
  margin-bottom: 48px;
`;

export const FeatureItem = styled.div<{ $reverse?: boolean }>`
  display: flex;
  align-items: flex-start;
  gap: 32px;
  margin-bottom: 72px;
  height: 130px;
  flex-direction: ${({ $reverse }) => ($reverse ? "row-reverse" : "row")};
  text-align: ${({ $reverse }) => ($reverse ? "right" : "left")};
`;

export const IconBox = styled.div`
  flex-shrink: 0;
  width: 104px;
  height: 104px;
  display: flex;
  align-items: flex-start;
  justify-content: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

export const IconPlaceholder = styled.div`
  width: 104px;
  height: 104px;
  border-radius: 50%;
  background: #f5e6d3;
  flex-shrink: 0;
`;

export const FeatureText = styled.div``;

export const FeatureTitle = styled.h4`
  font-size: 1.9rem;
  font-weight: 600;
  color: var(--primary);
  margin: 0 0 12px;
`;

export const FeatureDesc = styled.p`
  font-size: 1.64rem;
  line-height: 1.7;
  color: #555;
  margin: 0;
`;
