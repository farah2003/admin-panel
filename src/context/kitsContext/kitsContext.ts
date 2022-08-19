import { createContext } from 'react';

import { KitsContext as KitsContextI } from '../../interfaces';

const KitsContext = createContext<KitsContextI>({} as KitsContextI);

export default KitsContext;
