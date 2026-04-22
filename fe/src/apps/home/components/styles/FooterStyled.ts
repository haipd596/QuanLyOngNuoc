import styled from "styled-components";
import { Layout, Typography } from "antd";
import bgFooter from "@assets/images/bg-footer.jpg";

const { Footer } = Layout;
const { Title, Text } = Typography;

export const StyledFooter = styled(Footer)`
  position: relative;
  background: url(${bgFooter}) center/cover no-repeat;
  color: #fff;
  padding: 40px 24px;
  overflow: hidden;

  &:before {
    content: "";
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.6);
    z-index: 0;
  }

  > * {
    position: relative;
    z-index: 1;
  }
`;

export const FooterWrapper = styled.div`
  max-width: 90%;
  margin: 0 auto;
  width: 100%;
  margin-top: 16px;
`;

export const FooterTitle = styled(Title)`
  && {
    color: #da9412;
    margin-bottom: 12px;
  }
`;

export const FooterText = styled(Text)`
  display: block;
  color: #ccc !important;
  margin-bottom: 8px;
  padding-right: 24px;
`;

export const FooterTextWhite = styled(Text)`
  display: block;
  color: #fff !important;
  margin-bottom: 4px;
  padding-right: 24px;
`;

export const FooterList = styled.ul`
  padding-left: 16px;
  color: #ccc;
  margin-bottom: 0;

  li {
    margin-bottom: 6px;
    cursor: pointer;
    transition: 0.2s;

    &:hover {
      color: #fff;
    }
  }
`;

export const FooterBottom = styled.div`
  text-align: center;
  margin-top: 24px;
  color: #999;
`;
