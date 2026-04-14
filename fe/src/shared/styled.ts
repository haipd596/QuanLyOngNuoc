import styled from "styled-components";

export const LayoutWrapper = styled.div`
  min-height: 100vh;
  background-color: var(--bg-secondary);
  position: relative;
`;

export const ContentWrapper = styled.main<{ sidebarCollapsed: boolean }>`
  margin-left: ${({ sidebarCollapsed }) => sidebarCollapsed ? "6rem" : "var(--sidebar-width)"};
  padding: 0;
  padding-top: 6rem;
  min-height: calc(100vh - var(--header-admin-height));
  transition: left 0.2s ease;
  overflow-y: auto;

  background: #ffffff;
   min-height: calc(100vh);
`;