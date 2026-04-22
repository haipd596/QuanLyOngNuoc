import styled, { keyframes } from "styled-components";
import { Input, Button, Typography } from "antd";
import login from "@assets/images/login.png";

const { Title, Text } = Typography;

type AuthMode = "left" | "right";

const enterLeft = keyframes`
  from { opacity: 0; transform: translateX(-56px) scale(0.98); }
  to { opacity: 1; transform: translateX(0) scale(1); }
`;

const enterRight = keyframes`
  from { opacity: 0; transform: translateX(56px) scale(0.98); }
  to { opacity: 1; transform: translateX(0) scale(1); }
`;

const exitLeft = keyframes`
  from { opacity: 1; transform: translateX(0) scale(1); }
  to { opacity: 0; transform: translateX(-48px) scale(0.98); }
`;

const exitRight = keyframes`
  from { opacity: 1; transform: translateX(0) scale(1); }
  to { opacity: 0; transform: translateX(48px) scale(0.98); }
`;

const imageDriftLeft = keyframes`
  from { transform: scale(1.08) translateX(32px); }
  to { transform: scale(1) translateX(0); }
`;

const imageDriftRight = keyframes`
  from { transform: scale(1.08) translateX(-32px); }
  to { transform: scale(1) translateX(0); }
`;

export const Page = styled.div<{ $mode?: AuthMode; $isExiting?: boolean }>`
  --auth-panel-width: min(42vw, 630px);
  display: flex;
  flex-direction: ${({ $mode = "left" }) => ($mode === "right" ? "row-reverse" : "row")};
  min-height: 100vh;
  background:
    radial-gradient(circle at top, rgba(245, 197, 24, 0.18), transparent 34%),
    linear-gradient(135deg, #fff9eb 0%, #ffffff 48%, #f6f7fb 100%);

  @media (max-width: 768px) {
    display: block;
    background: #fff;
  }
`;

export const LeftPanel = styled.div<{ $mode?: AuthMode; $isExiting?: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px 80px;
  width: var(--auth-panel-width);
  min-height: 100vh;
  flex-shrink: 0;
  position: relative;
  z-index: 1;
  background: rgba(255, 255, 255, 0.82);
  backdrop-filter: blur(16px);
  box-shadow: ${({ $mode = "left" }) =>
    $mode === "right"
      ? "-18px 0 55px rgba(15, 23, 42, 0.08)"
      : "18px 0 55px rgba(15, 23, 42, 0.08)"};
  animation: ${({ $mode = "left", $isExiting }) => {
      if ($isExiting) {
        return $mode === "right" ? exitRight : exitLeft;
      }
      return $mode === "right" ? enterRight : enterLeft;
    }}
    0.42s cubic-bezier(0.22, 1, 0.36, 1) both;

  @media (max-width: 768px) {
    width: 100%;
    min-height: 100vh;
    padding: 40px 28px;
    box-shadow: none;
    backdrop-filter: none;
  }
`;

export const AuthTopBar = styled.div`
  position: absolute;
  top: 24px;
  left: 28px;
  right: 28px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  z-index: 3;

  @media (max-width: 768px) {
    top: 20px;
    left: 20px;
    right: 20px;
  }
`;

export const HomeButton = styled(Button)`
  && {
    height: 40px;
    padding: 0 16px;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.92);
    color: #172033;
    font-weight: 600;
    border: none !important;  
    outline: none !important;

    &:hover,
    &:focus {
      color: var(--primary) !important;
      border: none !important; 
      background: #fff !important;
      transform: translateY(-1px);
    }
  }
