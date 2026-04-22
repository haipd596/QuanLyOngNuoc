import { Button } from "antd";
import styled from "styled-components";

export const Page = styled.div`
  padding: 28px 4rem 48px;
  background: #fff;
`;

export const Shell = styled.div`
  max-width: 85%;
  margin: 0 auto;
`;

export const Heading = styled.h1`
  margin: 0 0 22px;
  color: var(--primary);
  font-size: 30px;
  line-height: 1.1;
`;

export const TwoCol = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1.02fr) minmax(420px, 0.98fr);
  gap: 24px;
  align-items: stretch;
`;

export const LeftPane = styled.div`
  min-width: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 22px;
`;

export const RightPane = styled.div`
  min-width: 0;
  display: flex;
  align-self: stretch;
`;

export const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 22px 24px;
  margin-bottom: 30px;
`;

export const InfoCard = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 14px;
`;

export const IconCircle = styled.div`
  width: 40px;
  height: 40px;
  flex: 0 0 40px;
  display: grid;
  place-items: center;
  border-radius: 999px;
  border: 1px solid color-mix(in srgb, var(--primary) 24%, #dfdfdf);
  background: color-mix(in srgb, var(--primary) 8%, #fff);
  color: var(--primary);
  font-size: 16px;
`;

export const InfoTitle = styled.h3`
  margin: 0 0 6px;
  color: #161616;
  font-size: 17px;
`;

export const InfoText = styled.p`
  margin: 0;
  color: #5e5e5e;
  font-size: 15px;
  line-height: 1.5;
`;

export const SectionTitle = styled.h2`
  margin: 0 0 12px;
  color: var(--primary);
  font-size: 32px;
  line-height: 1.12;
`;

export const Intro = styled.p`
  margin: 0 0 20px;
  color: #333;
  font-size: 16px;
  line-height: 1.65;
`;

export const FormCard = styled.div`
  padding-right: 16px;

  .ant-form-item {
    margin-bottom: 18px;
    width: 100%;
  }

  .ant-form-item-control,
  .ant-form-item-control-input,
  .ant-form-item-control-input-content,
  .ant-input,
  .ant-input-affix-wrapper,
  .ant-input-textarea {
    width: 100%;
  }

  .ant-input,
  .ant-input-affix-wrapper,
  .ant-input-textarea textarea {
    border-radius: 10px;
    min-height: 48px;
    border-color: #d9d9d9;
    padding: 10px 16px;
    font-size: 15px;
    box-shadow: none;
    transition: border-color 0.2s ease, box-shadow 0.2s ease;
  }

  .ant-input:focus,
  .ant-input-focused,
  .ant-input-affix-wrapper:focus,
  .ant-input-affix-wrapper-focused,
  .ant-input-textarea textarea:focus {
    border-color: var(--primary);
    box-shadow: 0 0 0 2px color-mix(in srgb, var(--primary) 14%, transparent);
  }
`;

export const SmallNotice = styled.p`
  margin: -8px 0 20px;
  color: #8e8e8e;
  font-size: 14px;
  line-height: 1.6;

  a {
    color: var(--primary);
    text-decoration: none;
  }
`;

export const SubmitButton = styled(Button)`
  height: 46px;
  padding: 0 24px;
  border: none;
  border-radius: 999px;
  background: linear-gradient(
    135deg,
    color-mix(in srgb, var(--primary) 84%, #fff) 0%,
    var(--primary) 100%
  ) !important;
  box-shadow: 0 14px 28px color-mix(in srgb, var(--primary) 22%, transparent);
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    filter 0.2s ease;

  &:hover,
  &:focus {
    transform: translateY(-2px);
    box-shadow: 0 18px 32px color-mix(in srgb, var(--primary) 24%, transparent);
    filter: brightness(1);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 10px 20px color-mix(in srgb, var(--primary) 20%, transparent);
  }
`;

export const MapCard = styled.div`
  flex: 1;
  overflow: hidden;
  height: 100%;
  border-radius: 0;
  border: 1px solid color-mix(in srgb, var(--primary) 16%, #e6dfd2);
  background: #f3efe8;
  box-shadow: 0 18px 42px rgba(38, 27, 11, 0.1);

  iframe {
    display: block;
    width: 100%;
    height: 100%;
    border: 0;
  }
`;
