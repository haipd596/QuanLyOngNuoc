import { Button, Card, Layout } from "antd";
import styled from "styled-components";

const { Content } = Layout;

export const PageViewport = styled.div`
  width: 80%;
  margin: 0 auto;
`;

export const UserPageLayout = styled(Layout)`
  min-height: 100vh;
  background: #fff;
`;

export const UserPageContent = styled(Content)`
  padding: 2rem 2rem 2.5rem;
  background: #fff;
`;

export const ProfileContainer = styled.div`
  max-width: 1040px;
`;

export const HeadingBlock = styled.div`
  margin-bottom: 1.75rem;
`;

export const PageTitle = styled.h1`
  margin: 0 0 0.5rem;
  color: #0b2e59;
  font-size: 3rem;
  font-weight: 900;
  line-height: 1.05;
`;

export const PageDescription = styled.p`
  margin: 0;
  max-width: 720px;
  color: #5b6b82;
  font-size: 1.18rem;
  line-height: 1.65;
`;

export const ProfileCard = styled(Card)`
  border-radius: 24px;
  border: 1px solid #edf1f6;
  box-shadow: 0 14px 36px rgba(15, 43, 77, 0.06);

  .ant-card-body {
    padding: 2rem;
  }
`;

export const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1.75rem;
  flex-wrap: wrap;
`;

export const CardHeading = styled.div`
  display: flex;
  align-items: center;
  gap: 0.85rem;
`;

export const IconBadge = styled.div`
  width: 46px;
  height: 46px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(198, 124, 45, 0.12);
  color: #c67c2d;
  font-size: 1.15rem;
`;

export const SectionTitle = styled.h2`
  margin: 0;
  color: #0b2e59;
  font-size: 2rem;
  font-weight: 800;
`;

export const SectionDescription = styled.p`
  margin: 0.2rem 0 0;
  color: #93a0b3;
  font-size: 1.05rem;
`;

export const UserCode = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 0.45rem 0.9rem;
  border: 1px solid #d9e2ee;
  border-radius: 999px;
  background: #f8fbff;
  color: #0b2e59;
  font-size: 0.95rem;
  font-weight: 800;
`;

export const StyledFormWrap = styled.div`
  .ant-form-item {
    margin-bottom: 1.2rem;
  }

  .ant-form-item-label > label {
    color: #9aa8ba;
    font-size: 1.2rem;
    font-weight: 800;
    letter-spacing: 0.05em;
    text-transform: uppercase;
  }

  .ant-input-affix-wrapper,
  .ant-input,
  .ant-picker {
    width: 100%;
    min-height: 56px;
    border: 0;
    border-radius: 16px;
    background: #f3f4f6;
    box-shadow: none !important;
  }

  .ant-input-affix-wrapper {
    display: flex;
    align-items: center;
    padding-inline: 0.95rem;
  }

  .ant-input,
  .ant-input-affix-wrapper > input.ant-input,
  .ant-picker-input > input {
    color: #1d2734;
    font-size: 1.5rem;
    line-height: 1.3;
  }

  .ant-input::placeholder,
  .ant-input-affix-wrapper > input.ant-input::placeholder,
  .ant-picker-input > input::placeholder {
    font-size: 1.5rem;
  }

  .ant-picker-input {
    width: 100%;
  }

  .ant-input-prefix {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 0.55rem;
    color: #8b97a8;
    font-size: 1.5rem;
    line-height: 1;
  }

  .ant-picker-suffix {
    display: flex;
    align-items: center;
    justify-content: center;
    color: #1d2734;
    font-size: 1.2rem;
    line-height: 1;
  }

  .ant-picker {
    display: flex;
    align-items: center;
  }

  .ant-picker .ant-picker-suffix,
  .ant-picker .ant-picker-clear,
  .ant-input-affix-wrapper .ant-input-prefix,
  .ant-input-affix-wrapper .ant-input-suffix {
    height: 100%;
  }
`;

export const SaveButton = styled(Button)`
  min-width: 150px;
  height: 48px;
  margin-top: 0.55rem;
  border: 0;
  border-radius: 14px;
  background: #0b2e59 !important;
  color: #fff !important;
  font-size: 1.5rem;
  font-weight: 800;
  box-shadow: 0 14px 26px rgba(11, 46, 89, 0.18);
`;