`;

export const RightPanel = styled.div<{ $mode?: AuthMode; $isExiting?: boolean }>`
  flex: 1;
  min-height: 100vh;
  position: relative;
  overflow: hidden;
  background:
    linear-gradient(rgba(10, 15, 25, 0.18), rgba(10, 15, 25, 0.32)),
    url(${login}) center / cover no-repeat;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background:
      radial-gradient(circle at ${({ $mode = "left" }) => ($mode === "right" ? "22% 28%" : "78% 28%")}, rgba(245, 197, 24, 0.34), transparent 28%),
      radial-gradient(circle at center, rgba(255, 255, 255, 0.08), transparent 52%);
    animation: ${({ $mode = "left" }) => ($mode === "right" ? imageDriftRight : imageDriftLeft)}
      0.7s cubic-bezier(0.22, 1, 0.36, 1) both;
  }

  &::after {
    content: "Water systems, simplified.";
    position: absolute;
    left: ${({ $mode = "left" }) => ($mode === "right" ? "72px" : "auto")};
    right: ${({ $mode = "left" }) => ($mode === "right" ? "auto" : "72px")};
    bottom: 64px;
    width: min(320px, calc(100% - 96px));
    color: #fff;
    font-size: clamp(28px, 3.8vw, 46px);
    line-height: 1.08;
    font-weight: 700;
    letter-spacing: -0.03em;
    text-align: ${({ $mode = "left" }) => ($mode === "right" ? "left" : "right")};
    opacity: ${({ $isExiting }) => ($isExiting ? 0 : 1)};
    transform: translateY(${({ $isExiting }) => ($isExiting ? "18px" : "0")});
    transition: opacity 0.28s ease, transform 0.28s ease;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

export const Logo = styled.div`
  font-size: 22px;
  font-weight: 700;
  color: var(--primary);
  margin-bottom: 48px;
  letter-spacing: -0.5px;

  span {
    color: var(--primary);
  }
`;

export const Heading = styled(Title)`
  && {
    font-size: 26px;
    font-weight: 700;
    color: var(--primary);
    margin-bottom: 4px !important;
  }
`;

export const Sub = styled(Text)`
  && {
    display: block;
    color: #666;
    font-size: 14px;
    margin-bottom: 32px;
  }
`;

export const StyledInput = styled(Input)`
  width: 100% !important;
  height: 44px;
  border-radius: 8px;
  border-color: #e8e8e8;
  background: #fafafa;

  .ant-input {
    width: 100% !important;
    background: #fafafa;
  }

  &:hover,
  &:focus {
    border-color: var(--primary) !important;
    box-shadow: 0 0 0 2px rgba(245, 197, 24, 0.15) !important;
  }
`;

export const StyledPassword = styled(Input.Password)`
  width: 100% !important;
  height: 44px;
  border-radius: 8px;
  border-color: #e8e8e8;
  background: #fafafa;

  .ant-input {
    width: 100% !important;
    background: #fafafa;
  }

  &:hover,
  &.ant-input-affix-wrapper-focused {
    border-color: var(--primary) !important;
    box-shadow: 0 0 0 2px rgba(245, 197, 24, 0.15) !important;
  }
`;

export const Divider = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 20px 0;
  color: #ccc;
  font-size: 12px;

  &::before,
  &::after {
    content: "";
    flex: 1;
    height: 1px;
    background: #ebebeb;
  }
`;

export const LoginButton = styled(Button)`
  && {
    position: relative;
    overflow: hidden;
    height: 46px;
    border-radius: 8px;
    font-weight: 600;
    font-size: 15px;
    background: var(--primary);
    border-color: var(--primary);
    color: #fff;
    letter-spacing: 0.04em;
    transition: transform 0.15s ease, box-shadow 0.15s ease, background 0.2s ease;

    &:hover {
      background: color-mix(in srgb, var(--primary) 85%, #000) !important;
      border-color: transparent !important;
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15) !important;
    }

    &:active {
      transform: scale(0.98);
      box-shadow: none !important;
    }
  }
`;

export const GoogleButton = styled(Button)`
  && {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    height: 46px;
    border-radius: 8px;
    border: 1.5px solid #e8e8e8;
    background: #d93025;
    color: #fff;
    font-weight: 500;
    font-size: 18px;
    width: 100%;
    transition: transform 0.15s ease, box-shadow 0.15s ease !important;
    cursor: pointer;

    &:hover,
    &:focus,
    &:active {
      background: #bf271d !important;
      border-color: #bf271d !important;
      color: #fff !important;
      transform: translateY(-1px) !important;
      box-shadow: 0 10px 24px rgba(217, 48, 37, 0.24) !important;
      opacity: 1 !important;
    }

    &::before,
    &::after {
      display: none !important;
    }

    * {
      color: #fff !important;
      fill: currentColor !important;
    }
  }
`;

export const BottomRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  margin-top: 8px;

  a,
  span {
    font-size: 14px;
  }
`;

export const InlineTextGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;
