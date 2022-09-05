import { createContext } from 'react';
import { UserContext as UserContextI } from '../../interfaces';

const UserContext = createContext<UserContextI>({} as UserContextI);

export default UserContext;