export const RecentOrdersSection = styled(Card)`
  margin-top: 1.5rem;
  border-radius: 24px;
  border: 1px solid #edf1f6;
  box-shadow: 0 14px 36px rgba(15, 43, 77, 0.06);

  .ant-card-body {
    padding: 1.6rem;
  }
`;

export const RecentOrderHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1.35rem;
`;

export const RecentOrderAction = styled.a`
  color: #0b2e59;
  font-size: 1.2rem;
  font-weight: 700;
  text-underline-offset: 0.25rem;
  transition: all 0.3s ease;

  &:hover {
    color: #0a2647;
    letter-spacing: 0.5px;
    text-underline-offset: 0.4rem;
  }
`;

export const RecentOrderCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const RecentOrderItem = styled.div`
  display: grid;
  grid-template-columns: 64px minmax(0, 1fr) auto auto;
  gap: 1rem;
  align-items: center;
  padding: 1rem 1.1rem;
  border-radius: 18px;
  background: #f7f8fa;
`;

export const RecentOrderIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
  color: #0b2e59;
  font-size: 1.7rem;
`;

export const RecentOrderMeta = styled.div`
  min-width: 0;
`;

export const RecentOrderTitle = styled.h4`
  margin: 0 0 0.2rem;
  color: #0b2e59;
  font-size: 1.7rem;
  font-weight: 800;
`;

export const RecentOrderSecondary = styled.p`
  margin: 0;
  color: #8ea0ba;
  font-size: 1.2rem;
  text-transform: uppercase;
`;

export const RecentOrderAmount = styled.p`
  margin: 0 0 0.2rem;
  color: #0b2e59;
  font-size: 1.5rem;
  font-weight: 900;
  text-align: right;
`;

export const RecentOrderDate = styled.p`
  margin: 0;
  color: #91a2bb;
  font-size: 0.96rem;
  text-align: right;
`;

export const RecentOrderStatus = styled.span<{ $variant: "processing" | "shipping" | "completed" }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 128px;
  height: 40px;
  padding-inline: 1rem;
  border-radius: 999px;
  font-size: 1.2rem;
  font-weight: 800;
  text-transform: uppercase;
  color: ${({ $variant }) =>
    $variant === "processing"
      ? "#2f66ff"
      : $variant === "shipping"
        ? "#c77b16"
        : "#1f9a5f"};
  background: ${({ $variant }) =>
    $variant === "processing"
      ? "#e9f0ff"
      : $variant === "shipping"
        ? "#fff1dd"
        : "#dcf9ea"};
`;

export const InsightGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
`;

export const InsightCard = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  min-height: 168px;
  padding: 1.8rem;
  border: 1px solid #edf1f6;
  border-radius: 22px;
  background: #fff;
  box-shadow: 0 12px 28px rgba(15, 43, 77, 0.05);
`;

export const LoyaltyCard = styled(InsightCard)`
  background: linear-gradient(135deg, #a85b10 0%, #b1570a 100%);
  border-color: transparent;
  box-shadow: none;
`;

export const InsightIcon = styled.div<{ $dark?: boolean }>`
  width: 40px;
  height: 40px;
  border-radius: 999px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  background: ${({ $dark }) => ($dark ? "rgba(255,255,255,0.18)" : "#f5f8fc")};
  color: ${({ $dark }) => ($dark ? "#fff" : "#0b2e59")};
  font-size: 1.15rem;
`;

export const InsightCardText = styled.div`
  display: flex;
  flex-direction: column;
`;

export const InsightLabel = styled.p<{ $dark?: boolean }>`
  margin: 0 0 1rem;
  display: flex;
  align-items: center;
  gap: 0.7rem;
  color: ${({ $dark }) => ($dark ? "rgba(255,255,255,0.8)" : "#8e9bb0")};
  font-size: 1.5rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
`;

export const InsightPrimary = styled.h3<{ $light?: boolean }>`
  margin: 0 0 0.55rem 2.9rem;
  color: ${({ $light }) => ($light ? "#fff" : "#0b2e59")};
  font-size: ${({ $light }) => ($light ? "3rem" : "2rem")};
  font-weight: 900;
  line-height: 1.05;
`;

export const InsightSecondary = styled.p<{ $light?: boolean }>`
  margin: 0 0 0 2.9rem;
  color: ${({ $light }) => ($light ? "rgba(255,255,255,0.92)" : "#5f6f86")};
  font-size: 1.08rem;
  line-height: 1.6;
`;
