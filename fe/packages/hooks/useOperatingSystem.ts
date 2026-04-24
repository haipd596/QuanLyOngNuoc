import { getOperatingSystem, OS } from '@packages/utils/common';
import { useEffect, useState } from 'react';

export const useOperatingSystem = () : OS => {
  const [userOS, setUserOS] = useState<OS>('Not known');

  useEffect(() => {
    setUserOS(getOperatingSystem(window));
  });

  return userOS;
};
