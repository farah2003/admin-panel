import React, { useState } from 'react';
import KitsContext from './kitsContext';
import { Kit } from '../../interfaces';

interface KitsProviderProps {
  children: React.ReactNode;
}

const KitsProvider = ({ children }: KitsProviderProps) => {
  const [kits, setKits] = useState<Kit[]>([]);
  const value = React.useMemo(
    () => ({
      kits,
      setKits,
    }),
    [kits]
  );

  return <KitsContext.Provider value={value}>{children}</KitsContext.Provider>;
};

export default KitsProvider;
