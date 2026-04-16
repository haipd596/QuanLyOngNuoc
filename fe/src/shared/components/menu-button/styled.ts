import styled from 'styled-components';
import { Link } from '@tanstack/react-router';

export const MenuButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
`;

export const AppName = styled.span`
  font-weight: 400;
  font-size: 1.4rem;
  line-height: 24px;
  padding-inline: 1.2rem;
  /* color: var(--text-primary); */
`;

export const AppLogoWrapper = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 140px;
  height: 140px;
  text-align: center;
  border-radius: 4px;
  ${(props) => (props.disabled ? 'pointer-events: none' : '')}

  &:hover {
    background-color: var(--hover-secondary);
    box-shadow: 0px 2px 8px 3px rgba(0, 0, 0, 0.2);

    ${AppName} {
      color: var(--primary);
    }
  }

  img {
    margin-bottom: 1.2rem;
    width: 40px;
    height: 40px;
  }
`;

export const MenuHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: var(--header-height);
  padding: 0 16px;
`;

export const MenuTitle = styled.span`
  font-weight: 500;
  font-size: 1.8rem;
  line-height: 3rem;
  position: relative;
  top: 1px;
`;

export const MenuWrapper = styled.div`
  background-color: var(--bg-primary);
  /* box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.12); */
  z-index: 100;
`;