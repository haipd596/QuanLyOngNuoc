import styled from "styled-components";

export const AdminLayout = styled.div`
  min-height: 115vh;
  background: #f4f7fb;
  color: #152033;
  display: grid;
  grid-template-columns: 264px minmax(0, 1fr);

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

export const Sidebar = styled.aside`
  background: #0f2744;
  color: #ffffff;
  padding: 24px 18px;
  display: flex;
  flex-direction: column;
  gap: 24px;

  @media (max-width: 900px) {
    position: static;
  }
`;

export const Brand = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 18px;
  font-weight: 700;
  line-height: 1.2;

  .anticon {
    font-size: 24px;
    color: #68d391;
  }
`;

export const SidebarNav = styled.nav`
  display: grid;
  gap: 8px;
`;

export const MenuButton = styled.button<{ $active?: boolean }>`
  width: 100%;
  border: 0;
  border-radius: 8px;
  padding: 12px 14px;
  display: flex;
  align-items: center;
  gap: 10px;
  background: ${({ $active }) => ($active ? "#ffffff" : "transparent")};
  color: ${({ $active }) => ($active ? "#0f2744" : "#d9e6f2")};
  font-size: 14px;
  font-weight: 600;
  text-align: left;
  cursor: pointer;
  transition: background 0.2s ease, color 0.2s ease;

  &:hover {
    background: ${({ $active }) =>
      $active ? "#ffffff" : "rgba(255, 255, 255, 0.14)"};
    color: ${({ $active }) => ($active ? "#0f2744" : "#ffffff")};
  }

  .anticon {
    font-size: 18px;
  }
`;

export const SidebarFooter = styled.div`
  margin-top: auto;
`;

export const UserBox = styled.div`
  border-top: 1px solid rgba(255, 255, 255, 0.16);
  padding-top: 18px;
  display: flex;
  align-items: center;
  gap: 10px;

  .anticon {
    width: 34px;
    height: 34px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.12);
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }
`;

export const UserMeta = styled.div`
  min-width: 0;

  strong,
  span {
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  strong {
    font-size: 13px;
  }

  span {
    color: #b9c7d6;
    font-size: 12px;
    margin-top: 2px;
  }
`;

export const Main = styled.main`
  min-width: 0;
`;

export const Header = styled.header`
  min-height: 96px;
  padding: 22px 32px;
  background: #ffffff;
  border-bottom: 1px solid #e4eaf1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;

  @media (max-width: 700px) {
    align-items: flex-start;
    flex-direction: column;
    padding: 18px;
  }
`;

export const HeaderText = styled.div`
  min-width: 0;

  p {
    margin: 6px 0 0;
    color: #667085;
    font-size: 14px;
    line-height: 1.5;
  }
`;

export const PageTitle = styled.h1`
  margin: 0;
  font-size: 26px;
  line-height: 1.25;
  font-weight: 700;
`;

export const HeaderActions = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;

export const Content = styled.section`
  padding: 28px 32px 36px;

  @media (max-width: 700px) {
    padding: 18px;
  }

  .admin-action-primary-btn.ant-btn-primary {
    min-width: 168px;
    height: 42px;
    border-radius: 6px;
    box-shadow: none;
    border-color: var(--primary);
    background: var(--primary);
    font-weight: 600;
  }

  .admin-action-primary-btn.ant-btn-primary:hover,
  .admin-action-primary-btn.ant-btn-primary:focus {
    border-color: var(--primary);
    background: var(--primary);
    box-shadow: none;
  }
`;

export const MetricGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 16px;

  @media (max-width: 1100px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
  }
`;

export const MetricCard = styled.div`
  min-height: 116px;
  border: 1px solid #e4eaf1;
  border-radius: 8px;
  background: #ffffff;
  padding: 18px;
  display: flex;
  align-items: center;
  gap: 14px;
`;

export const MetricIcon = styled.div<{ $tone: string }>`
  width: 46px;
  height: 46px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ $tone }) =>
    ({
      blue: "#2563eb",
      green: "#059669",
      orange: "#d97706",
      red: "#dc2626",
    })[$tone] || "#2563eb"};
  background: ${({ $tone }) =>
    ({
      blue: "#eff6ff",
      green: "#ecfdf5",
      orange: "#fffbeb",
      red: "#fef2f2",
    })[$tone] || "#eff6ff"};
  font-size: 22px;
`;

export const MetricLabel = styled.p`
  margin: 0;
  color: #667085;
  font-size: 13px;
  line-height: 1.4;
`;

export const MetricValue = styled.strong`
  display: block;
  margin-top: 5px;
  color: #152033;
  font-size: 26px;
  line-height: 1.2;
`;

export const Panel = styled.div`
  margin-top: 18px;
  border: 1px solid #e4eaf1;
  border-radius: 8px;
  background: #ffffff;
  overflow: hidden;
`;

export const PanelHeader = styled.div`
  padding: 18px;
  border-bottom: 1px solid #e4eaf1;
  display: flex;
  justify-content: space-between;
  gap: 12px;
  align-items: center;
  flex-wrap: wrap;
`;

export const PanelTitle = styled.h2`
  margin: 0;
  font-size: 18px;
  line-height: 1.3;
`;

export const StatusDot = styled.div`
  color: #667085;
  font-size: 13px;
  display: inline-flex;
  align-items: center;
  gap: 8px;

  span {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #f59e0b;
  }
`;

export const TableWrap = styled.div`
  overflow-x: auto;

  .ant-table {
    min-width: 680px;
  }
`;
