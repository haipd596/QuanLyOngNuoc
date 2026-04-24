import { useCtrlS } from '@packages/hooks/useCtrlS';
import { useCtrlZ } from '@packages/hooks/useCtrlZ';
import React from 'react';
import { CmdKProvider } from './CmdK';

type THotKeyProviderProps = {
  children: React.ReactNode
};

const HotKeyProvider = ({ children }: THotKeyProviderProps) => {
  useCtrlZ();

  useCtrlS();

  return (
    <CmdKProvider>
      {children}
    </CmdKProvider>
  );
};

export default HotKeyProvider;
