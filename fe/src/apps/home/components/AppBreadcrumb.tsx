import { Breadcrumb } from "antd";
import styled from "styled-components";

const Wrapper = styled.div`
  background: #fff;
  padding: 20px 22rem;
  padding-bottom: 12px;
  .ant-breadcrumb,
  .ant-breadcrumb-link,
  .ant-breadcrumb-separator,
  .ant-breadcrumb a,
  .ant-breadcrumb span {
    font-size: 16px;
  }

  .ant-breadcrumb a {
    color: inherit !important;
    text-decoration: none;
  }

  .ant-breadcrumb a:hover {
    color: inherit !important;
    background: transparent !important; /* quan trọng */
    text-decoration: none !important;
  }

  .ant-breadcrumb li:hover {
    background: transparent !important; /* override hover ở li */
  }

  .ant-breadcrumb-link:hover {
    background: transparent !important;
  }
`;

interface Props {
  items: { label: string; href?: string }[];
}

const AppBreadcrumb = ({ items }: Props) => {
  return (
    <Wrapper>
      <Breadcrumb
        items={items.map((item) => ({
          title: item.href ? (
            <a href={item.href}>{item.label}</a>
          ) : (
            <span>{item.label}</span>
          ),
        }))}
      />
    </Wrapper>
  );
};

export default AppBreadcrumb;
